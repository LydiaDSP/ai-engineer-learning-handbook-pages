(() => {
  const canvas = document.querySelector('.catalog-mascot');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = 400;
  const height = 300;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const palette = ['#18392f', '#34725a', '#569075', '#91a985', '#aa7441'];
  // A jittered sphere keeps the density even as the cloud turns.
  const particles = Array.from({ length: 192 }, (_, index) => {
    const y = 1 - (index + .5) * 2 / 192;
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const ring = Math.sqrt(1 - y * y);
    const radius = 81 + Math.random() * 38 + (index % 7 === 0 ? 22 : 0);
    return {
      x: Math.cos(angle) * ring * radius * 1.18,
      y: y * radius,
      z: Math.sin(angle) * ring * radius,
      radius: .9 + Math.random() ** 2 * 3.7,
      phase: Math.random() * Math.PI * 2,
      color: palette[index % 11 === 0 ? 4 : index % 4],
    };
  });

  function orb(x, y, rx, ry, colors) {
    const gradient = ctx.createRadialGradient(x - rx * .32, y - ry * .38, 0, x, y, rx * 1.04);
    for (const [stop, color] of colors) gradient.addColorStop(stop, color);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const ivory = [[0, '#fffef9'], [.66, '#f7f5e9'], [1, '#d4dfcf']];
  const copper = [[0, '#f0c392'], [.59, '#b57949'], [1, '#6e432b']];
  const ink = [[0, '#3e7964'], [.61, '#164939'], [1, '#102e28']];
  const shine = [[0, '#fffef9'], [1, '#dcece3']];

  let aimX = 0;
  let aimY = 0;
  let gazeX = 0;
  let gazeY = 0;
  let pointerInside = false;
  let touchAimUntil = 0;
  let elapsed = 0;
  let lastFrame = 0;
  let frame = 0;
  let visible = false;

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    const tilt = .23 * Math.sin(time * .54) + gazeX * .24;
    const nod = .09 * Math.sin(time * .8) - gazeY * .12;
    const cosY = Math.cos(tilt);
    const sinY = Math.sin(tilt);
    const cosX = Math.cos(nod);
    const sinX = Math.sin(nod);
    const centerY = height * .49 + Math.sin(time * 1.7) * 4;

    function project(x, y, z) {
      const turnX = x * cosY + z * sinY;
      const turnZ = z * cosY - x * sinY;
      const depth = y * sinX + turnZ * cosX;
      const scale = 470 / (470 - depth);
      return {
        x: width * .5 + turnX * scale,
        y: centerY + (y * cosX - turnZ * sinX) * scale,
        depth,
        scale,
      };
    }

    const cloud = particles.map(particle => {
      const breath = 1 + Math.sin(time * 1.4 + particle.phase) * .055;
      return { ...particle, ...project(particle.x * breath, particle.y * breath, particle.z * breath) };
    }).sort((a, b) => a.depth - b.depth);

    for (const p of cloud) {
      const closeToFace = Math.hypot((p.x - width * .5) / 92, (p.y - centerY) / 60) < 1;
      ctx.globalAlpha = (.22 + .65 * Math.min(1, Math.max(0, (p.depth + 124) / 244))) * (closeToFace ? .49 : 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.scale, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const nose = project(2, 22, 82);
    orb(nose.x, nose.y, 15 * nose.scale, 12 * nose.scale, copper);
    const blinkPhase = (time + .7) % 4.85;
    const lid = blinkPhase < .25 ? 1 - .94 * Math.sin(Math.PI * blinkPhase / .25) : 1;
    for (const side of [-1, 1]) {
      const eye = project(side * 35, -10 + (side === 1 ? -3 : 0), 85);
      const rx = 24 * eye.scale;
      const ry = 27 * eye.scale * lid;
      orb(eye.x, eye.y, rx, ry, ivory);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(eye.x, eye.y, rx, ry, 0, 0, Math.PI * 2);
      ctx.clip();
      const pupilX = eye.x + rx * (.11 + gazeX * .46);
      const pupilY = eye.y + ry * (.09 + gazeY * .45);
      orb(pupilX, pupilY, rx * .46, ry * .47, ink);
      orb(pupilX - rx * .13, pupilY - ry * .16, rx * .105, ry * .106, shine);
      ctx.restore();
    }
  }

  function animate(now) {
    frame = 0;
    const delta = lastFrame ? Math.min(.05, (now - lastFrame) / 1000) : 0;
    lastFrame = now;
    elapsed += delta;
    const easing = 1 - Math.exp(-10 * delta);
    const hasTarget = pointerInside || elapsed < touchAimUntil;
    const lookX = hasTarget ? aimX : .24 * Math.sin(elapsed * .7);
    const lookY = hasTarget ? aimY : .13 * Math.sin(elapsed * .48);
    gazeX += (lookX - gazeX) * easing;
    gazeY += (lookY - gazeY) * easing;
    draw(elapsed);
    frame = requestAnimationFrame(animate);
  }

  function updateAnimation() {
    const shouldAnimate = visible && !document.hidden && !motion.matches;
    if (shouldAnimate && !frame) frame = requestAnimationFrame(animate);
    if (!shouldAnimate) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastFrame = 0;
    }
    if (motion.matches) {
      gazeX = gazeY = 0;
      draw(0);
    }
  }

  function aimAtPointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointerInside = event.pointerType !== 'touch';
    if (!pointerInside) touchAimUntil = elapsed + 1.3;
    aimX = (event.clientX - rect.left) * 2 / rect.width - 1;
    aimY = (event.clientY - rect.top) * 2 / rect.height - 1;
  }
  canvas.addEventListener('pointermove', aimAtPointer);
  canvas.addEventListener('pointerdown', aimAtPointer);
  canvas.addEventListener('pointerleave', () => { pointerInside = false; });
  canvas.addEventListener('pointercancel', () => {
    pointerInside = false;
    touchAimUntil = 0;
  });

  new ResizeObserver(([entry]) => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(entry.contentRect.width * ratio));
    canvas.height = Math.max(1, Math.round(entry.contentRect.height * ratio));
    ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    draw(motion.matches ? 0 : elapsed);
  }).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateAnimation();
  }).observe(canvas);
  motion.addEventListener('change', updateAnimation);
  document.addEventListener('visibilitychange', updateAnimation);
})();
