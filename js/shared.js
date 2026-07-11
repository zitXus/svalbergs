// Svalbergs Bilteknik – Shared JS

// Auto year
document.addEventListener('DOMContentLoaded', function() {
  var el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
});

// Hamburger menu
(function() {
  var btn = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function() {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
