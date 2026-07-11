// Tack JS
/* Countdown redirect */
var secs = 10;
var el = document.getElementById('secs');
var timer = setInterval(function() {
  secs--;
  el.textContent = secs;
  if (secs <= 0) {
    clearInterval(timer);
    window.location.href = 'index.html';
  }
}, 1000);

/* Cancel redirect if user clicks button */
document.getElementById('homeBtn').addEventListener('click', function() {
  clearInterval(timer);
  document.getElementById('countdown').style.display = 'none';
});

/* Particle background */
(function() {
  var canvas = document.getElementById('bg');
  var ctx = canvas.getContext('2d');
  var w, h, t = 0;
  var particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < 50; i++) {
    particles.push({
      x: Math.random(), y: Math.random(),
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012,
      alpha: 0.06 + Math.random() * 0.18,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
      green: Math.random() > 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(function(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
      p.pulse += p.pulseSpeed;
      var pa = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
      var px = p.x * w, py = p.y * h;
      var color = p.green ? '44,185,122' : '61,223,255';
      var grd = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
      grd.addColorStop(0, 'rgba(' + color + ',' + pa + ')');
      grd.addColorStop(1, 'rgba(' + color + ',0)');
      ctx.beginPath();
      ctx.arc(px, py, p.r * 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + color + ',' + (pa * 2.5) + ')';
      ctx.fill();
    });
    t++;
    requestAnimationFrame(draw);
  }
  draw();
})();