// Boka JS
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(function(b) {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ── Plate lookup → car.info link ────────────────────────────────────
function plateChanged() {
  var input = document.getElementById('regnr');
  var btn = document.getElementById('plateLookupBtn');
  var result = document.getElementById('plateResult');
  var hidden = document.getElementById('carinfoLink');

  var val = input.value.trim();
  btn.disabled = val.length < 3; // require at least 3 chars before allowing lookup

  // If they edit the plate after a lookup, clear the stale result/link
  if (result.classList.contains('show')) {
    result.classList.remove('show');
    hidden.value = '';
  }
}

function lookupPlate() {
  var input = document.getElementById('regnr');
  var result = document.getElementById('plateResult');
  var hidden = document.getElementById('carinfoLink');
  var plate = input.value.trim();

  if (!plate) return;

  // Build the car.info lookup URL for this Swedish plate
  var url = 'https://www.car.info/sv-se/license-plate/S/' + encodeURIComponent(plate);

  // Store it so it actually goes out with the Formspree submission
  hidden.value = url;

  // Show confirmation + clickable link in the UI
  result.classList.remove('error');
  result.innerHTML =
    '<div class="plate-result-title">' + plate + '</div>' +
    '<div class="plate-result-meta">Länk till fordonsuppgifter genererad — skickas med i din förfrågan.</div>' +
    '<a class="plate-result-link" href="' + url + '" target="_blank" rel="noopener">Visa på car.info</a>';
  result.classList.add('show');
}
