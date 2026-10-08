document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('projectSearch');
  const cards = [...document.querySelectorAll('.project-card')];
  const count = document.getElementById('projectCount');
  const empty = document.getElementById('noResults');
  const showAll = document.getElementById('showAll');

  const filterProjects = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card => {
      const match = !query || card.dataset.search.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible++;
    });

    count.textContent = `● ${visible} Collection${visible === 1 ? '' : 's'}`;
    empty.hidden = visible !== 0;
  };

  search.addEventListener('input', filterProjects);
  showAll.addEventListener('click', () => {
    search.value = '';
    filterProjects();
    search.focus();
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  filterProjects();
});
