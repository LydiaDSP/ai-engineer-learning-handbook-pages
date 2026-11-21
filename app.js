'use strict';
const handbookConfig=window.handbookConfig||null;
let language='zh';
let slides=[];
let rows=[];
let matches=[];
let matchIndex=-1;
const transcript=document.getElementById('transcript');
const escapeHtml=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline=s=>escapeHtml(s).replace(/`([^`]+)`/g,'<code>$1</code>');
const chapters=handbookConfig?.chapters||[
 {title:['开场：产量增加以后，怎样保持质量？','Opening: quality at greater scale'],groups:[[1,2],[3,4],[5,6]]},
 {title:['让代码库成为可靠的工作环境','Make the codebase a reliable environment'],groups:[[7,8],[9,10],[11,12],[13,14]]},
 {title:['把经验变成约束：三个工程案例','Turn experience into constraints: three examples'],groups:[[15,16],[17,18],[19,20],[21,22],[23,24,25],[26,27],[28]]},
 {title:['从阅读代码，到审查验证证据','From reading code to examining evidence'],groups:[[29,30],[31,32]]},
 {title:['进一步验证：模型、证明与用户流程','Further verification: models, proofs and user flows'],groups:[[33,34],[35],[36,37],[38,39],[40,41]]},
 {title:['团队结果，以及自动化的前提','Team outcomes and prerequisites for automation'],groups:[[42,43],[44],[45,46],[47,48],[49,50,51]]}
];
const blockFor=id=>{const n=Number(id.slice(1));const group=chapters.flatMap(c=>c.groups).find(g=>g.includes(n));return group?'p'+String(group[0]).padStart(2,'0'):id;};
function guideFor(id){const n=Number(id.slice(1));if(handbookConfig)return chapters.find(c=>c.groups.flat().includes(n))?.guide||'opening';return n<15?'foundation':n<29?'constraints':n<33?'verification':n<42?'formal':'results';}
function transcriptionNote(row){if(handbookConfig)return row.transcriptionNote?`<div class="transcription-note">${escapeHtml(row.transcriptionNote)}</div>`:'';let notes=[];if(/Potato|DropBot|GroffBot|Grotbot|GrotBot/.test(row.en))notes.push('专有名词识别提示：英文保留原始转写；Potato 对应讲者使用的 poteto，产品名称在中文校译中统一为 GrokBot。');if(row.id==='p08')notes.push('“pros”按上下文应指 prose（文字说明），不是“优点”。');if(row.id==='p16')notes.push('“lit rules”按上下文应指 lint rules（静态检查规则）。');if(row.id==='p46')notes.push('“Asian UIs / election app”疑为语音误识别；中文按上下文译为 Agent 界面 / Electron 应用，尚待逐句核听。');return notes.length?`<div class="transcription-note">${notes.join(' ')}</div>`:'';}
function sourceNote(r){if(handbookConfig)return '';const notes={p03:'PPT 核对：原幻灯片写的是“3,000 PRs”，此处英文机器转写为“deploy requests”，两者存在识别差异；原始转写保留供核对。',p44:'PPT 口径提示：讲述转写使用 PR，原图纵向指标实际写的是“% of commits reverted”（被回退的提交占比）。提交与 PR 不等同。'};return notes[r.id]?`<div class="transcription-note">${notes[r.id]}</div>`:'';}
function slideHtml(s,preferred=language){
 const isChinese=preferred!=='en';
 const imageLabel=handbookConfig?.groupLabel||'原视频 PPT 截图';
 if(s.reading){
  return `<figure class="slide" data-slide="${s.id}">
    <div class="slide-toolbar"><span>${imageLabel} · ${escapeHtml(s.time)}</span></div>
    <div class="reading-original"><button class="image-button" data-enlarge aria-label="放大：${escapeHtml(s.title)}"><img loading="lazy" width="1112" height="626" src="${s.en}" alt="${escapeHtml(s.title)} · ${imageLabel}"></button></div>
    <figcaption>${escapeHtml(s.note)} <a href="${s.url}" target="_blank" rel="noreferrer">回看原视频 ↗</a></figcaption>
    ${isChinese?s.reading:''}
  </figure>`;
 }
 return `<figure class="slide" data-slide="${s.id}"><div class="slide-toolbar"><span>${isChinese?'中文译图':'原始 PPT'} · ${escapeHtml(s.time)}</span><button data-toggle-slide="${s.id}" data-current="${isChinese?'zh':'en'}">${isChinese?'查看英文原图':'查看中文译图'}</button></div><button class="image-button" data-enlarge aria-label="放大：${escapeHtml(s.title)}"><img loading="lazy" width="1488" height="838" src="${isChinese?s.zh:s.en}" alt="${escapeHtml(s.title)} · ${isChinese?'中文译图':'原始截图'}"></button><figcaption>${escapeHtml(s.note)} <a href="${s.url}" target="_blank" rel="noreferrer">回看原画面 ↗</a></figcaption></figure>`;
}
function mergedText(group,key){return group.map((r,i)=>{let text=r[key];if(key==='zh'){if(i&&group[i-1].zh.endsWith('……'))text=text.replace(/^……/,'');if(i<group.length-1&&group[i+1].zh.startsWith('……'))text=text.replace(/……$/,'');}return inline(text);}).join(key==='en'?' ':'');}
function render(){transcript.innerHTML=chapters.map(chapter=>{const first=rows[chapter.groups[0][0]-1];const last=rows[chapter.groups.at(-1).at(-1)-1];const chapterRows=chapter.groups.flat().map(n=>rows[n-1]);const notes=[...new Set(chapterRows.flatMap(r=>[sourceNote(r),language!=='zh'?transcriptionNote(r):'']).filter(Boolean))];return `<div class="transcript-chapter"><h3 class="transcript-heading">${chapter.title[language==='en'?1:0]}</h3><div class="unit-meta"><a href="${first.url}" target="_blank" rel="noreferrer">${first.time.slice(0,8)}—${last.end.slice(0,8)} ↗</a><a href="#${guideFor(first.id)}">查看本节讲解 ↑</a></div>${chapter.groups.map(numbers=>{const group=numbers.map(n=>rows[n-1]);return `<div class="transcript-unit" id="${group[0].id}">${group.slice(1).map(r=>`<span class="source-anchor" id="${r.id}"></span>`).join('')}<div class="unit-text">${language!=='en'?`${language==='both'?`<span class="lang-label">${escapeHtml(handbookConfig?.chineseLabel||'中文译文')}</span>`:''}<p class="zh">${mergedText(group,'zh')}</p>`:''}${language!=='zh'?`${language==='both'?`<span class="lang-label">${escapeHtml(handbookConfig?.englishLabel||(handbookConfig?'ENGLISH · MACHINE TRANSCRIPT':'英文机器转写 · MACHINE TRANSCRIPT'))}</span>`:''}<p class="en" lang="en">${mergedText(group,'en')}</p>`:''}</div>${slides.filter(s=>group.some(r=>r.id===s.after)).map(s=>slideHtml(s)).join('')}</div>`;}).join('')}${notes.length?`<details class="chapter-notes"><summary>本节校订与来源说明</summary><div>${notes.join('')}</div></details>`:''}</div>`;}).join('');updateSearch(false);}

function currentAnchor(){const els=[...document.querySelectorAll('.transcript-unit')];const edge=document.querySelector('.reader-tools').getBoundingClientRect().bottom;return els.find(e=>e.getBoundingClientRect().bottom>edge);}
function setLanguage(next){const old=currentAnchor();const isReading=old&&document.getElementById('original').getBoundingClientRect().top<100;const id=old?.id;const offset=old?.getBoundingClientRect().top;language=next;document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===next)));render();if(isReading&&id){const e=document.getElementById(id);window.scrollBy({top:e.getBoundingClientRect().top-offset,behavior:'instant'});}}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
function updateSearch(announce=true){const q=document.getElementById('search').value.trim().toLocaleLowerCase();matches=q?[...new Set(rows.filter(r=>(r.zh+' '+r.en).toLocaleLowerCase().includes(q)).map(r=>blockFor(r.id)))]:[];matchIndex=-1;document.querySelectorAll('.transcript-unit').forEach(e=>{e.classList.toggle('match',matches.includes(e.id));e.classList.remove('current-match');});document.getElementById('search-result').textContent=q?(matches.length?`${matches.length} 个匹配段落 · 按 ↓ 查看，不隐藏上下文`:'没有找到匹配段落，可换一个词；全文仍然保留。'):'';document.querySelectorAll('#search-prev,#search-next').forEach(b=>b.disabled=!matches.length);}
function nextMatch(direction){if(!matches.length)return;matchIndex=matchIndex===-1?(direction<0?matches.length-1:0):(matchIndex+direction+matches.length)%matches.length;document.querySelectorAll('.current-match').forEach(e=>e.classList.remove('current-match'));const e=document.getElementById(matches[matchIndex]);e.classList.add('current-match');e.scrollIntoView({block:'start'});document.getElementById('search-result').textContent=`第 ${matchIndex+1} / ${matches.length} 个匹配段落`;}
document.getElementById('search').addEventListener('input',()=>updateSearch());document.getElementById('search').addEventListener('keydown',e=>{if(e.key==='Enter')nextMatch(e.shiftKey?-1:1);});document.getElementById('search-prev').addEventListener('click',()=>nextMatch(-1));document.getElementById('search-next').addEventListener('click',()=>nextMatch(1));
const dialog=document.getElementById('image-dialog');document.addEventListener('click',e=>{const toggle=e.target.closest('[data-toggle-slide]');if(toggle){const slide=slides.find(s=>s.id===toggle.dataset.toggleSlide);const chinese=toggle.dataset.current!=='zh';toggle.dataset.current=chinese?'zh':'en';toggle.textContent=chinese?'查看英文原图':'查看中文译图';const fig=toggle.closest('figure');fig.querySelector('img').src=chinese?slide.zh:slide.en;fig.querySelector('img').alt=slide.title+' · '+(chinese?'中文译图':'原始截图');fig.querySelector('.slide-toolbar span').textContent=(chinese?'中文译图':'原始 PPT')+' · '+slide.time;}
const enlarge=e.target.closest('[data-enlarge]');if(enlarge){const img=enlarge.querySelector('img');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('p').textContent=img.alt;document.getElementById('full-image').href=img.src;dialog.showModal();document.body.classList.add('modal-open');}});document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
const readingSections=[...document.querySelectorAll('article>section')];
const readingLabels=handbookConfig?readingSections.map(s=>s.dataset.label):['导入','上手','环境','约束','证据','验证','结果','实践','全文','来源'];
const readingNodes=document.getElementById('reading-nodes');
readingNodes.innerHTML=readingSections.map((section,i)=>`<a class="reading-node" href="#${section.id}" style="left:${i/readingSections.length*100}%" aria-label="跳转到：${readingLabels[i]}" title="${readingLabels[i]}"><span>${readingLabels[i]}</span></a>`).join('');
function progress(){
 const max=Math.max(0,document.documentElement.scrollHeight-innerHeight);
 const padding=parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
 const positions=readingSections.map(section=>Math.min(max,Math.max(0,section.getBoundingClientRect().top+scrollY-padding-parseFloat(getComputedStyle(section).scrollMarginTop))));
 const y=Math.max(0,scrollY);
 let current=-1;
 positions.forEach((position,i)=>{if(y>=position-1)current=i;});
 let value=0;
 if(current>=0){const start=positions[current];const end=current+1<positions.length?positions[current+1]:max;value=(current+(end>start?Math.min(1,Math.max(0,(y-start)/(end-start))):1))/positions.length*100;}
 if(max>0&&y>=max-1)value=100;
 const fill=document.getElementById('reading-progress');
 fill.style.width=value+'%';fill.setAttribute('aria-valuenow',String(Math.round(value)));
 fill.setAttribute('aria-valuetext',`${Math.round(value)}%，${current<0?'开始阅读':readingLabels[current]}`);
 document.getElementById('reading-percent').textContent=Math.round(value)+'%';
 document.getElementById('reading-location').textContent='阅读进度 · '+(current<0?'开始阅读':readingLabels[current]);
 document.querySelectorAll('.sidebar nav a').forEach(a=>{const active=current>=0&&a.hash==='#'+readingSections[current].id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
 [...readingNodes.children].forEach((node,i)=>{node.classList.toggle('passed',i<current||value===100);if(i===current)node.setAttribute('aria-current','step');else node.removeAttribute('aria-current');});
}
let progressFrame=0;
function scheduleProgress(){if(!progressFrame)progressFrame=requestAnimationFrame(()=>{progressFrame=0;progress();});}
window.addEventListener('scroll',scheduleProgress,{passive:true});
window.addEventListener('resize',scheduleProgress);
new ResizeObserver(scheduleProgress).observe(document.querySelector('article'));
(window.handbookData?Promise.resolve([window.handbookData.rows,window.handbookData.slides]):Promise.all([fetch('content.json').then(r=>{if(!r.ok)throw Error('transcript');return r.json();}),fetch('slides.json').then(r=>r.ok?r.json():[])])).then(([r,s])=>{rows=r;slides=s;render();document.querySelectorAll('[data-guide-slide]').forEach(el=>{const slide=slides.find(s=>s.id===el.dataset.guideSlide);if(slide)el.innerHTML=slideHtml(slide,'zh');});if(slides.length){document.getElementById('material-status').textContent=`学习手册 · ${chapters.length} 节连续阅读 · ${slides.length} 组随文原视频图解`;document.getElementById('slide-status').textContent=handbookConfig?`本章有 ${slides.length} 张${handbookConfig.groupLabel||'原视频 PPT 截图'}，嵌在对应段落中。点击图片可放大，每张都附原视频时间链接。中文和中英对照模式在图下附中文读图。`:`本章包含 ${slides.length} 组原始演讲画面及中文译图，嵌在对应正文内。中文图片是编辑翻译版本；代码标识符保留英文。每组均有原视频时间链接。`;}
if(location.hash&&document.getElementById(location.hash.slice(1)))document.getElementById(location.hash.slice(1)).scrollIntoView();progress();}).catch(()=>{transcript.innerHTML='<p>演讲正文未能载入，请刷新页面重试，或查看<a href="transcript-source.md">附带的中英文转写</a>。</p>';});
