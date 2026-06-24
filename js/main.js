function showToast(title, msg, type) {
  var icons = { success:'✅', danger:'❌', warning:'⚠️', info:'ℹ️' };
  let c = document.getElementById('toast-container');
  if (!c) { c = document.createElement('div'); c.id = 'toast-container'; document.body.appendChild(c); }
  var t = document.createElement('div');
  t.className = 'toast ' + (type||'info');
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><div class="toast-body"><div class="toast-title">${title}</div>${msg?`<div>${msg}</div>`:''}</div>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity='0'; t.style.transition='.3s'; setTimeout(()=>t.remove(),300); }, 3500);
}

function showLoading() { const e=document.getElementById('loading-overlay'); if(e) e.classList.add('show'); }
function hideLoading() { const e=document.getElementById('loading-overlay'); if(e) e.classList.remove('show'); }

function getCurrentUser() {
  try { return JSON.parse(sessionStorage.getItem('hospital_user')); } catch { return null; }
}
function requireAuth(role) {
  var user = getCurrentUser();
  var root = window.location.pathname.includes('/pages/') ? '../../' : '';
  if (!user) { window.location.href = root + 'index.html'; return null; }
  if (role && user.role !== role && user.role !== 'admin') {
    window.location.href = root + 'index.html'; return null;
  }
  return user;
}
function logout() {
  sessionStorage.removeItem('hospital_user');
  var root = window.location.pathname.includes('/pages/') ? '../../' : '';
  window.location.href = root + 'index.html';
}

function todayISO() { return new Date().toISOString().split('T')[0]; }
function formatDate(s) {
  if (!s) return '—';
  return new Date(s).toLocaleDateString('ar-OM', {year:'numeric',month:'short',day:'numeric'});
}
function formatDateTime(s) {
  if (!s) return '—';
  return new Date(s).toLocaleString('ar-OM', {year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
}

function populateDeptSelect(el, selected) {
  if (!el) return;
  el.innerHTML = '<option value="">-- اختر القسم --</option>';
  ALL_DEPARTMENTS.forEach(d => {
    const o = document.createElement('option');
    o.value = d; o.textContent = d;
    if (d === selected) o.selected = true;
    el.appendChild(o);
  });
}

function renderDeptCheckboxes(id, selected) {
  var c = document.getElementById(id); if (!c) return;
  c.innerHTML = '';
  ALL_DEPARTMENTS.forEach(d => {
    const lbl = document.createElement('label');
    const cb = document.createElement('input');
    cb.type='checkbox'; cb.value=d; cb.name='dept_cb';
    if ((selected||[]).includes(d)) cb.checked=true;
    lbl.appendChild(cb); lbl.appendChild(document.createTextNode(' '+d));
    c.appendChild(lbl);
  });
}
function getCheckedDepts(id) {
  return [...document.querySelectorAll(`#${id} input[name="dept_cb"]:checked`)].map(c=>c.value);
}

function setupTableSearch(inputId, tableId) {
  var inp = document.getElementById(inputId);
  var tbl = document.getElementById(tableId);
  if (!inp||!tbl) return;
  inp.addEventListener('input', () => {
    const q = inp.value.toLowerCase();
    tbl.querySelectorAll('tbody tr').forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q)?'':'none'; });
  });
}

function printSection(id, title) {
  var el = document.getElementById(id); if (!el) return;
  var w = window.open('','_blank','width=950,height=700');
  w.document.write(`<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"><title>${title||'تقرير'}</title>
  <style>body{font-family:'Segoe UI',Arial,sans-serif;direction:rtl;padding:2rem;font-size:11pt}
  h2{color:#0B3D6B}table{width:100%;border-collapse:collapse}
  th{background:#0B3D6B;color:#fff;padding:7px 9px;text-align:right;font-size:9pt}
  td{padding:6px 9px;border-bottom:1px solid #ddd;font-size:9pt}
  @media print{body{padding:0}}</style></head><body>
  <h2>🏥 مستشفى إبراء — ${title||''}</h2>
  <p style="color:#666;font-size:9pt;margin-bottom:1rem">${new Date().toLocaleDateString('ar-OM')}</p>
  ${el.outerHTML}
  <script>window.onload=()=>window.print();<\/script></body></html>`);
  w.document.close();
}

