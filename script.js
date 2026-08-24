const panels = [...document.querySelectorAll('.panel')];
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-go]');
  if (!button) return;
  panels.forEach((panel) => panel.classList.remove('active'));
  document.getElementById(button.dataset.go)?.classList.add('active');
});
