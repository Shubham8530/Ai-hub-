// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = {
  editing:     { label: 'EDITING & CREATIVE' },
  development: { label: 'DEVELOPMENT & CODING' },
  video:       { label: 'VIDEO & AUDIO' },
  writing:     { label: 'WRITING & CONTENT' },
  productivity:{ label: 'PRODUCTIVITY' },
  marketing:   { label: 'MARKETING' },
  datascience: { label: 'DATA SCIENCE' },
};
 
const ICON_COLORS = {
  editing:     ['#e63946','#f4a261','#2a9d8f','#e9c46a','#457b9d','#8338ec'],
  development: ['#4cc9f0','#4361ee','#7209b7','#f72585','#3a0ca3','#560bad'],
  video:       ['#06d6a0','#118ab2','#ffd166','#ef476f','#073b4c','#8ecae6'],
  writing:     ['#90be6d','#f8961e','#f3722c','#f94144','#577590','#43aa8b'],
  productivity:['#9b5de5','#f15bb5','#fee440','#00bbf9','#00f5d4','#ff99c8'],
  marketing:   ['#fb5607','#ff006e','#8338ec','#3a86ff','#ffbe0b','#06d6a0'],
  datascience: ['#38b2ac','#4299e1','#9f7aea','#f6ad55','#fc8181','#68d391'],
};
 
let tools = [
  { id:1, name:'MIDJOURNEY',      desc:'AI Art Generation',          cat:'editing',     style:'',       icon:'🎨', url:'https://midjourney.com' },
  { id:2, name:'Runway Gen-2',    desc:'AI Art Generation',          cat:'editing',     style:'',       icon:'🎬', url:'https://runwayml.com' },
  { id:3, name:'Adobe Firefly',   desc:'AI Adobe Firefly Tool',      cat:'editing',     style:'orange', icon:'🔥', url:'https://firefly.adobe.com' },
  { id:4, name:'Topaz Photo AI',  desc:'AI Art Generation',          cat:'editing',     style:'orange', icon:'📸', url:'https://www.topazlabs.com' },
  { id:5, name:'Runway Gentline', desc:'AI Art Generation',          cat:'editing',     style:'',       icon:'✨', url:'https://runwayml.com' },
  { id:6, name:'GITHUB COPILOT',  desc:'AI Coding Assistant',        cat:'development', style:'',       icon:'👾', url:'https://copilot.github.com' },
  { id:7, name:'Cursor AI',       desc:'AI Coding Assistant',        cat:'development', style:'',       icon:'⚡', url:'https://cursor.sh' },
  { id:8, name:'Tabnine',         desc:'AI Coding Assistant',        cat:'development', style:'orange', icon:'🔷', url:'https://www.tabnine.com' },
  { id:9, name:'TabbyML',         desc:'Tabby & & Grammar Tool',     cat:'development', style:'orange', icon:'🐱', url:'https://tabby.tabbyml.com' },
  { id:10,name:'TabbyML Pro',     desc:'AI Coding Assistant & Grammar Tool', cat:'development', style:'',  icon:'💻', url:'https://tabby.tabbyml.com' },
  { id:11,name:'Synthesia',       desc:'Writing & Grammar Tool',     cat:'video',       style:'',       icon:'🌀', url:'https://www.synthesia.io' },
  { id:12,name:'ElevenLabs',      desc:'AI ElevenLabs Founded',      cat:'video',       style:'',       icon:'🎙️', url:'https://elevenlabs.io' },
  { id:13,name:'D-ID',            desc:'AI-ID Leaturer Tool',        cat:'video',       style:'orange', icon:'🎭', url:'https://www.d-id.com' },
  { id:14,name:'Soundraw',        desc:'AI Soundraw- Flicker',       cat:'video',       style:'orange', icon:'🎵', url:'https://soundraw.io' },
  { id:15,name:'Clamar Solution', desc:'AI Art.eam Tool',            cat:'video',       style:'',       icon:'🤖', url:'#' },
  { id:16,name:'Power Training',  desc:'Daduoanit entindum',         cat:'video',       style:'',       icon:'💪', url:'#' },
];
let nextId = 17;
 
// ── Render ────────────────────────────────────────────────────────────────────
let currentFilter = 'all';
let searchQuery = '';
 
