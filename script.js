/* script.js - interactions:
   - dark mode toggle
   - dynamic greeting
   - carousel (manual, autoplay removed)
   - form verification
*/

document.addEventListener('DOMContentLoaded', () => {
  // DARK MODE toggle
  const toggle = document.getElementById('dark-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('prefDark');
  if (saved === 'true') html.classList.add('dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('prefDark', html.classList.contains('dark'));
      toggle.setAttribute('aria-pressed', html.classList.contains('dark'));
    });
  }

  // DYNAMIC GREETING (main_page only)
  const greetTarget = document.getElementById('dynamic-greeting');
  if (greetTarget) {
    const hour = new Date().getHours();
    let msg = "Hello!";
    if (hour < 12) msg = "Good Morning, welcome to my portfolio!";
    else if (hour < 18) msg = "Good Afternoon, thanks for visiting!";
    else msg = "Good Evening, enjoy exploring my work!";
    greetTarget.textContent = msg;
  }

  // CAROUSEL (manual only)
  const track = document.querySelector('.carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    let index = 0;
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    function update() {
      const width = track.clientWidth;
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      track.style.transform = `translateX(-${index * width}px)`;
    }

    window.addEventListener('resize', update);
    if (prevBtn) prevBtn.addEventListener('click', () => { index--; update(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { index++; update(); });

    update(); // initial
  }

  // FORM VERIFICATION (what_now page)
  const form = document.getElementById('feedback-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      const errorBox = form.querySelector('.form-error');
      errorBox.textContent = "";

      if (!name || !message) {
        errorBox.textContent = "⚠️ Please fill out both fields.";
        return;
      }

      // If valid, show confirmation
      form.reset();
      errorBox.textContent = "✅ Thank you for your feedback!";
    });
  }
});
