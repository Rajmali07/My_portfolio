document.addEventListener('DOMContentLoaded', () => {
  const tabs = [...document.querySelectorAll('[data-project-filter]')];
  const cards = [...document.querySelectorAll(
    '.project-spotlight-card, .projects-catalog-section .project-card, .security-lab-section .project-card'
  )];
  const spotlightStack = document.querySelector('.project-spotlight-stack');
  const catalogSection = document.querySelector('.projects-catalog-section');
  const securitySection = document.querySelector('.security-lab-section');
  const status = document.querySelector('.project-filter-status');

  if (!tabs.length || !cards.length) return;

  const matchesFilter = (card, filter) => {
    const text = `${card.textContent} ${card.className}`.toLowerCase();
    const isSpotlight = card.classList.contains('project-spotlight-card');
    const isSecurity = Boolean(card.closest('.security-lab-section'));

    if (filter === 'featured') return isSpotlight;
    if (filter === 'security') return isSecurity;
    if (isSecurity) return false;
    if (filter === 'full-stack') {
      return /full.?stack|node\.js|express\.js|mongodb|back.?end|billing|rental platform|digital farm|service platform/.test(text);
    }
    if (filter === 'frontend') {
      return /frontend|front.?end|responsive|user interface|\bui\b|ghibli|swach raipur|unity workers|marketplace|property rental/.test(text);
    }
    if (filter === 'experiments') {
      return /ghibli|line follower|arduino|frontend clones|clone/.test(text);
    }
    return true;
  };

  const applyFilter = (filter) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.projectFilter === filter;
      tab.classList.toggle('projects-tab-active', isActive);
      tab.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach((card) => {
      card.hidden = !matchesFilter(card, filter);
    });

    const visibleSpotlights = cards.some((card) => card.classList.contains('project-spotlight-card') && !card.hidden);
    const visibleCatalog = cards.some((card) => card.closest('.projects-catalog-section') && !card.hidden);
    const visibleSecurity = cards.some((card) => card.closest('.security-lab-section') && !card.hidden);
    if (spotlightStack) spotlightStack.hidden = !visibleSpotlights;
    if (catalogSection) catalogSection.hidden = !visibleCatalog;
    if (securitySection) securitySection.hidden = !visibleSecurity;

    const activeTab = tabs.find((tab) => tab.dataset.projectFilter === filter);
    const visibleCount = cards.filter((card) => !card.hidden).length;
    if (status && activeTab) {
      status.textContent = `Showing ${visibleCount} ${activeTab.textContent.trim().toLowerCase()} project${visibleCount === 1 ? '' : 's'}.`;
    }
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => applyFilter(tab.dataset.projectFilter)));
  applyFilter('featured');
});
