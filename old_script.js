// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple contact form validation + mailto fallback
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();
  const date = form.date.value;

  // Reset errors
  form.querySelectorAll('.error').forEach(el => el.textContent = '');

  let valid = true;
  if (!name) {
    form.querySelector('#name + .error').textContent = 'Bitte Namen angeben.';
    valid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    form.querySelector('#email + .error').textContent = 'Bitte gültige E‑Mail angeben.';
    valid = false;
  }
  if (!message) {
    form.querySelector('#message + .error').textContent = 'Bitte Ihr Anliegen beschreiben.';
    valid = false;
  }
  if (!valid) return;

  const subject = encodeURIComponent(`Anfrage: ${service} – ${name}`);
  const bodyLines = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    `Leistung: ${service}`,
    date ? `Wunschtermin: ${date}` : null,
    '',
    'Nachricht:',
    message
  ].filter(Boolean).join('\n');

  // Replace with your real inbox
  const to = 'hallo@gruenfix.de';
  window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;

  // Optional: show a small toast
  alert('Vielen Dank! Ihr E‑Mail‑Programm öffnet sich gleich mit Ihrer Anfrage.');
});
