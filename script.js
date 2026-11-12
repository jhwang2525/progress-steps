// Progress Steps: a reusable stepper, shown as a multi-step checkout

const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('step-title');
const steps = document.querySelectorAll('.step');
const panels = document.querySelectorAll('.panel');

let current = 1; // 1-based

function update() {
  steps.forEach((step, idx) => {
    const n = idx + 1;
    step.classList.toggle('complete', n < current);
    step.classList.toggle('active', n === current);
    if (n === current) step.setAttribute('aria-current', 'step');
    else step.removeAttribute('aria-current');
  });

  panels.forEach((panel, idx) => panel.classList.toggle('active', idx + 1 === current));
  title.textContent = panels[current - 1].dataset.title;

  progress.style.width = `${((current - 1) / (steps.length - 1)) * 100}%`;

  prev.disabled = current === 1;
  next.textContent = current === steps.length ? 'Start over' : current === steps.length - 1 ? 'Review order' : 'Continue';
}

next.addEventListener('click', () => {
  current = current === steps.length ? 1 : current + 1;
  update();
});

prev.addEventListener('click', () => {
  if (current > 1) current--;
  update();
});

// Keyboard: left/right arrows move between steps
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input')) return;
  if (e.key === 'ArrowRight' && current < steps.length) next.click();
  if (e.key === 'ArrowLeft' && current > 1) prev.click();
});

update();