function render() {
  const container = document.getElementById('allSections');
  const catKeys = Object.keys(CATEGORIES);
  let visibleCats = currentFilter === 'all' ? catKeys : [currentFilter];
 
  let html = '';
  visibleCats.forEach(cat => {
    let catTools = tools.filter(t => t.cat === cat);
    if (searchQuery) {
      catTools = catTools.filter(t =>
        t.name.toLowerCase().includes(searchQuery) ||
        t.desc.toLowerCase().includes(searchQuery)
      );
    }
    if (searchQuery && catTools.length === 0) return;
 
    html += `<div class="section">
      <div class="section-header">
        <div class="section-title">${CATEGORIES[cat].label}</div>
        <button class="add-btn" onclick="openAddModal('${cat}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          ADD NEW TOOL
        </button>
      </div>
      <div class="cards-grid" id="grid-${cat}">`;
 
    catTools.forEach((tool, i) => {
      const colors = ICON_COLORS[cat];
      const bg = colors[tool.id % colors.length];
      html += cardHTML(tool, bg, i);
    });
 
    html += `
        <div class="card-add" onclick="openAddModal('${cat}')" style="animation-delay:${catTools.length * 0.05}s">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>ADD NEW TOOL</span>
        </div>
      </div>
    </div>`;
  });
 
  container.innerHTML = html || '<div style="color:var(--text-muted);padding:40px;text-align:center;">No tools match your search.</div>';
 
  // Adjust grid columns based on visible categories
  if (currentFilter !== 'all') {
    container.style.gridTemplateColumns = '1fr';
    // wider 3-col cards grid
    document.querySelectorAll('.cards-grid').forEach(g => g.style.gridTemplateColumns = 'repeat(3,1fr)');
  } else {
    container.style.gridTemplateColumns = 'repeat(3,1fr)';
    document.querySelectorAll('.cards-grid').forEach(g => g.style.gridTemplateColumns = 'repeat(2,1fr)');
  }
}
 
function cardHTML(tool, bg, i) {
  return `<div class="card ${tool.style}" style="animation-delay:${i * 0.05}s" data-id="${tool.id}">
    <div class="card-icon" style="background:${bg}22; font-size:20px;">${tool.icon}</div>
    <div class="card-name">${tool.name}</div>
    <div class="card-desc">${tool.desc}</div>
    <div class="card-actions">
      <button class="visit-btn" onclick="visitTool(event,'${tool.url}')">
        Visit Website
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </button>
      <button class="icon-btn" onclick="openEditModal(event,${tool.id})" title="Edit">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="icon-btn" onclick="deleteDirect(event,${tool.id})" title="Delete">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>
  </div>`;
}
 
// ── Modal ─────────────────────────────────────────────────────────────────────
let editingId = null;
let addingCat = null;
 
function openAddModal(cat) {
  editingId = null; addingCat = cat;
  document.getElementById('modalTitle').textContent = 'Add New Tool';
  document.getElementById('fieldName').value = '';
  document.getElementById('fieldDesc').value = '';
  document.getElementById('fieldUrl').value = '';
  document.getElementById('fieldCategory').value = cat;
  document.getElementById('fieldStyle').value = '';
  document.getElementById('fieldIcon').value = '🤖';
  document.getElementById('deleteBtn').style.display = 'none';
  document.getElementById('modalOverlay').classList.add('open');
}
 
function openEditModal(e, id) {
  e.stopPropagation();
  const tool = tools.find(t => t.id === id);
  if (!tool) return;
  editingId = id;
  document.getElementById('modalTitle').textContent = 'Edit Tool';
  document.getElementById('fieldName').value = tool.name;
  document.getElementById('fieldDesc').value = tool.desc;
  document.getElementById('fieldUrl').value = tool.url;
  document.getElementById('fieldCategory').value = tool.cat;
  document.getElementById('fieldStyle').value = tool.style;
  document.getElementById('fieldIcon').value = tool.icon;
  document.getElementById('deleteBtn').style.display = 'block';
  document.getElementById('modalOverlay').classList.add('open');
}
 
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}
 
function saveTool() {
  const name = document.getElementById('fieldName').value.trim();
  const desc = document.getElementById('fieldDesc').value.trim();
  const url  = document.getElementById('fieldUrl').value.trim() || '#';
  const cat  = document.getElementById('fieldCategory').value;
  const style= document.getElementById('fieldStyle').value;
  const icon = document.getElementById('fieldIcon').value.trim() || '🤖';
  if (!name) { document.getElementById('fieldName').focus(); return; }
 
  if (editingId) {
    const t = tools.find(t => t.id === editingId);
    Object.assign(t, { name, desc, url, cat, style, icon });
    showToast('Tool updated!');
  } else {
    tools.push({ id: nextId++, name, desc, url, cat, style, icon });
    showToast('Tool added!');
  }
  closeModal();
  render();
}
 
function deleteTool() {
  tools = tools.filter(t => t.id !== editingId);
  closeModal();
  render();
  showToast('Tool deleted.');
}
 
function deleteDirect(e, id) {
  e.stopPropagation();
  tools = tools.filter(t => t.id !== id);
  render();
  showToast('Tool deleted.');
}
 
function visitTool(e, url) {
  e.stopPropagation();
  if (url && url !== '#') window.open(url, '_blank');
  else showToast('No URL configured.');
}
 
// ── Tabs ──────────────────────────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    render();
  });
});
 
// ── Sidebar buttons ───────────────────────────────────────────────────────────
document.querySelectorAll('.sidebar-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
 
// ── Search ────────────────────────────────────────────────────────────────────
function filterTools(val) {
  searchQuery = val.toLowerCase().trim();
  render();
}
 
// ── Toast ─────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}
 
// ── Close modal on overlay click ──────────────────────────────────────────────
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
 
// ── Init ──────────────────────────────────────────────────────────────────────
render();