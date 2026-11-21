(() => {
  const section = document.getElementById('knowledge-graph');
  const stage = section.querySelector('.kg-stage');
  const canvas = stage.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Theme copy, handbook titles, speakers and links come from the catalog.
  const catalog = document.getElementById('catalog-browser');
  const series = new Map([...catalog.querySelectorAll('[data-series-filter]')].map(button => [
    button.dataset.seriesFilter, button.dataset.description
  ]));
  const cards = new Map([...catalog.querySelectorAll('.speaker-card')].map(card => [
    card.dataset.talk, card
  ]));
  const themes = {
    coding:   {name:'编程 Agent', xyz:[-159,-79,135], ink:'#306550', picks:['lauren-tan','lydia-hallie','armin-ronacher']},
    agents:   {name:'长任务与多 Agent', xyz:[124,-80,-108], ink:'#356579', picks:['lovable','factory','lance-martin']},
    delivery: {name:'团队交付', xyz:[206,11,142], ink:'#855b38', picks:['patrick-debois','dexter-horthy','uber']},
    quality:  {name:'评测与安全', xyz:[131,90,57], ink:'#456582', picks:['cline','roey-ben-chaim','sonar']},
    business: {name:'企业应用', xyz:[-129,91,-137], ink:'#376d65', picks:['workday','glean','cloudflare']},
    frontier: {name:'模型与产品', xyz:[-215,11,17], ink:'#63648b', picks:['simon-willison','rohan-pandey','thariq-shihipar']}
  };
  const keywords = [
    ['constraints','工程约束','coding',[-240,-116,58],'把反复纠正过的错误变成可执行的规则。',['lauren-tan']],
    ['sandbox','权限与沙箱','coding',[-52,-127,-78],'限定 Agent 的操作范围，把关键决策交给人。',['lydia-hallie','roey-ben-chaim']],
    ['checkpoints','人工检查点','agents',[218,-110,12],'在任务中途检查结果，决定继续、调整或接手。',['factory','lydia-hallie','lovable']],
    ['memory','Agent 记忆','agents',[83,-126,60],'为持续工作的 Agent 保留任务状态和反馈。',['lance-martin','lovable']],
    ['gates','验收关口','delivery',[213,63,130],'在软件交付过程中，用可执行的条件验收成果。',['dexter-horthy','sonar','lauren-tan']],
    ['queue','合并队列','delivery',[306,-29,-65],'让并发 PR 按合并顺序一同接受验证。',['uber','patrick-debois']],
    ['harness','Agent 运行框架','quality',[156,126,-43],'从真实运行的失败案例和回归测试里改进框架。',['cline','philipp-schmid']],
    ['evidence','运行时证据','quality',[-22,63,128],'观察 Agent 实际执行了什么，为审查和验收提供依据。',['roey-ben-chaim','lauren-tan','sonar']],
    ['routing','决策模型','business',[-205,122,41],'让专门的模型处理分类、路由等结构化决策。',['cloudflare','glean']],
    ['action','行动补全','business',[-60,112,46],'理解用户意图后，给出下一步操作和所需字段。',['workday']],
    ['inference','模型推理','frontier',[-277,-51,-120],'用负载实验选择适合当前机器的模型服务配置。',['rohan-pandey']],
    ['creative','人机交互','frontier',[-252,58,76],'让 Agent 参与构建，同时让创作者掌握体验判断。',['thariq-shihipar']]
  ];
  const nodes = new Map([
    ['root',{name:'Agent 工程',xyz:[0,0,22],kind:'root',ink:'#205b4c',
      description:'六个主题串起编程实践、评测方法、团队交付和产品探索。',
      picks:['lauren-tan','lydia-hallie','lance-martin']}],
    ...Object.entries(themes).map(([id, theme]) => [id,{...theme,kind:'theme',description:series.get(id)}]),
    ...keywords.map(([id,name,theme,xyz,description,picks]) => [id,{
      name,theme,xyz,description,picks,kind:'keyword',ink:themes[theme].ink
    }])
  ]);
  const bridges = [
    ['sandbox','evidence'], ['checkpoints','evidence'], ['gates','evidence'],
    ['constraints','gates'], ['gates','queue'], ['evidence','harness'], ['routing','action']
  ];
  const edges = [
    ...Object.keys(themes).map(id => ['root',id]),
    ...keywords.map(([id,,theme]) => [theme,id]),
    ...bridges
  ];
  const neighbors = id => edges.filter(edge => edge.includes(id)).map(([a,b]) => a===id?b:a);

  const detail = section.querySelector('.kg-detail');
  const related = section.querySelector('.kg-related');
  const topics = section.querySelector('.kg-topics');
  const layer = section.querySelector('.kg-nodes');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const touchOnly = matchMedia('(hover: none)');
  const hint = section.querySelector('.kg-hint');
  hint.textContent = touchOnly.matches ? '点按节点，查看相关手册' : '移动鼠标拨动粒子 · 拖动节点 · 点击阅读';

  let selected = 'root', hovered = '', frame = 0;
  let width = 0, height = 0, pixelRatio = 1;
  const cursor = {x:0,y:0,strength:0,inside:false};
  const overview = {x:0,y:0,z:0};
  let camera = overview;
  let flight = null;
  let gesture = null, school = null, blockClick = false;
  for (const [id,node] of nodes) {
    const button = makeButton(node.name, () => select(id), true);
    button.className = 'kg-node';
    button.dataset.id = id;
    button.dataset.kind = node.kind;
    button.setAttribute('aria-label',node.name);
    button.style.setProperty('--kg-ink',node.ink);
    button.addEventListener('focus', () => { if (button.matches(':focus-visible')) highlight(id); });
    button.addEventListener('blur', () => { if (hovered===id) highlight(''); });
    layer.append(button);
    node.button = button;
    if (node.kind==='theme') {
      const topic = makeButton(node.name, () => select(id));
      topic.style.setProperty('--kg-ink',node.ink);
      topics.append(topic);
      node.topic = topic;
    }
  }

  function makeButton(label,onClick,wrapped=false) {
    const button = document.createElement('button');
    button.type = 'button';
    if (wrapped) {
      const span = document.createElement('span');
      span.textContent = label;
      button.append(span);
    } else {
      button.textContent = label;
    }
    button.addEventListener('click',onClick);
    return button;
  }
  function makeText(tag,value,className) {
    const item = document.createElement(tag);
    item.textContent = value;
    if (className) item.className = className;
    return item;
  }
  function highlight(id) {
    if (hovered===id) return;
    hovered = id;
    requestDraw();
  }
  function flyTo(node) {
    const [x,y,z] = node.xyz;
    const destination = node.kind==='root' ? overview : {
      x:x*.61,
      y:y*.66,
      z:139-z*.17
    };
    highlight('');
    if (reduced.matches) {
      camera = destination;
      flight = null;
    } else {
      flight = {from:camera,to:destination,start:performance.now()};
    }
  }
  function updateCamera(now) {
    if (!flight) return;
    const phase = Math.max(0,Math.min(1,(now-flight.start)/660));
    if (phase===1 || reduced.matches) {
      camera = flight.to;
      flight = null;
      return;
    }
    const ease = phase*phase*(3-2*phase);
    const {from,to} = flight;
    camera = {
      x:from.x+(to.x-from.x)*ease,
      y:from.y+(to.y-from.y)*ease,
      z:from.z+(to.z-from.z)*ease
    };
  }
  function select(id) {
    const node = nodes.get(id);
    if (id!==selected) flyTo(node);
    selected = id;
    const category = node.kind==='root'?'图谱总览':node.kind==='theme'?'主题':themes[node.theme].name;
    const list = document.createElement('ul');
    list.className = 'kg-talks';
    list.setAttribute('aria-label','相关演讲手册');
    for (const slug of node.picks) {
      const card = cards.get(slug);
      if (!card) continue;
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = card.querySelector('.speaker-read').getAttribute('href');
      link.append(makeText('small',card.querySelector('.speaker-name').textContent),card.querySelector('h2').textContent);
      li.append(link);
      list.append(li);
    }
    detail.replaceChildren(makeText('p',category,'kg-category'),makeText('h3',node.name),
      makeText('p',node.description,'kg-summary'),list);
    if (node.kind==='theme') {
      const more = makeText('a','浏览这个主题的全部分享 →','kg-all');
      more.href = 'catalog.html?series='+id+'#catalog-browser';
      detail.append(more);
    }
    const actions = document.createElement('div');
    for (const next of neighbors(id)) {
      actions.append(makeButton(nodes.get(next).name,event => {
        select(next);
        if (event.detail===0) {
          const heading = detail.querySelector('h3');
          heading.tabIndex = -1;
          heading.focus({preventScroll:true});
        }
      }));
    }
    related.replaceChildren(makeText('p','关联节点'),actions);
    for (const [key,item] of nodes) {
      item.button.setAttribute('aria-pressed',String(key===id));
      item.topic?.setAttribute('aria-pressed',String(key===(node.theme||id)));
    }
    requestDraw();
  }

  let seed = 812;
  function random() {
    seed = (Math.imul(seed,1664525)+1013904223)>>>0;
    return seed/4294967296;
  }
  const clusters = Object.entries(themes).map(([id,{xyz:[x,y,z],ink}]) => {
    const points = Array.from({length:54},() => {
      const theta = random()*Math.PI*2;
      const vertical = random()*2-1;
      const radial = Math.sqrt(1-vertical*vertical) * (0.22+0.78*Math.cbrt(random()));
      return [x+Math.cos(theta)*radial*95,y+vertical*68,z*1.30+Math.sin(theta)*radial*177];
    });
    const links = points.flatMap(([x,y,z],i) => points.slice(i+1,i+8).flatMap(([a,b,c],j) =>
      Math.hypot(x-a,y-b,z-c)<47?[[i,i+j+1]]:[]
    ));
    return {id,ink,points,links};
  });
  const field = Array.from({length:290},() => {
    const theta = random()*Math.PI*2;
    const height = random()*2-1;
    const radius = Math.sqrt(1-height*height)*(0.65+random()*.35);
    return [Math.cos(theta)*radius*330,height*160,Math.sin(theta)*radius*390,random()];
  });

  function projector() {
    const scale = Math.min(width/674,height/350);
    const lens = Math.min(106,width*.23);
    return ([x,y,z],fluid=true) => {
      const depth = z+camera.z;
      const perspective = 920/(920-depth);
      const sx = width*.5+(x-camera.x)*scale*perspective;
      const sy = height*.49+(y-camera.y)*scale*perspective;
      if (!fluid || !cursor.strength) return {x:sx,y:sy,depth,perspective};

      const dx = sx-cursor.x, dy = sy-cursor.y;
      const distance = Math.hypot(dx,dy);
      const weight = Math.max(0,1-distance/lens);
      const displacement = weight*weight*cursor.strength*(29+z*.034)/Math.max(15,distance);
      return {x:sx+dx*displacement,y:sy+dy*displacement,depth,perspective};
    };
  }

  function moveSpring(body,x,y,stiffness,friction,dt) {
    if (Math.hypot(x-body.x,y-body.y,body.vx*.025,body.vy*.025)<.22) {
      Object.assign(body,{x,y,vx:0,vy:0});
      return false;
    }
    body.vx+=((x-body.x)*stiffness-body.vx*friction)*dt;
    body.vy+=((y-body.y)*stiffness-body.vy*friction)*dt;
    body.x+=body.vx*dt;
    body.y+=body.vy*dt;
    return true;
  }

  function updateSchool(now) {
    if (!school) return false;
    const {head,tail} = school;
    const held = gesture?.moved;
    const dt = Math.min(.024,Math.max(.004,(now-school.time)/1000));
    school.time = now;
    if (held) Object.assign(head,{x:gesture.dx,y:gesture.dy});
    if (reduced.matches) {
      if (!held) school = null;
      else Object.assign(tail,head);
      return false;
    }

    const glide = school.glide;
    if (glide) {
      const progress = Math.max(0,Math.min(1,(now-glide.start)/190));
      const pace = progress*(2-progress);
      head.x = glide.x+glide.dx*pace;
      head.y = glide.y+glide.dy*pace;
      if (progress===1) school.glide = null;
    }
    const returning = !held && !glide && moveSpring(head,0,0,118,20,dt);
    const following = moveSpring(tail,head.x,head.y,118,15,dt);
    if (!held && !glide && !returning && !following) school = null;
    return Boolean(glide || returning || following);
  }

  function followSchool(point,origin,reach,leader) {
    const {head,tail} = school;
    if (leader) return {...point,x:point.x+head.x,y:point.y+head.y};
    const dx = point.x-origin.x, dy = point.y-origin.y;
    const remaining = Math.max(0,1-Math.hypot(dx,dy)/reach);
    if (remaining===0) return point;

    const weight = remaining*remaining;
    const response = Math.min(.43,Math.max(.10,.21+(point.depth-origin.depth)/1150));
    const swing = ((head.x-tail.x)*dy-(head.y-tail.y)*dx)*.25/(reach*reach);
    return {
      ...point,
      x:point.x+(tail.x+(head.x-tail.x)*response-dy*swing)*weight,
      y:point.y+(tail.y+(head.y-tail.y)*response+dx*swing)*weight
    };
  }

  function dot(point,radius,color) {
    ctx.beginPath();
    ctx.arc(point.x,point.y,radius,0,Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  function stroke(a,b,color,width) {
    ctx.beginPath();
    ctx.moveTo(a.x,a.y);
    ctx.lineTo(b.x,b.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
  function drawNode(point,node,active,dimmed) {
    const radius = (node.kind==='root'?10:node.kind==='theme'?6.6:3.8)*Math.sqrt(point.perspective);
    const glow = ctx.createRadialGradient(point.x,point.y,0,point.x,point.y,radius*(active?4.5:3));
    glow.addColorStop(0,node.ink+'76');
    glow.addColorStop(.28,node.ink+'32');
    glow.addColorStop(1,node.ink+'00');
    ctx.globalAlpha = dimmed?.48:1;
    dot(point,radius*(active?4.5:3),glow);
    const sphere = ctx.createRadialGradient(point.x-radius*.32,point.y-radius*.39,0,point.x,point.y,radius);
    sphere.addColorStop(0,'#fbfff9');
    sphere.addColorStop(.28,'#b8dbcb');
    sphere.addColorStop(1,node.ink);
    dot(point,radius,sphere);
    if (active || node.kind==='root') {
      ctx.beginPath();
      ctx.arc(point.x,point.y,radius+6,0,Math.PI*2);
      ctx.strokeStyle=node.ink+'91';
      ctx.lineWidth=.9;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function draw(now) {
    frame = 0;
    if (!width || !height) return;
    updateCamera(now);
    const swimming = updateSchool(now);
    const strength = cursor.inside && !school && !reduced.matches ? 1 : 0;
    const delta = strength-cursor.strength;
    cursor.strength = reduced.matches||Math.abs(delta)<.003 ? strength : cursor.strength+delta*.26;

    ctx.setTransform(pixelRatio,0,0,pixelRatio,0,0);
    ctx.clearRect(0,0,width,height);
    const project = projector();
    const origin = school ? project(nodes.get(school.id).xyz,false) : null;
    const reach = Math.min(202,width*.29);
    const place = (xyz,id) => {
      const point = project(xyz,!id);
      return origin ? followSchool(point,origin,reach,id===school.id) : point;
    };
    const active = school?.id||hovered||selected;
    const linked = new Set(neighbors(active));
    const positions = new Map([...nodes].map(([id,node])=>[id,place(node.xyz,id)]));
    for (const star of field) {
      const point = place(star);
      const alpha = (.14+star[3]*.24)*Math.min(1.2,(star[2]+530)/820);
      dot(point,(.46+star[3]*.64)*point.perspective,'rgba(55,110,94,'+alpha+')');
    }
    for (const cluster of clusters) {
      const hot = active==='root'||active===cluster.id||linked.has(cluster.id)||nodes.get(active).theme===cluster.id;
      const points = cluster.points.map(point=>place(point));
      for (const [a,b] of cluster.links) stroke(points[a],points[b],cluster.ink+(hot?'37':'17'),.65);
      points.forEach((point,index) => {
        if (index%13===0) stroke(point,positions.get(cluster.id),cluster.ink+(hot?'30':'12'),.65);
        const radius = (index%8===0?2.05:1.05)*point.perspective;
        dot(point,radius,cluster.ink+(hot?'80':'38'));
      });
    }
    for (const [a,b] of edges) {
      const hot = a===active || b===active;
      const bridge = nodes.get(a).kind==='keyword';
      if (bridge && !hot) ctx.setLineDash([2.5,4]);
      stroke(positions.get(a),positions.get(b),nodes.get(b).ink+(hot?'bc':active==='root'?'58':'2f'),hot?1.45:.8);
      ctx.setLineDash([]);
    }

    const order = [...nodes].sort(([a],[b])=>positions.get(a).depth-positions.get(b).depth);
    order.forEach(([id,node],index) => {
      const point = positions.get(id);
      const primary = active===id;
      const dimmed = active!=='root' && !primary && !linked.has(id) && selected!==id;
      drawNode(point,node,primary,dimmed);
      node.button.style.left = point.x+'px';
      node.button.style.top = point.y+'px';
      node.button.style.zIndex = primary?50:index;
      const onScreen = point.x>=12 && point.x<=width-12 && point.y>=12 && point.y<=height-23;
      node.button.style.visibility = onScreen?'visible':'hidden';
      node.button.dataset.active = primary;
      node.button.dataset.dim = dimmed;
    });
    if (flight || swimming || cursor.strength!==strength) requestDraw();
  }

  function requestDraw() {
    if (!frame) frame = requestAnimationFrame(draw);
  }
  function trackDrag(drag,x,y,now) {
    const dt = Math.max(12,now-drag.time);
    const vx = (x-drag.dx)/dt, vy = (y-drag.dy)/dt;
    const inertia = vx*drag.vx+vy*drag.vy<0 ? 0 : Math.exp(-dt/46);
    drag.vx = vx+(drag.vx-vx)*inertia;
    drag.vy = vy+(drag.vy-vy)*inertia;
    drag.dx = x;
    drag.dy = y;
    drag.time = now;
  }

  function releaseGlide(drag,now) {
    const speed = Math.hypot(drag.vx,drag.vy);
    const freshness = Math.max(0,1-(now-drag.time)/115);
    const travel = Math.min(36,speed*94*freshness);
    if (travel<3) return null;

    const origin = projector()(nodes.get(drag.id).xyz,false);
    const x = origin.x+drag.dx, y = origin.y+drag.dy;
    return {
      x:drag.dx,y:drag.dy,start:now,
      dx:Math.max(18,Math.min(width-18,x+drag.vx*travel/speed))-x,
      dy:Math.max(18,Math.min(height-33,y+drag.vy*travel/speed))-y
    };
  }

  stage.addEventListener('pointerdown',event => {
    const button = event.target.closest('.kg-node');
    if (!event.isPrimary || event.button!==0) return;
    blockClick = false;
    if (event.pointerType==='touch' || !button) return;

    const {left,top} = stage.getBoundingClientRect();
    gesture = {
      pointerId:event.pointerId,id:button.dataset.id,
      startX:event.clientX,startY:event.clientY,
      grabX:event.clientX-left-parseFloat(button.style.left),
      grabY:event.clientY-top-parseFloat(button.style.top),
      dx:0,dy:0,vx:0,vy:0,time:performance.now(),moved:false,resume:null
    };
  });
  stage.addEventListener('pointermove',event => {
    if (event.pointerType==='touch') return;
    const {left,top} = stage.getBoundingClientRect();
    cursor.x = event.clientX-left;
    cursor.y = event.clientY-top;
    if (gesture?.pointerId===event.pointerId) {
      if (!gesture.moved && Math.hypot(event.clientX-gesture.startX,event.clientY-gesture.startY)<5) return;
      const origin = projector()(nodes.get(gesture.id).xyz,false);
      if (!gesture.moved) {
        stage.setPointerCapture(event.pointerId);
        stage.dataset.dragging = 'true';
        gesture.moved = true;
        gesture.resume = flight?.to;
        flight = null;
        if (school?.id!==gesture.id) {
          school = {id:gesture.id,time:performance.now(),head:{x:0,y:0,vx:0,vy:0},tail:{x:0,y:0,vx:0,vy:0}};
        } else {
          gesture.dx = school.head.x;
          gesture.dy = school.head.y;
        }
        school.glide = null;
        school.head.vx = school.head.vy = 0;
      }
      const x = Math.max(18,Math.min(width-18,cursor.x-gesture.grabX))-origin.x;
      const y = Math.max(18,Math.min(height-33,cursor.y-gesture.grabY))-origin.y;
      trackDrag(gesture,x,y,performance.now());
    } else {
      if (!flight) highlight(event.target.closest('.kg-node')?.dataset.id||'');
      cursor.inside = true;
    }
    requestDraw();
  });
  function releaseNode(event) {
    if (gesture?.pointerId!==event.pointerId) return;
    const drag = gesture;
    gesture = null;
    if (!drag.moved) return;
    const now = performance.now();
    Object.assign(school.head,{x:drag.dx,y:drag.dy});
    school.glide = event.type==='pointerup' && !reduced.matches ? releaseGlide(drag,now) : null;
    blockClick = true;
    delete stage.dataset.dragging;
    cursor.inside = false;
    highlight('');
    if (drag.resume) flight = {from:camera,to:drag.resume,start:now};
    requestDraw();
  }
  window.addEventListener('pointerup',releaseNode);
  window.addEventListener('pointercancel',releaseNode);
  stage.addEventListener('lostpointercapture',releaseNode);
  stage.addEventListener('click',event => {
    if (!blockClick || event.detail===0) return;
    blockClick = false;
    event.preventDefault();
    event.stopPropagation();
  },true);
  stage.addEventListener('pointerleave',() => {
    cursor.inside = false;
    highlight('');
    requestDraw();
  });
  section.querySelector('.kg-reset').addEventListener('click',() => {
    hovered = '';
    select('root');
  });
  section.querySelector('.kg-workspace').hidden = false;
  new ResizeObserver(() => {
    width = stage.clientWidth;
    height = stage.clientHeight;
    pixelRatio = Math.min(devicePixelRatio,2);
    canvas.width = Math.round(width*pixelRatio);
    canvas.height = Math.round(height*pixelRatio);
    requestDraw();
  }).observe(stage);
  select('root');
})();
