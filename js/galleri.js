// Gallery JS
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    const match = cat === 'alla' || item.dataset.cat === cat;
    item.style.display = match ? '' : 'none';
  });
}

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    const img = this.querySelector('img');
    if (!img) return;
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-img').alt = this.dataset.title;
    document.getElementById('lightbox-tag').textContent = this.dataset.tag;
    document.getElementById('lightbox-title').textContent = this.dataset.title;
    document.getElementById('lightbox').classList.add('open');
  });
});

function closeLightbox(e) {
  if (!e || e.target === document.getElementById('lightbox') || e.target.classList.contains('lightbox-close')) {
    document.getElementById('lightbox').classList.remove('open');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('open');
});