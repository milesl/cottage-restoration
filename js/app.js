// ─── PROJECT CONFIG ───
const PROJECTS = {
  'cottage': {
    title: 'Cottage Restoration',
    subtitle: '200-Year-Old Yorkshire Stone Cottage — Render Removal, Lime Repointing & Limewash',
    date: 'Started: Feb 2026 · NE England',
    sections: [
      { id: 'cottage-order',     label: 'Order of Work'   },
      { id: 'cottage-milestones', label: 'Milestones'     },
      { id: 'cottage-quickref',  label: 'Quick Reference' },
      { id: 'cottage-materials', label: 'Materials & Mix' },
      { id: 'cottage-shopping',  label: 'Shopping List'   },
      { id: 'cottage-safety',    label: 'Safety'          },
      { id: 'cottage-tips',      label: 'Tips & Lessons'  },
    ]
  },
  'living-room': {
    title: 'Living Room Renovation',
    subtitle: 'Wall Stripping, Fireplace Opening & Remodel',
    date: 'Planned: 2026',
    sections: [
      { id: 'lr-order',      label: 'Order of Work' },
      { id: 'lr-milestones', label: 'Milestones'    },
      { id: 'lr-shopping',   label: 'Shopping List' },
      { id: 'lr-safety',     label: 'Safety'        },
    ]
  }
};

let activeProject = 'cottage';
let scrollSpyCleanup = null;

// ─── PROJECT SWITCHING ───
function switchProject(id) {
  activeProject = id;

  document.querySelectorAll('.project').forEach(p => { p.hidden = true; });
  document.getElementById('project-' + id).hidden = false;

  const config = PROJECTS[id];
  document.getElementById('headerTitle').textContent    = config.title;
  document.getElementById('headerSubtitle').textContent = config.subtitle;
  document.getElementById('headerDate').textContent     = config.date;

  document.querySelectorAll('.project-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.project === id);
  });

  renderSectionNav();
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── SECTION NAV ───
function renderSectionNav() {
  const nav = document.getElementById('sectionNavInner');
  const sections = PROJECTS[activeProject].sections;
  nav.innerHTML = '';

  sections.forEach((s, i) => {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.textContent = s.label;
    if (i === 0) a.classList.add('active');
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById(s.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.querySelectorAll('a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
    nav.appendChild(a);
  });

  initScrollSpy();
}

// ─── PROGRESS ───
function updateProgress() {
  const proj = document.getElementById('project-' + activeProject);
  const all  = proj.querySelectorAll('.task');
  const done = proj.querySelectorAll('.task.done');
  const pct  = all.length ? Math.round((done.length / all.length) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent  = pct + '%';
}

// ─── SCROLL SPY ───
function initScrollSpy() {
  if (scrollSpyCleanup) scrollSpyCleanup();

  const proj     = document.getElementById('project-' + activeProject);
  const sections = proj.querySelectorAll('.section[id]');
  const navInner = document.getElementById('sectionNavInner');

  function onScroll() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });
    navInner.querySelectorAll('a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll);
  scrollSpyCleanup = () => window.removeEventListener('scroll', onScroll);
}

// ─── PROJECT NAV CLICKS ───
document.querySelectorAll('.project-nav a').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    switchProject(this.dataset.project);
  });
});

// ─── INIT ───
renderSectionNav();
updateProgress();
