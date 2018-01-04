import lozad from 'lozad'

document.getElementById('lazy-load-btn').addEventListener('click', lazyload);

function lazyload() {
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  document.getElementById('lazy-load-btn').classList.add('hidden');
}
