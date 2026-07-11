// Index JS – waveform + floating reviews
/* Waveform animation */
(function() {
  const canvas = document.getElementById('waveform');
  const ctx = canvas.getContext('2d');
  let w, h, t = 0;
  let mouse = { x: 0.5, y: 0.5 };

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX / window.innerWidth;
    mouse.y = e.clientY / window.innerHeight;
  });

  // Particles
  const PARTICLE_COUNT = 70;
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      alpha: 0.08 + Math.random() * 0.22,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.015,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // --- particles ---
    for (const p of particles) {
      p.x += p.vx + (mouse.x - 0.5) * 0.00008;
      p.y += p.vy + (mouse.y - 0.5) * 0.00008;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      p.pulse += p.pulseSpeed;
      const pa = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
      const px = p.x * w, py = p.y * h;
      // glow
      const grd = ctx.createRadialGradient(px, py, 0, px, py, p.r * 4);
      grd.addColorStop(0, `rgba(61,223,255,${pa})`);
      grd.addColorStop(1, 'rgba(61,223,255,0)');
      ctx.beginPath();
      ctx.arc(px, py, p.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      // core dot
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(61,223,255,${pa * 2.5})`;
      ctx.fill();
    }

    // --- waveforms ---
    const lines = 7;
    for (let l = 0; l < lines; l++) {
      const amp = (30 + l * 22) * (0.6 + mouse.x * 0.8);
      const freq = 0.005 + l * 0.0018;
      const speed = 0.014 + l * 0.003;
      const yBase = h * (0.18 + l * 0.11);
      ctx.beginPath();
      ctx.moveTo(0, yBase);
      for (let x = 0; x <= w; x += 2) {
        const y = yBase
          + Math.sin(x * freq + t * speed + l * 1.1) * amp
          + Math.sin(x * freq * 2.1 + t * speed * 0.6 + l) * (amp * 0.35)
          + Math.sin(x * freq * 0.5 + t * speed * 1.4) * (amp * 0.2);
        ctx.lineTo(x, y);
      }
      const alpha = (0.28 - l * 0.025) * (0.7 + mouse.y * 0.5);
      ctx.strokeStyle = `rgba(61,223,255,${Math.max(0.02, alpha)})`;
      ctx.lineWidth = 1.5 - l * 0.12;
      ctx.stroke();
    }

    // --- scan line ---
    const scanX = ((t * 0.4) % (w + 200)) - 100;
    const scanGrd = ctx.createLinearGradient(scanX - 60, 0, scanX + 60, 0);
    scanGrd.addColorStop(0, 'rgba(61,223,255,0)');
    scanGrd.addColorStop(0.5, 'rgba(61,223,255,0.04)');
    scanGrd.addColorStop(1, 'rgba(61,223,255,0)');
    ctx.fillStyle = scanGrd;
    ctx.fillRect(scanX - 60, 0, 120, h);

    t++;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* Form submit */
/* Floating reviews */
(function() {
  var reviews = [
    { s:5, t:'"Lämnade in bilen på morgonen, hämtade på eftermiddagen. Allt på plats, inga konstigheter."', i:'ML', n:'Marcus L.', c:'Volvo V60' },
    { s:5, t:'"Visste inte riktigt vad jag ville ha. Fick bra råd, inget onödigt köpt. Nöjd."', i:'SK', n:'Sara K.', c:'BMW 3-serie' },
    { s:5, t:'"Fixade en dashcam som tre andra inte lyckats få att fungera rätt. Sitter bra nu."', i:'JW', n:'Johan W.', c:'Toyota RAV4' },
    { s:5, t:'"Priset stämde med offerten. Det är mer ovanligt än man tror."', i:'AH', n:'Anders H.', c:'Audi A4' },
    { s:5, t:'"Panelerna satt tillbaka som originalet. Har haft folk som lämnat spår — inte här."', i:'EP', n:'Emma P.', c:'VW Golf' },
    { s:5, t:'"Hittade ett jordningsfel jag slitit med i månader. Tog honom en halvtimme."', i:'RN', n:'Reza N.', c:'Mercedes C' },
    { s:4, t:'"Tog lite längre tid än planerat men han hörde av sig och förklarade varför. Okej."', i:'TL', n:'Tobias L.', c:'Ford Focus' },
    { s:5, t:'"Ingen rörig kabelhärva under sätet. Känns genomtänkt."', i:'LB', n:'Linn B.', c:'Skoda Octavia' },
    { s:5, t:'"Förklarade vad han gjorde och varför. Inte bara plugga in grejer och hoppas."', i:'PO', n:'Peter O.', c:'Seat Leon' },
    { s:4, t:'"Inte det billigaste men man märker varför. Kablar faktiskt fästa ordentligt."', i:'MJ', n:'Magnus J.', c:'Toyota Corolla' },
    { s:5, t:'"Trodde jag behövde byta hela systemet. Behövde inte det. Ärlig bedömning."', i:'FL', n:'Fatima L.', c:'Hyundai i30' },
    { s:5, t:'"Mätmikrofon, REW, hela paketet. Låter annorlunda nu — på ett bra sätt."', i:'TO', n:'Thomas O.', c:'BMW 5-serie' },
    { s:5, t:'"Inga dolda avgifter. Betalade exakt det jag fått offert på."', i:'HN', n:'Henrik N.', c:'Volvo XC60' },
    { s:5, t:'"Bra kommunikation. Svarade på meddelanden samma dag."', i:'KS', n:'Karin S.', c:'Honda Civic' },
  ];
  var stage = document.getElementById('reviewStage');
  if (!stage) return;
  var cards = reviews.map(function(r, i) {
    var el = document.createElement('div');
    el.className = 'rv-card';
    el.innerHTML =
      '<div class="rv-stars">' + '★'.repeat(r.s) + '☆'.repeat(5-r.s) + '</div>' +
      '<div class="rv-text">' + r.t + '</div>' +
      '<div class="rv-foot"><div class="rv-av">' + r.i + '</div>' +
      '<div><div class="rv-name">' + r.n + '</div><div class="rv-car">' + r.c + '</div></div></div>';
    var speed = 0.18 + Math.random() * 0.22;
    var dir   = i % 2 === 0 ? 1 : -1;
    var depth = 0.65 + Math.random() * 0.35;
    var rot   = (Math.random() - 0.5) * 9;
    var yPos  = 30 + Math.random() * ((stage.offsetHeight || 380) - 200);
    var xPos  = dir === 1
      ? -220 + (i / reviews.length) * (stage.offsetWidth + 440)
      : stage.offsetWidth + 20 - (i / reviews.length) * (stage.offsetWidth + 440);
    el.style.cssText = 'top:'+yPos+'px;left:'+xPos+'px;transform:rotate('+rot+'deg) scale('+depth+');opacity:'+(0.5+depth*0.5)+';z-index:'+Math.round(depth*10)+';';
    stage.appendChild(el);
    var overed = false;
    el.addEventListener('mouseenter', function(){ overed=true; });
    el.addEventListener('mouseleave', function(){
      overed=false;
      el.style.transform='rotate('+rot+'deg) scale('+depth+')';
    });
    return { el:el, speed:speed, dir:dir, rot:rot, depth:depth, xPos:xPos, overed:function(){ return overed; } };
  });
  (function tick() {
    var W = stage.offsetWidth;
    cards.forEach(function(card) {
      if (card.overed()) return;
      card.xPos += card.speed * card.dir;
      if (card.dir===1  && card.xPos > W+20)  card.xPos = -220;
      if (card.dir===-1 && card.xPos < -220)  card.xPos = W+20;
      card.el.style.left = card.xPos+'px';
    });
    requestAnimationFrame(tick);
  })();
})();