function caseTypeLabel(t) {
  var m={'شكوى':'case-complaint','اقتراح':'badge-blue','شكر':'case-thanks'};
  return `<span class="badge ${m[t]||'badge-gray'}">${t||'—'}</span>`;
}
function priorityLabel(p) {
  if (!p) return '<span class="badge badge-gray">—</span>';
  var m={'منخفضة':'priority-low','متوسطة':'priority-medium','عاجلة':'priority-urgent'};
  return `<span class="badge ${m[p]||'badge-gray'}">${p}</span>`;
}
function eventTypeLabel(t) {
  var c={'حادث سير':'badge-orange','سقوط':'badge-blue','تسمم':'badge-red','اعتداء':'badge-red','غرق':'badge-blue','التماس كهربائي':'badge-orange','في المستشفى':'badge-teal','حرق':'badge-red','إصابة في مكان العمل':'badge-orange'};
  return `<span class="badge ${c[t]||'badge-gray'}">${t||'—'}</span>`;
}

function sidebarRelations(user) {
  return `<div class="sidebar" id="main-sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo" onclick="toggleSidebar()" title="إخفاء/إظهار القائمة">
        <div class="sidebar-logo-icon">🏥</div>
        <div class="sidebar-logo-text"><strong>مستشفى إبراء</strong><span>نظام الإدارة</span></div>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="sidebar-user-name">${user.name}</div>
      <div class="sidebar-user-role">قسم العلاقات العامة والإعلام</div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">الرئيسية</div>
      <a href="home.html"><span class="nav-icon">🏠</span> الرئيسية</a>
      <div class="sidebar-section">الأحداث</div>
      <a href="daily_event.html"><span class="nav-icon">📋</span> تسجيل حدث يومي</a>
      <a href="today_event.html"><span class="nav-icon">📅</span> أحداث اليوم</a>
      <div class="sidebar-section">الملاحظات</div>
      <a href="feedback_form.html"><span class="nav-icon">📝</span> نموذج ملاحظة جديدة</a>
      <a href="feedback.html"><span class="nav-icon">📊</span> إدارة الملاحظات</a>
      <div class="sidebar-section">التقارير</div>
      <a href="search.html"><span class="nav-icon">🔍</span> البحث والتقارير</a>
    </nav>
    <div class="sidebar-footer">
      <button class="btn btn-ghost btn-sm w-full" onclick="logout()">🚪 تسجيل الخروج</button>
    </div>
  </div>`;
}

function sidebarDept(user) {
  return `<div class="sidebar" id="main-sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo" onclick="toggleSidebar()" title="إخفاء/إظهار القائمة">
        <div class="sidebar-logo-icon">🏥</div>
        <div class="sidebar-logo-text"><strong>مستشفى إبراء</strong><span>نظام الإدارة</span></div>
      </div>
    </div>
    <div class="sidebar-user">
      <div class="sidebar-user-name">${user.name}</div>
      <div class="sidebar-user-role">${user.deptName}</div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">القسم</div>
      <a href="home.html"><span class="nav-icon">🏠</span> الرئيسية</a>
      <a href="feedback.html"><span class="nav-icon">📊</span> الشكاوي والاقتراحات</a>
    </nav>
    <div class="sidebar-footer">
      <button class="btn btn-ghost btn-sm w-full" onclick="logout()">🚪 تسجيل الخروج</button>
    </div>
  </div>`;
}

function topBar(title, subtitle) {
  return `<div class="topbar">
    <div class="topbar-title"><h1>${title}</h1>${subtitle?`<p>${subtitle}</p>`:''}</div>
    <div class="topbar-actions"><span class="topbar-date" id="live-date"></span></div>
  </div>`;
}

function toggleSidebar() {
  var sidebar = document.getElementById('main-sidebar');
  var main = document.querySelector('.main-content');
  var btn = document.getElementById('sidebar-toggle-fab');
  if (!sidebar) return;
  var collapsed = sidebar.classList.toggle('collapsed');
  if (main) main.classList.toggle('sidebar-collapsed', collapsed);
  if (btn) {
    btn.textContent = collapsed ? '☰' : '✕';
    btn.classList.toggle('visible', collapsed);
  }
}

function setActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.classList.toggle('active', path.endsWith(a.getAttribute('href')));
  });
}

function startClock() {
  var el = document.getElementById('live-date'); if (!el) return;
  var tick = () => el.textContent = new Date().toLocaleString('ar-OM',{weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
  tick(); setInterval(tick, 60000);
}

function injectToggleFab() {
  var fab = document.createElement('button');
  fab.id = 'sidebar-toggle-fab';
  fab.className = 'sidebar-toggle-btn';
  fab.textContent = '☰';
  fab.title = 'إظهار القائمة';
  fab.onclick = toggleSidebar;
  document.body.appendChild(fab);
}

document.addEventListener('DOMContentLoaded', () => {
  injectToggleFab();
  startClock();
  setActiveNav();
});
