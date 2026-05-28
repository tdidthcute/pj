/* ========================================
   PAWGEN — admin.js  (fixed + full CRUD)
======================================== */

// ===== STORAGE KEYS (đồng bộ với login.html) =====
const STORAGE_KEY    = "pawlink_pets";
const PENDING_KEY    = "pawlink_pending";
const SESSION_KEY    = "pawgen_session"; // ĐÃ SỬA: đồng bộ với app.js
const USERS_KEY      = "pawlink_users";
const FOSTERS_KEY    = "pawgen_fosters";
const VOLUNTEERS_KEY = "pawgen_volunteers";
const MERCH_KEY      = "pawgen_merch";
const ORDERS_KEY     = "pawgen_orders";

// ===== SEED DATA =====
const SEED_PENDING = [
  { id:"RPT-001", submitTime:"2 phút trước", reporter:"Nguyễn Thị Lan", phone:"0901234567", name:"Kem", type:"cat", emoji:"🐱", age:"~1 tháng", gender:"Không rõ", location:"Cổng sau ĐH Bách Khoa, Q.10", condition:"urgent", desc:"Mèo con rất nhỏ, đang kêu liên tục, có vẻ bị bỏ rơi từ tối qua. Chân phải hơi khập khiễng.", tags:["Mèo con","Cần cứu gấp"], bgColor:"#FFF0E8", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
  { id:"RPT-002", submitTime:"15 phút trước", reporter:"Trần Văn Minh", phone:"0912345678", name:"Bí", type:"dog", emoji:"🐕", age:"~4 tháng", gender:"Đực", location:"Hẻm 12 Lê Văn Sỹ, Q.3", condition:"watch", desc:"Chó con lông vàng, có vẻ lạc. Đang ngồi trước cửa nhà tôi từ sáng.", tags:["Chó con","Lạc chủ?"], bgColor:"#FFF8E0", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
  { id:"RPT-003", submitTime:"1 giờ trước", reporter:"Lê Phương Anh", phone:"0987654321", name:"Sữa", type:"cat", emoji:"😸", age:"~6 tháng", gender:"Cái", location:"Sân KTX ĐHQG, Thủ Đức", condition:"safe", desc:"Mèo trắng sống lang thang trong KTX đã 2 tuần, sinh viên cho ăn nhưng không ai nuôi hẳn.", tags:["Mèo trẻ","Sức khỏe tốt"], bgColor:"#F0F8FF", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
];

const SEED_FOSTERS = [
  { id:1, name:"Nguyễn Minh Anh", area:"Quận 10", type:"Mèo", rating:5, current:1, max:2, phone:"0901234567", avatar:"🌸", joined:"15/01/2025", status:"active" },
  { id:2, name:"Trần Hoàng Hùng", area:"Thủ Đức", type:"Chó + Mèo", rating:5, current:0, max:1, phone:"0912345678", avatar:"🌟", joined:"22/01/2025", status:"active" },
  { id:3, name:"Lê Phương Linh", area:"Quận 3", type:"Mèo", rating:4, current:2, max:2, phone:"0987654321", avatar:"🎀", joined:"30/01/2025", status:"active" },
  { id:4, name:"Phạm Văn Khoa", area:"Bình Thạnh", type:"Chó", rating:5, current:1, max:3, phone:"0978123456", avatar:"⭐", joined:"05/02/2025", status:"active" },
  { id:5, name:"Võ Thị Mai", area:"Quận 7", type:"Mèo", rating:4, current:0, max:2, phone:"0965432187", avatar:"🌺", joined:"12/02/2025", status:"active" },
];

const SEED_VOLUNTEERS = [
  { id:1, name:"Trần Minh Khoa", role:"Rescuer", area:"Q.1, Q.3", phone:"0901111222", status:"active", missions:12, joined:"10/01/2025" },
  { id:2, name:"Nguyễn Thu Hà", role:"Foster Parent", area:"Thủ Đức", phone:"0912222333", status:"active", missions:8, joined:"18/01/2025" },
  { id:3, name:"Lê Văn Dũng", role:"Coordinator", area:"Online", phone:"0923333444", status:"active", missions:24, joined:"05/01/2025" },
  { id:4, name:"Phạm Bích Ngọc", role:"Pet Photographer", area:"Q.7, Q.5", phone:"0934444555", status:"inactive", missions:5, joined:"20/02/2025" },
  { id:5, name:"Vũ Hoàng Nam", role:"Rescuer", area:"Bình Thạnh", phone:"0945555666", status:"active", missions:17, joined:"14/01/2025" },
];

const SEED_MERCH = [
  { id:1, name:"Áo Phông PAWGEN Classic", type:"apparel", emoji:"👕", price:250000, desc:"Unisex, cotton 100%, in lưới cao cấp. Màu kem & xanh rừng.", badge:"Bán chạy nhất", bgColor:"#E8F0FF" },
  { id:2, name:"Hoodie Cứu Hộ Hero", type:"apparel", emoji:"🧥", price:480000, desc:"Nỉ ấm, có túi kangaroo. In slogan 'Rescue. Foster. Adopt.'", badge:"New", bgColor:"#FFF0E8" },
  { id:3, name:"Tote Bag PawPrint", type:"accessory", emoji:"👜", price:150000, desc:"Canvas dày, 2 quai chắc. In dấu chân thú cưng nghệ thuật.", badge:"Eco", bgColor:"#E8FFE8" },
  { id:4, name:"Bộ Sticker PAWGEN Vol.1", type:"sticker", emoji:"🎨", price:45000, desc:"12 sticker chống nước. Thiết kế chibi mèo chó cute.", badge:"45K", bgColor:"#FFF8E0" },
  { id:5, name:"Mug Terracotta Cat", type:"homeware", emoji:"☕", price:180000, desc:"Sứ cao cấp 350ml. Họa tiết mèo thủ công trên nền đất nung.", badge:null, bgColor:"#FFE8E8" },
  { id:6, name:"Nón Bucket PAWGEN", type:"apparel", emoji:"🧢", price:220000, desc:"Chất liệu chống nắng tốt. Thêu logo PAWGEN 3D.", badge:"Limited", bgColor:"#E8F5FF" },
  { id:7, name:"Keychain Paw Charm", type:"accessory", emoji:"🔑", price:65000, desc:"Hợp kim kẽm mạ vàng. Dấu chân thú cưng siêu cute.", badge:null, bgColor:"#F5E8FF" },
  { id:8, name:"Gối Tựa Lưng Mochi", type:"homeware", emoji:"🛋️", price:320000, desc:"Gối bông cao su non. In hình Mochi — mèo được cứu hộ đầu tiên của PAWGEN.", badge:"Story", bgColor:"#E8FFF5" },
  { id:9, name:"Poster Art 'Every Life Counts'", type:"sticker", emoji:"🖼️", price:95000, desc:"A3, in decal cao cấp không thấm nước. Thiết kế tranh nghệ thuật.", badge:null, bgColor:"#FFF0F5" },
];

// ===== HELPERS =====
function getApproved()   { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]"); } catch { return []; } }
function getPending()    { try { const s=JSON.parse(localStorage.getItem(PENDING_KEY)||"null"); if(!s){localStorage.setItem(PENDING_KEY,JSON.stringify(SEED_PENDING));return SEED_PENDING;} return s; } catch { return SEED_PENDING; } }
function getFosters()    { try { const s=JSON.parse(localStorage.getItem(FOSTERS_KEY)||"null"); if(!s){localStorage.setItem(FOSTERS_KEY,JSON.stringify(SEED_FOSTERS));return SEED_FOSTERS;} return s; } catch { return SEED_FOSTERS; } }
function getVolunteers() { try { const s=JSON.parse(localStorage.getItem(VOLUNTEERS_KEY)||"null"); if(!s){localStorage.setItem(VOLUNTEERS_KEY,JSON.stringify(SEED_VOLUNTEERS));return SEED_VOLUNTEERS;} return s; } catch { return SEED_VOLUNTEERS; } }
function getOrders()    { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)||"[]"); } catch { return []; } }
function saveOrders(d)  { localStorage.setItem(ORDERS_KEY, JSON.stringify(d)); }
function getMerch()      { try { const s=JSON.parse(localStorage.getItem(MERCH_KEY)||"null"); if(!s){localStorage.setItem(MERCH_KEY,JSON.stringify(SEED_MERCH));return SEED_MERCH;} return s; } catch { return SEED_MERCH; } }
function getSession()    { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } }

function savePending(d)    { localStorage.setItem(PENDING_KEY,    JSON.stringify(d)); }
function saveApproved(d)   { localStorage.setItem(STORAGE_KEY,    JSON.stringify(d)); }
function saveFosters(d)    { localStorage.setItem(FOSTERS_KEY,    JSON.stringify(d)); }
function saveVolunteers(d) { localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(d)); }
function saveMerch(d)      { localStorage.setItem(MERCH_KEY,      JSON.stringify(d)); }
function formatPrice(n)    { return n.toLocaleString("vi-VN") + " VNĐ"; }

// ===== STATE =====
let currentPage = "overview";
let pendingList = [], approvedList = [];
let selectedEmoji = "🐱", currentTags = [], editingId = null;
let editingFosterId = null, editingVolunteerId = null, editingMerchId = null;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initModal();
  pendingList = getPending();
  approvedList = getApproved();
  updatePendingBadge();

  const sess = getSession();
  if (sess && sess.role === "admin") {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminApp").style.display = "flex";
    navigateTo("overview");
  } else {
    initLogin();
  }
});

// ===== LOGIN (FIX #1) =====
function initLogin() {
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value.trim().toLowerCase();
    const pass = document.getElementById("loginPass").value.trim();

    const isAdminUser = (user === "admin" || user === "admin@pawlink.vn" || user === "admin@pawgen.vn");
    const isAdminPass = (pass === "pawgen123" || pass === "pawlink123");

    let found = null;
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      found = users.find(u => (u.email === user || u.name?.toLowerCase() === user) && u.password === pass && u.role === "admin");
    } catch {}

    if ((isAdminUser && isAdminPass) || found) {
      const adminUser = found || { name:"Admin PAWGEN", email:"admin@pawgen.vn", role:"admin" };
      // LƯU SESSION ĐÚNG CẤU TRÚC ĐỂ app.js NHẬN DIỆN
      const sessionData = {
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
        isLoggedIn: true
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("adminApp").style.display = "flex";
      navigateTo("overview");
    } else {
      document.getElementById("loginError").classList.add("show");
      setTimeout(() => document.getElementById("loginError").classList.remove("show"), 3000);
    }
  });
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById("adminApp").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";
}

// ===== SIDEBAR =====
function initSidebar() {
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", () => {
      const page = link.dataset.page;
      if (page) navigateTo(page);
      document.getElementById("sidebar").classList.remove("mobile-open");
    });
  });

  document.getElementById("sidebarToggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const main = document.querySelector(".admin-main");
    if (window.innerWidth <= 900) sidebar.classList.toggle("mobile-open");
    else { sidebar.classList.toggle("collapsed"); main.classList.toggle("expanded"); }
  });
}

function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll(".sidebar-link").forEach(l => l.classList.toggle("active", l.dataset.page === page));
  const titles = { overview:"Dashboard Tổng quan", pending:"Duyệt báo cáo", approved:"Đã duyệt", rejected:"Đã từ chối", add:"Thêm thú cưng", fosters:"Người nuôi tạm", volunteers:"Tình nguyện viên", merch:"Quản lý Merch", orders:"Quản lý Đơn hàng" };
  document.getElementById("topbarTitle").textContent = titles[page] || page;
  pendingList = getPending(); approvedList = getApproved();
  switch(page) {
    case "overview":   renderOverview(); break;
    case "pending":    renderPending(); break;
    case "approved":   renderApproved(); break;
    case "rejected":   renderRejected(); break;
    case "add":        renderAddForm(); break;
    case "fosters":    renderFosters(); break;
    case "volunteers": renderVolunteers(); break;
    case "merch":      renderMerch(); break;
    case "orders":     renderOrders(); break;
  }
}

function updatePendingBadge() {
  const cnt = getPending().filter(p=>p.status==="pending").length;
  const b = document.getElementById("pendingCount");
  if(b){ b.textContent=cnt; b.style.display=cnt>0?"inline-block":"none"; }
  const oCnt = getOrders().filter(o=>o.status==="pending"||o.status==="awaiting_payment").length;
  const ob = document.getElementById("ordersCount");
  if(ob){ ob.textContent=oCnt; ob.style.display=oCnt>0?"inline-block":"none"; }
}

// ===== OVERVIEW =====
function renderOverview() {
  const pCnt = getPending().filter(p=>p.status==="pending").length;
  const rCnt = getPending().filter(p=>p.status==="rejected").length;
  const total = getApproved().length;
  document.getElementById("pageContent").innerHTML = `
    <div class="metrics-row">
      <div class="metric-card" style="border-top-color:var(--yellow)">
        <div class="metric-icon">⏳</div><span class="metric-val" style="color:var(--yellow)">${pCnt}</span>
        <div class="metric-label">Chờ duyệt</div><div class="metric-change" style="color:var(--yellow)">Cần xử lý sớm</div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">✅</div><span class="metric-val">${total}</span>
        <div class="metric-label">Thú cưng đã duyệt</div><div class="metric-change">Hiện trên trang chủ</div>
      </div>
      <div class="metric-card" style="border-top-color:var(--red)">
        <div class="metric-icon">❌</div><span class="metric-val" style="color:var(--red)">${rCnt}</span>
        <div class="metric-label">Đã từ chối</div>
      </div>
      <div class="metric-card" style="border-top-color:var(--forest-light)">
        <div class="metric-icon">📊</div><span class="metric-val" style="color:var(--forest-light)">${getPending().length}</span>
        <div class="metric-label">Tổng báo cáo nhận</div>
      </div>
    </div>
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">⏳ Báo cáo mới nhất cần xử lý</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="navigateTo('pending')">Xem tất cả →</button>
      </div>
      ${renderPendingTable(getPending().filter(p=>p.status==="pending").slice(0,4))}
    </div>`;
}

// ===== PENDING =====
function renderPending(searchVal="") {
  let items = getPending().filter(p=>p.status==="pending");
  if(searchVal) items = items.filter(p=>p.name.toLowerCase().includes(searchVal.toLowerCase())||p.location.toLowerCase().includes(searchVal.toLowerCase()));
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">Báo cáo chờ duyệt (${items.length})</span>
        <div class="table-actions">
          <input class="search-input" placeholder="🔍 Tìm tên, địa điểm..." value="${searchVal}" oninput="renderPending(this.value)"/>
        </div>
      </div>
      ${items.length===0?`<div class="empty-state"><div class="empty-state-icon">🎉</div><h3>Không có báo cáo nào chờ duyệt!</h3></div>`:renderPendingTable(items)}
    </div>`;
}

function renderPendingTable(items) {
  if(!items.length) return `<div class="empty-state"><div class="empty-state-icon">✅</div><h3>Không có!</h3></div>`;
  return `<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Thú cưng</th><th>Người báo</th><th>Địa điểm</th><th>Mức độ</th><th>Thời gian</th><th>Hành động</th></tr></thead><tbody>
    ${items.map(item=>`<tr>
      <td><div class="pet-cell"><div class="pet-emoji-sm" style="background:${item.bgColor}">${item.emoji}</div><div><div class="pet-cell-name">${item.name}</div><div class="pet-cell-sub">${item.type==="cat"?"🐱 Mèo":"🐶 Chó"} · ${item.age}</div></div></div></td>
      <td><div style="font-weight:500">${item.reporter}</div><div style="font-size:0.72rem;color:var(--mid-gray)">${item.phone}</div></td>
      <td style="max-width:160px;font-size:0.82rem">${item.location}</td>
      <td><span class="sbadge sbadge-${item.condition}">${item.condition==="urgent"?"🔴 Khẩn cấp":item.condition==="watch"?"🟡 Theo dõi":"🟢 An toàn"}</span></td>
      <td style="font-size:0.78rem;color:var(--mid-gray)">${item.submitTime}</td>
      <td><div class="action-btns">
        <button class="btn-view" onclick="viewPet('${item.id}','pending')">👁 Xem</button>
        <button class="btn-approve" onclick="approvePet('${item.id}')">✅ Duyệt</button>
        <button class="btn-reject" onclick="openRejectModal('${item.id}')">❌ Từ chối</button>
      </div></td>
    </tr>`).join("")}
  </tbody></table></div>`;
}

// ===== APPROVE / REJECT =====
function approvePet(id) {
  pendingList = getPending(); approvedList = getApproved();
  const idx = pendingList.findIndex(p=>p.id===id);
  if(idx===-1) return;
  const raw = pendingList[idx];
  const pet = {
    ...raw,
    status: raw.condition || "safe",
    approvedTime: new Date().toLocaleString("vi-VN"),
    id: Date.now(),
    tags: raw.tags || [],
    fosterDays: raw.fosterDays || 0,
    costs: raw.costs || "0 VNĐ",
    vaccinated: raw.vaccinated || false,
    neutered: raw.neutered || false,
    journal: raw.journal || [{ date: new Date().toLocaleDateString("vi-VN"), content: `Được báo cáo bởi ${raw.reporter}. Đã được admin duyệt.` }],
    desc: raw.desc || "",
    bgColor: raw.bgColor || "#FFF0E8",
    emoji: raw.emoji || "🐾",
  };
  pendingList[idx].status = "approved";
  approvedList.push(pet);
  savePending(pendingList); saveApproved(approvedList); updatePendingBadge();
  closeModal(); showToast(`✅ Đã duyệt "${pet.name}"! Sẽ xuất hiện ngay trên trang chủ.`); navigateTo("pending");
}

function openRejectModal(id) {
  const pet = getPending().find(p=>p.id===id);
  if(!pet) return;
  document.getElementById("modalContent").innerHTML = `
    <h3 style="font-family:var(--font-display);margin-bottom:1rem">❌ Từ chối báo cáo</h3>
    <div class="modal-pet-header">
      <div class="pet-emoji-sm" style="background:${pet.bgColor};width:60px;height:60px;font-size:2.5rem">${pet.emoji}</div>
      <div><div class="modal-pet-name">${pet.name}</div><div style="font-size:0.82rem;color:var(--mid-gray)">${pet.location}</div></div>
    </div>
    <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:0.4rem">Lý do từ chối *</label>
    <textarea class="reject-reason" id="rejectReason" rows="3" placeholder="VD: Thông tin không đủ..."></textarea>
    <div style="display:flex;gap:0.75rem">
      <button class="btn-reject" style="flex:1;padding:0.75rem" onclick="confirmReject('${id}')">❌ Xác nhận</button>
      <button class="btn-reset" style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>`;
  openModal();
}

function confirmReject(id) {
  const reason = document.getElementById("rejectReason")?.value?.trim();
  if(!reason){ showToast("⚠️ Vui lòng nhập lý do!"); return; }
  pendingList = getPending();
  const idx = pendingList.findIndex(p=>p.id===id);
  if(idx===-1) return;
  pendingList[idx].status = "rejected"; pendingList[idx].rejectReason = reason; pendingList[idx].rejectedTime = new Date().toLocaleString("vi-VN");
  savePending(pendingList); updatePendingBadge(); closeModal();
  showToast(`❌ Đã từ chối báo cáo "${pendingList[idx].name}".`); navigateTo("pending");
}

// ===== VIEW PET DETAIL =====
function viewPet(id, source) {
  const list = source==="pending" ? getPending() : getApproved();
  const pet = list.find(p=>String(p.id)===String(id));
  if(!pet) return;
  const condLabel = {urgent:"🔴 Khẩn cấp", watch:"🟡 Theo dõi", safe:"🟢 An toàn"};
  document.getElementById("modalContent").innerHTML = `
    <div class="modal-pet-header">
      <div class="modal-pet-emoji" style="background:${pet.bgColor}">${pet.emoji}</div>
      <div>
        <div class="modal-pet-name">${pet.name}</div>
        <span class="sbadge sbadge-${pet.condition}">${condLabel[pet.condition]||pet.condition}</span>
        <span class="sbadge sbadge-${pet.status==="pending"?"pending":pet.status==="approved"?"approved":"rejected"}" style="margin-left:0.5rem">
          ${pet.status==="pending"?"⏳ Chờ":pet.status==="approved"?"✅ Đã duyệt":"❌ Từ chối"}
        </span>
      </div>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><div class="modal-info-label">Loài</div><div class="modal-info-val">${pet.type==="cat"?"🐱 Mèo":"🐶 Chó"}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Giới tính</div><div class="modal-info-val">${pet.gender}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Tuổi</div><div class="modal-info-val">${pet.age}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Vaccine</div><div class="modal-info-val">${pet.vaccinated?"✅":"❌"}</div></div>
      <div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Địa điểm</div><div class="modal-info-val">${pet.location}</div></div>
      ${pet.reporter?`<div class="modal-info-item"><div class="modal-info-label">Người báo</div><div class="modal-info-val">${pet.reporter}</div></div>`:""}
      ${pet.phone?`<div class="modal-info-item"><div class="modal-info-label">SĐT</div><div class="modal-info-val">${pet.phone}</div></div>`:""}
      ${pet.rejectReason?`<div class="modal-info-item" style="grid-column:1/-1;border-left:3px solid var(--red)"><div class="modal-info-label">Lý do từ chối</div><div class="modal-info-val" style="color:var(--red)">${pet.rejectReason}</div></div>`:""}
    </div>
    <p class="modal-desc">${pet.desc}</p>
    ${pet.photo ? `
    <div style="margin-bottom:1.25rem">
      <div style="font-size:0.75rem;font-weight:700;color:var(--mid-gray);margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.05em">📷 Ảnh báo cáo</div>
      <img src="${pet.photo}" alt="Ảnh báo cáo" style="width:100%;max-height:320px;object-fit:cover;border-radius:var(--radius-sm);border:1px solid var(--light-gray);display:block;"/>
    </div>` : ""}
    <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1.25rem">${(pet.tags||[]).map(t=>`<span class="tag-chip">${t}</span>`).join("")}</div>
    ${pet.status==="pending"?`<div class="modal-actions">
      <button class="btn-approve" onclick="approvePet('${pet.id}')">✅ Duyệt ngay</button>
      <button class="btn-reject" onclick="closeModal();openRejectModal('${pet.id}')">❌ Từ chối</button>
      <button class="btn-view" onclick="closeModal()">Đóng</button>
    </div>`:`<button class="btn-view" onclick="closeModal()">Đóng</button>`}`;
  openModal();
}

// ===== APPROVED =====
function renderApproved() {
  approvedList = getApproved();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">✅ Thú cưng đã duyệt (${approvedList.length})</span>
        <input class="search-input" placeholder="🔍 Tìm kiếm..." oninput="searchApproved(this.value)"/>
      </div>
      <div id="approvedTableWrap">${renderApprovedTable(approvedList)}</div>
    </div>`;
}

function searchApproved(val) {
  const filtered = getApproved().filter(p=>p.name.toLowerCase().includes(val.toLowerCase())||(p.location||"").toLowerCase().includes(val.toLowerCase()));
  document.getElementById("approvedTableWrap").innerHTML = renderApprovedTable(filtered);
}

function renderApprovedTable(items) {
  if(!items.length) return `<div class="empty-state"><div class="empty-state-icon">📭</div><h3>Chưa có thú cưng nào</h3></div>`;
  return `<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Thú cưng</th><th>Địa điểm</th><th>Tình trạng</th><th>Thời gian duyệt</th><th>Hành động</th></tr></thead><tbody>
    ${items.map(pet=>`<tr>
      <td><div class="pet-cell"><div class="pet-emoji-sm" style="background:${pet.bgColor||"#FFF0E8"}">${pet.emoji}</div><div><div class="pet-cell-name">${pet.name}</div><div class="pet-cell-sub">${pet.type==="cat"?"🐱":"🐶"} · ${pet.age} · ${pet.gender}</div></div></div></td>
      <td style="font-size:0.82rem">${pet.location}</td>
      <td><span class="sbadge sbadge-${pet.condition}">${pet.condition==="urgent"?"🔴 Khẩn cấp":pet.condition==="watch"?"🟡 Theo dõi":"🟢 An toàn"}</span></td>
      <td style="font-size:0.78rem;color:var(--mid-gray)">${pet.approvedTime||"—"}</td>
      <td><div class="action-btns">
        <button class="btn-view" onclick="viewPet('${pet.id}','approved')">👁</button>
        <button class="btn-delete" onclick="removePet(${pet.id})" title="Xóa">🗑</button>
      </div></td>
    </tr>`).join("")}
  </tbody></table></div>`;
}

function removePet(id) {
  if(!confirm("Gỡ thú cưng này khỏi trang nhận nuôi?")) return;
  saveApproved(getApproved().filter(p=>p.id!==id));
  showToast("🗑 Đã gỡ!"); renderApproved();
}

// ===== REJECTED =====
function renderRejected() {
  const rejected = getPending().filter(p=>p.status==="rejected");
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header"><span class="table-title">❌ Đã từ chối (${rejected.length})</span></div>
      ${rejected.length===0?`<div class="empty-state"><div class="empty-state-icon">📋</div><h3>Chưa có</h3></div>`:
      `<div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Thú cưng</th><th>Người báo</th><th>Lý do</th><th>Thời gian</th><th></th></tr></thead><tbody>
        ${rejected.map(pet=>`<tr>
          <td><div class="pet-cell"><div class="pet-emoji-sm" style="background:${pet.bgColor}">${pet.emoji}</div><div><div class="pet-cell-name">${pet.name}</div><div class="pet-cell-sub">${pet.location}</div></div></div></td>
          <td>${pet.reporter}<br/><span style="font-size:0.72rem;color:var(--mid-gray)">${pet.phone}</span></td>
          <td style="font-size:0.82rem;color:var(--red);max-width:200px">${pet.rejectReason||"—"}</td>
          <td style="font-size:0.78rem;color:var(--mid-gray)">${pet.rejectedTime||"—"}</td>
          <td><button class="btn-approve" style="font-size:0.72rem" onclick="reApprove('${pet.id}')">↩ Duyệt lại</button></td>
        </tr>`).join("")}
      </tbody></table></div>`}
    </div>`;
}

function reApprove(id) {
  pendingList = getPending(); approvedList = getApproved();
  const idx = pendingList.findIndex(p=>p.id===id);
  if(idx===-1) return;
  const pet = {...pendingList[idx], status:"approved", approvedTime:new Date().toLocaleString("vi-VN"), id:Date.now()};
  delete pet.rejectReason; delete pet.rejectedTime;
  pendingList[idx].status = "approved";
  approvedList.push(pet);
  savePending(pendingList); saveApproved(approvedList); updatePendingBadge();
  showToast(`✅ Đã duyệt lại "${pet.name}"!`); navigateTo("rejected");
}

// ===== ADD / EDIT PET =====
function renderAddForm(prefill={}) {
  currentTags = prefill.tags||[]; selectedEmoji = prefill.emoji||"🐱"; editingId = prefill.id||null;
  const emojis = ["🐱","😺","😸","🐈","🐈‍⬛","🐶","🐕","🐩","🦮","🐕‍🦺"];
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card">
      <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">${editingId?"✏️ Chỉnh sửa":"➕ Thêm thú cưng mới"}</h2>
      <form id="addPetForm">
        <div class="form-grid">
          <div class="fgroup"><label>Tên *</label><input type="text" id="petName" value="${prefill.name||""}" required/></div>
          <div class="fgroup"><label>Loài *</label><select id="petType"><option value="cat" ${prefill.type==="cat"?"selected":""}>🐱 Mèo</option><option value="dog" ${prefill.type==="dog"?"selected":""}>🐶 Chó</option></select></div>
          <div class="fgroup"><label>Giới tính</label><select id="petGender"><option ${prefill.gender==="Cái"?"selected":""}>Cái</option><option ${prefill.gender==="Đực"?"selected":""}>Đực</option><option ${prefill.gender==="Không rõ"?"selected":""}>Không rõ</option></select></div>
          <div class="fgroup"><label>Tuổi</label><input type="text" id="petAge" placeholder="~2 tháng" value="${prefill.age||""}"/></div>
          <div class="fgroup form-full"><label>Địa điểm *</label><input type="text" id="petLocation" value="${prefill.location||""}" required/></div>
          <div class="fgroup"><label>Mức độ *</label><select id="petCondition"><option value="safe" ${prefill.condition==="safe"?"selected":""}>🟢 An toàn</option><option value="watch" ${prefill.condition==="watch"?"selected":""}>🟡 Theo dõi</option><option value="urgent" ${prefill.condition==="urgent"?"selected":""}>🔴 Khẩn cấp</option></select></div>
          <div class="fgroup"><label>Màu nền</label><input type="color" id="petBgColor" value="${prefill.bgColorHex||"#FFF0E8"}" style="height:42px;cursor:pointer"/></div>
          <div class="fgroup"><label>Vaccine</label><select id="petVaccine"><option value="false" ${!prefill.vaccinated?"selected":""}>❌ Chưa</option><option value="true" ${prefill.vaccinated?"selected":""}>✅ Đã</option></select></div>
          <div class="fgroup"><label>Triệt sản</label><select id="petNeutered"><option value="false" ${!prefill.neutered?"selected":""}>❌ Chưa</option><option value="true" ${prefill.neutered?"selected":""}>✅ Đã</option></select></div>
          <div class="fgroup form-full"><label>Emoji</label><div class="emoji-picker" id="emojiPicker">${emojis.map(e=>`<button type="button" class="emoji-opt ${e===selectedEmoji?"selected":""}" onclick="selectEmoji('${e}')">${e}</button>`).join("")}</div></div>
          <div class="fgroup form-full"><label>Mô tả *</label><textarea id="petDesc" rows="4" required>${prefill.desc||""}</textarea></div>
          <div class="fgroup form-full"><label>Tags</label>
            <div class="tag-input-wrap"><input type="text" id="tagInput" placeholder="Nhập tag rồi bấm Thêm"/><button type="button" class="btn-submit" style="padding:0.5rem 1rem;font-size:0.82rem" onclick="addTag()">+ Thêm</button></div>
            <div class="tags-preview" id="tagsPreview">${currentTags.map((t,i)=>tagChip(t,i)).join("")}</div>
          </div>
          <div class="fgroup"><label>Chi phí</label><input type="text" id="petCosts" value="${prefill.costs||"0 VNĐ"}"/></div>
          <div class="fgroup"><label>Số ngày nuôi tạm</label><input type="number" id="petFosterDays" value="${prefill.fosterDays||0}" min="0"/></div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">${editingId?"💾 Lưu":"✅ Thêm & Duyệt"}</button>
          <button type="button" class="btn-reset" onclick="resetAddForm()">🔄 Reset</button>
          <button type="button" class="btn-view" onclick="navigateTo('approved')">← Quay lại</button>
        </div>
      </form>
    </div>`;
  document.getElementById("tagInput").addEventListener("keydown", e=>{ if(e.key==="Enter"){e.preventDefault();addTag();} });
  document.getElementById("addPetForm").addEventListener("submit", e=>{ e.preventDefault(); submitAddPet(); });
}

function selectEmoji(e) { selectedEmoji=e; document.querySelectorAll(".emoji-opt").forEach(el=>el.classList.toggle("selected",el.textContent===e)); }
function tagChip(tag,idx) { return `<span class="tag-chip">${tag}<button type="button" onclick="removeTag(${idx})">✕</button></span>`; }
function addTag() { const v=document.getElementById("tagInput").value.trim(); if(!v||currentTags.includes(v))return; currentTags.push(v); document.getElementById("tagInput").value=""; document.getElementById("tagsPreview").innerHTML=currentTags.map((t,i)=>tagChip(t,i)).join(""); }
function removeTag(idx) { currentTags.splice(idx,1); document.getElementById("tagsPreview").innerHTML=currentTags.map((t,i)=>tagChip(t,i)).join(""); }
function resetAddForm() { document.getElementById("addPetForm").reset(); currentTags=[]; selectedEmoji="🐱"; editingId=null; document.querySelectorAll(".emoji-opt").forEach((el,i)=>el.classList.toggle("selected",i===0)); document.getElementById("tagsPreview").innerHTML=""; }

function submitAddPet() {
  const name=document.getElementById("petName").value.trim();
  const type=document.getElementById("petType").value;
  const gender=document.getElementById("petGender").value;
  const age=document.getElementById("petAge").value.trim()||"Không rõ";
  const location=document.getElementById("petLocation").value.trim();
  const condition=document.getElementById("petCondition").value;
  const desc=document.getElementById("petDesc").value.trim();
  const vaccinated=document.getElementById("petVaccine").value==="true";
  const neutered=document.getElementById("petNeutered").value==="true";
  const bgColorHex=document.getElementById("petBgColor").value;
  const costs=document.getElementById("petCosts").value.trim()||"0 VNĐ";
  const fosterDays=parseInt(document.getElementById("petFosterDays").value)||0;
  approvedList = getApproved();
  if(editingId) {
    const idx=approvedList.findIndex(p=>p.id===editingId);
    if(idx!==-1) approvedList[idx]={...approvedList[idx],name,type,gender,age,location,condition,desc,vaccinated,neutered,bgColor:bgColorHex,bgColorHex,costs,fosterDays,emoji:selectedEmoji,tags:[...currentTags]};
    saveApproved(approvedList); showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    approvedList.push({id:Date.now(),name,type,gender,age,location,condition,desc,vaccinated,neutered,emoji:selectedEmoji,bgColor:bgColorHex,bgColorHex,tags:[...currentTags],costs,fosterDays,status:"approved",approvedTime:new Date().toLocaleString("vi-VN"),reporter:"Admin"});
    saveApproved(approvedList); showToast(`✅ Đã thêm "${name}"!`);
  }
  editingId=null; navigateTo("approved");
}

// ===== FIX #2: FOSTERS — chỉnh sửa + xóa =====
function renderFosters() {
  const fosters = getFosters();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🏠 Người nuôi tạm (${fosters.length})</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="openAddFosterModal()">+ Thêm mới</button>
      </div>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Tên</th><th>Khu vực</th><th>Loại nuôi</th><th>Sức chứa</th><th>Đánh giá</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
        <tbody>
          ${fosters.map(f=>`<tr>
            <td><div class="pet-cell"><div style="font-size:1.5rem">${f.avatar}</div><div><div class="pet-cell-name">${f.name}</div><div class="pet-cell-sub">${f.phone}</div></div></div></td>
            <td>${f.area}</td><td>${f.type}</td>
            <td><div style="display:flex;align-items:center;gap:0.5rem">
              <div style="display:flex;gap:2px">${Array.from({length:f.max}).map((_,i)=>`<div style="width:14px;height:14px;border-radius:50%;background:${i<f.current?"var(--terracotta)":"var(--light-gray)"}"></div>`).join("")}</div>
              <span style="font-size:0.78rem;color:var(--mid-gray)">${f.current}/${f.max}</span>
              ${f.current<f.max?'<span class="sbadge sbadge-approved" style="font-size:0.65rem">Còn chỗ</span>':'<span class="sbadge sbadge-rejected" style="font-size:0.65rem">Đầy</span>'}
            </div></td>
            <td><span style="font-family:var(--font-mono);font-size:0.82rem;color:var(--gold)">⭐ ${f.rating}/5</span></td>
            <td><span class="sbadge ${f.status==="active"?"sbadge-approved":"sbadge-rejected"}">${f.status==="active"?"✅ Hoạt động":"⏸ Ngưng"}</span></td>
            <td><div class="action-btns">
              <button class="btn-edit" onclick="openEditFosterModal(${f.id})">✏️ Sửa</button>
              <button class="btn-delete" onclick="deleteFoster(${f.id})">🗑</button>
            </div></td>
          </tr>`).join("")}
        </tbody>
      </table></div>
    </div>`;
}

function openAddFosterModal() {
  editingFosterId = null;
  document.getElementById("modalContent").innerHTML = fosterForm({});
  openModal();
  document.getElementById("fosterModalForm").addEventListener("submit", e=>{ e.preventDefault(); saveFosterForm(); });
}

function openEditFosterModal(id) {
  editingFosterId = Number(id);
  const f = getFosters().find(x=> Number(x.id) === Number(id));
  if(!f) return;
  document.getElementById("modalContent").innerHTML = fosterForm(f);
  openModal();
  document.getElementById("fosterModalForm").addEventListener("submit", e=>{ e.preventDefault(); saveFosterForm(); });
}

function fosterForm(f) {
  return `<h3 style="font-family:var(--font-display);margin-bottom:1.25rem">${editingFosterId?"✏️ Sửa Foster":"➕ Thêm Foster"}</h3>
  <form id="fosterModalForm">
    <div class="modal-info-grid">
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Họ tên *</label><input type="text" id="fName" value="${f.name||""}" required style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">SĐT</label><input type="tel" id="fPhone" value="${f.phone||""}" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Khu vực</label><input type="text" id="fArea" value="${f.area||""}" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Loại nuôi</label><select id="fType" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body)"><option ${f.type==="Mèo"?"selected":""}>Mèo</option><option ${f.type==="Chó"?"selected":""}>Chó</option><option ${f.type==="Chó + Mèo"?"selected":""}>Chó + Mèo</option></select></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Sức chứa tối đa</label><input type="number" id="fMax" value="${f.max||1}" min="1" max="10" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Đánh giá (1-5)</label><input type="number" id="fRating" value="${f.rating||5}" min="1" max="5" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0;grid-column:1/-1"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Trạng thái</label><select id="fStatus" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body)"><option value="active" ${f.status==="active"?"selected":""}>✅ Hoạt động</option><option value="inactive" ${f.status==="inactive"?"selected":""}>⏸ Tạm ngưng</option></select></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button type="submit" class="btn-approve" style="flex:1;padding:0.75rem">${editingFosterId?"💾 Lưu":"➕ Thêm"}</button>
      <button type="button" class="btn-view" style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  </form>`;
}

function saveFosterForm() {
  const fosters = getFosters();
  const data = {
    name: document.getElementById("fName").value.trim(),
    phone: document.getElementById("fPhone").value.trim(),
    area: document.getElementById("fArea").value.trim(),
    type: document.getElementById("fType").value,
    max: parseInt(document.getElementById("fMax").value)||1,
    rating: parseInt(document.getElementById("fRating").value)||5,
    status: document.getElementById("fStatus").value,
  };
  if(!data.name){ showToast("⚠️ Vui lòng nhập họ tên!"); return; }
  if(editingFosterId) {
    const idx = fosters.findIndex(f=> Number(f.id) === Number(editingFosterId));
    if(idx!==-1) fosters[idx] = {...fosters[idx], ...data};
    showToast("✏️ Đã cập nhật foster!");
  } else {
    fosters.push({id:Date.now(), avatar:"🐾", current:0, joined:new Date().toLocaleDateString("vi-VN"), ...data});
    showToast("✅ Đã thêm foster mới!");
  }
  saveFosters(fosters); closeModal(); renderFosters();
}

function deleteFoster(id) {
  if(!confirm("Xóa foster này?")) return;
  saveFosters(getFosters().filter(f=> Number(f.id) !== Number(id)));
  showToast("🗑 Đã xóa foster!"); renderFosters();
}

// ===== FIX #2: VOLUNTEERS — chỉnh sửa + xóa =====
function renderVolunteers() {
  const volunteers = getVolunteers();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🙋 Tình nguyện viên (${volunteers.length})</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="openAddVolunteerModal()">+ Thêm mới</button>
      </div>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Tên</th><th>Vai trò</th><th>Khu vực</th><th>Nhiệm vụ</th><th>Trạng thái</th><th>Tham gia</th><th>Hành động</th></table></thead>
        <tbody>
          ${volunteers.map(v=>`<tr>
            <td><div class="pet-cell-name">${v.name}</div><div class="pet-cell-sub">${v.phone}</div></td>
            <td><span class="sbadge" style="background:#E8F0FF;color:var(--blue)">${v.role}</span></td>
            <td style="font-size:0.82rem">${v.area}</td>
            <td><span style="font-family:var(--font-mono);font-weight:700">${v.missions}</span></td>
            <td><span class="sbadge ${v.status==="active"?"sbadge-approved":"sbadge-rejected"}">${v.status==="active"?"✅ Hoạt động":"⏸ Ngưng"}</span></td>
            <td style="font-size:0.78rem;color:var(--mid-gray)">${v.joined}</td>
            <td><div class="action-btns">
              <button class="btn-edit" onclick="openEditVolunteerModal(${v.id})">✏️ Sửa</button>
              <button class="btn-delete" onclick="deleteVolunteer(${v.id})">🗑</button>
            </div></td>
          </tr>`).join("")}
        </tbody>
      </table></div>
    </div>`;
}

function openAddVolunteerModal() {
  editingVolunteerId = null;
  document.getElementById("modalContent").innerHTML = volunteerForm({});
  openModal();
  document.getElementById("volunteerModalForm").addEventListener("submit", e=>{ e.preventDefault(); saveVolunteerForm(); });
}

function openEditVolunteerModal(id) {
  editingVolunteerId = Number(id);
  const v = getVolunteers().find(x=> Number(x.id) === Number(id));
  if(!v) return;
  document.getElementById("modalContent").innerHTML = volunteerForm(v);
  openModal();
  document.getElementById("volunteerModalForm").addEventListener("submit", e=>{ e.preventDefault(); saveVolunteerForm(); });
}

function volunteerForm(v) {
  const roles = ["Rescuer","Foster Parent","Coordinator","Pet Photographer","Vet Support"];
  return `<h3 style="font-family:var(--font-display);margin-bottom:1.25rem">${editingVolunteerId?"✏️ Sửa TNV":"➕ Thêm TNV"}</h3>
  <form id="volunteerModalForm">
    <div class="modal-info-grid">
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Họ tên *</label><input type="text" id="vName" value="${v.name||""}" required style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">SĐT</label><input type="tel" id="vPhone" value="${v.phone||""}" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Vai trò</label><select id="vRole" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body)">${roles.map(r=>`<option ${v.role===r?"selected":""}>${r}</option>`).join("")}</select></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Khu vực</label><input type="text" id="vArea" value="${v.area||""}" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Số nhiệm vụ</label><input type="number" id="vMissions" value="${v.missions||0}" min="0" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Trạng thái</label><select id="vStatus" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body)"><option value="active" ${v.status==="active"?"selected":""}>✅ Hoạt động</option><option value="inactive" ${v.status==="inactive"?"selected":""}>⏸ Tạm ngưng</option></select></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button type="submit" class="btn-approve" style="flex:1;padding:0.75rem">${editingVolunteerId?"💾 Lưu":"➕ Thêm"}</button>
      <button type="button" class="btn-view" style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  </form>`;
}

function saveVolunteerForm() {
  const volunteers = getVolunteers();
  const data = {
    name: document.getElementById("vName").value.trim(),
    phone: document.getElementById("vPhone").value.trim(),
    role: document.getElementById("vRole").value,
    area: document.getElementById("vArea").value.trim(),
    missions: parseInt(document.getElementById("vMissions").value)||0,
    status: document.getElementById("vStatus").value,
  };
  if(!data.name){ showToast("⚠️ Vui lòng nhập họ tên!"); return; }
  if(editingVolunteerId) {
    const idx = volunteers.findIndex(v=> Number(v.id) === Number(editingVolunteerId));
    if(idx!==-1) volunteers[idx] = {...volunteers[idx], ...data};
    showToast("✏️ Đã cập nhật tình nguyện viên!");
  } else {
    volunteers.push({id:Date.now(), joined:new Date().toLocaleDateString("vi-VN"), ...data});
    showToast("✅ Đã thêm tình nguyện viên!");
  }
  saveVolunteers(volunteers); closeModal(); renderVolunteers();
}

function deleteVolunteer(id) {
  if(!confirm("Xóa tình nguyện viên này?")) return;
  saveVolunteers(getVolunteers().filter(v=> Number(v.id) !== Number(id)));
  showToast("🗑 Đã xóa!"); renderVolunteers();
}

// ===== ORDERS =====
function renderOrders(filterStatus="all") {
  const orders = getOrders();
  const merch = getMerch();
  const statusLabel = {
    pending:          { text:"⏳ Chờ xác nhận",   cls:"sbadge-watch"    },
    awaiting_payment: { text:"💳 Chờ thanh toán",  cls:"sbadge-watch"    },
    confirmed:        { text:"✅ Đã xác nhận",     cls:"sbadge-approved" },
    shipping:         { text:"🚚 Đang giao",        cls:"sbadge-approved" },
    delivered:        { text:"📦 Đã giao",          cls:"sbadge-approved" },
    cancelled:        { text:"❌ Đã hủy",           cls:"sbadge-rejected" },
  };
  const payLabel = { qr:"📱 Chuyển khoản", cod:"💵 COD" };

  let filtered = orders;
  if(filterStatus!=="all") filtered = orders.filter(o=>o.status===filterStatus);
  filtered = [...filtered].sort((a,b)=>new Date(b.time)-new Date(a.time));

  const counts = {
    all: orders.length,
    pending: orders.filter(o=>o.status==="pending"||o.status==="awaiting_payment").length,
    confirmed: orders.filter(o=>o.status==="confirmed").length,
    shipping: orders.filter(o=>o.status==="shipping").length,
    delivered: orders.filter(o=>o.status==="delivered").length,
    cancelled: orders.filter(o=>o.status==="cancelled").length,
  };
  const totalRevenue = orders.filter(o=>o.status!=="cancelled").reduce((s,o)=>s+(o.total||0),0);

  document.getElementById("pageContent").innerHTML = `
    <div class="metrics-row" style="margin-bottom:1.25rem">
      <div class="metric-card"><div class="metric-icon">📦</div><span class="metric-val">${counts.all}</span><div class="metric-label">Tổng đơn</div></div>
      <div class="metric-card" style="border-top-color:var(--yellow)"><div class="metric-icon">⏳</div><span class="metric-val" style="color:var(--yellow)">${counts.pending}</span><div class="metric-label">Chờ xử lý</div></div>
      <div class="metric-card" style="border-top-color:var(--green)"><div class="metric-icon">🚚</div><span class="metric-val" style="color:var(--green)">${counts.shipping}</span><div class="metric-label">Đang giao</div></div>
      <div class="metric-card" style="border-top-color:var(--terracotta)"><div class="metric-icon">💰</div><span class="metric-val" style="color:var(--terracotta);font-size:1rem">${formatPrice(totalRevenue)}</span><div class="metric-label">Doanh thu</div></div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🛒 Danh sách đơn hàng</span>
        <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
          ${[["all","Tất cả"],["pending","Chờ xử lý"],["confirmed","Đã xác nhận"],["shipping","Đang giao"],["delivered","Đã giao"],["cancelled","Đã hủy"]].map(([s,l])=>`
            <button onclick="renderOrders('${s}')" style="padding:0.3rem 0.75rem;font-size:0.75rem;border:none;border-radius:20px;cursor:pointer;font-family:var(--font-body);
              background:${filterStatus===s?"var(--terracotta)":"var(--cream-2)"};color:${filterStatus===s?"#fff":"var(--charcoal)"};">${l}${counts[s]!==undefined?" ("+counts[s]+")":""}</button>
          `).join("")}
        </div>
      </div>

      ${filtered.length===0?`<div class="empty-state"><div class="empty-state-icon">📭</div><h3>Không có đơn hàng nào</h3></div>`:`
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Thanh toán</th><th>Trạng thái</th><th>Thời gian</th><th>Hành động</th><tr></thead>
        <tbody>
          ${filtered.map(o=>{
            const sl = statusLabel[o.status]||{text:o.status,cls:""};
            const itemNames = (o.items||[]).map(ci=>{
              const m = merch.find(m=>Number(m.id)===Number(ci.id));
              return m ? `${m.emoji} ${m.name} ×${ci.qty}` : `#${ci.id} ×${ci.qty}`;
            }).join(", ");
            const t = new Date(o.time);
            const timeStr = t.toLocaleString("vi-VN",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});
            return `<tr>
              <td><span style="font-family:var(--font-mono);font-size:0.78rem;font-weight:700">${o.id}</span></td>
              <td><div style="font-weight:600">${o.name||"—"}</div><div style="font-size:0.72rem;color:var(--mid-gray)">${o.phone||""}</div></td>
              <td style="max-width:180px;font-size:0.78rem">${itemNames||"—"}</td>
              <td><span style="font-family:var(--font-mono);font-weight:700;color:var(--terracotta)">${formatPrice(o.total||0)}</span></td>
              <td style="font-size:0.78rem">${payLabel[o.payMethod]||o.payMethod||"—"}</td>
              <td><span class="sbadge ${sl.cls}">${sl.text}</span></td>
              <td style="font-size:0.75rem;color:var(--mid-gray)">${timeStr}</td>
              <td><div class="action-btns">
                <button class="btn-view" onclick="viewOrder('${o.id}')">👁 Chi tiết</button>
                ${o.status==="pending"||o.status==="awaiting_payment"?`<button class="btn-approve" onclick="updateOrderStatus('${o.id}','confirmed')">✅ Duyệt</button>`:""}
                ${o.status==="confirmed"?`<button class="btn-approve" onclick="updateOrderStatus('${o.id}','shipping')">🚚 Giao hàng</button>`:""}
                ${o.status==="shipping"?`<button class="btn-approve" onclick="updateOrderStatus('${o.id}','delivered')">📦 Đã giao</button>`:""}
                ${o.status!=="delivered"&&o.status!=="cancelled"?`<button class="btn-reject" onclick="updateOrderStatus('${o.id}','cancelled')">❌ Hủy</button>`:""}
              </div></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table></div>`}
    </div>`;
}

function viewOrder(id) {
  const order = getOrders().find(o=>o.id===id);
  if(!order) return;
  const merch = getMerch();
  const statusLabel = { pending:"⏳ Chờ xác nhận", awaiting_payment:"💳 Chờ thanh toán", confirmed:"✅ Đã xác nhận", shipping:"🚚 Đang giao", delivered:"📦 Đã giao", cancelled:"❌ Đã hủy" };
  const itemRows = (order.items||[]).map(ci=>{
    const m = merch.find(m=>Number(m.id)===Number(ci.id));
    if(!m) return "";
    return `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0;border-bottom:1px solid var(--cream-2)">
      <div style="width:40px;height:40px;background:${m.bgColor};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.4rem">${m.emoji}</div>
      <div style="flex:1"><div style="font-weight:600;font-size:0.88rem">${m.name}</div><div style="font-size:0.75rem;color:var(--mid-gray)">×${ci.qty}</div></div>
      <div style="font-weight:700;color:var(--terracotta);font-size:0.88rem">${formatPrice(m.price*ci.qty)}</div>
    </div>`;
  }).join("");

  document.getElementById("modalContent").innerHTML = `
    <h3 style="font-family:var(--font-display);margin-bottom:1rem">📦 Chi tiết đơn ${order.id}</h3>
    <div class="modal-info-grid">
      <div class="modal-info-item"><div class="modal-info-label">Khách hàng</div><div class="modal-info-val">${order.name||"—"}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">SĐT</div><div class="modal-info-val">${order.phone||"—"}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Email</div><div class="modal-info-val">${order.email||"—"}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Thanh toán</div><div class="modal-info-val">${order.payMethod==="qr"?"📱 Chuyển khoản QR":"💵 COD"}</div></div>
      <div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Địa chỉ giao hàng</div><div class="modal-info-val">${order.address||"—"}</div></div>
      ${order.note?`<div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Ghi chú</div><div class="modal-info-val">${order.note}</div></div>`:""}
    </div>
    <div style="margin:1rem 0">${itemRows}</div>
    <div style="border-top:2px solid var(--cream-2);padding-top:0.75rem">
      <div style="display:flex;justify-content:space-between;font-size:0.83rem;color:var(--mid-gray);margin-bottom:0.3rem"><span>Tạm tính</span><span>${formatPrice(order.subtotal||0)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:0.83rem;color:var(--mid-gray);margin-bottom:0.3rem"><span>Phí ship</span><span>${formatPrice(order.shipFee||30000)}</span></div>
      ${order.discountAmt?`<div style="display:flex;justify-content:space-between;font-size:0.83rem;color:var(--green);margin-bottom:0.3rem"><span>Giảm giá</span><span>−${formatPrice(order.discountAmt)}</span></div>`:""}
      <div style="display:flex;justify-content:space-between;font-size:1rem;font-weight:700;margin-top:0.5rem"><span>Tổng cộng</span><span style="color:var(--terracotta)">${formatPrice(order.total||0)}</span></div>
    </div>
    <div style="margin-top:1rem">
      <label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.4rem">Cập nhật trạng thái</label>
      <select id="orderStatusSelect" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);margin-bottom:0.75rem">
        ${["pending","awaiting_payment","confirmed","shipping","delivered","cancelled"].map(s=>`<option value="${s}" ${order.status===s?"selected":""}>${statusLabel[s]}</option>`).join("")}
      </select>
      <button class="btn-submit" style="width:100%;padding:0.75rem" onclick="updateOrderStatus('${order.id}',document.getElementById('orderStatusSelect').value)">Cập nhật đơn hàng</button>
    </div>`;
  openModal();
}

function updateOrderStatus(id, newStatus) {
  const orders = getOrders();
  const idx = orders.findIndex(o=>o.id===id);
  if(idx===-1) return;
  orders[idx].status = newStatus;
  orders[idx].updatedTime = new Date().toLocaleString("vi-VN");
  saveOrders(orders);
  updatePendingBadge();
  closeModal();
  const labels = { confirmed:"✅ Đã xác nhận đơn!", shipping:"🚚 Đơn đang được giao!", delivered:"📦 Đã giao hàng thành công!", cancelled:"❌ Đã hủy đơn hàng." };
  showToast(labels[newStatus]||"✅ Cập nhật thành công!");
  renderOrders();
}

// ===== MERCH =====
function renderMerch() {
  const merch = getMerch();
  const orders = getOrders();
  const typeLabel = {apparel:"👕 Áo quần", accessory:"🎒 Phụ kiện", sticker:"🎨 Sticker", homeware:"🏠 Đồ nhà"};

  // Tính số lượng đã bán cho từng sản phẩm
  const soldMap = {};
  orders.filter(o=>o.status!=="cancelled").forEach(o=>{
    (o.items||[]).forEach(ci=>{ soldMap[Number(ci.id)] = (soldMap[Number(ci.id)]||0) + ci.qty; });
  });

  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🛍️ Quản lý Merch (${merch.length})</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="openAddMerchModal()">+ Thêm sản phẩm</button>
      </div>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>Sản phẩm</th><th>Loại</th><th>Giá</th><th>Tồn kho</th><th>Đã bán</th><th>Badge</th><th>Hành động</th></tr></thead>
        <tbody>
          ${merch.map(m=>{
            const stock = m.stock !== undefined ? m.stock : 99;
            const sold = soldMap[Number(m.id)]||0;
            const stockColor = stock<=0?"var(--red)":stock<=5?"var(--yellow)":"var(--green)";
            return `<tr>
              <td><div class="pet-cell">
                <div class="pet-emoji-sm" style="background:${m.bgColor};font-size:1.5rem">${m.emoji}</div>
                <div><div class="pet-cell-name">${m.name}</div><div class="pet-cell-sub">${m.desc}</div></div>
              </div></td>
              <td><span class="sbadge" style="background:#E8F0FF;color:var(--blue)">${typeLabel[m.type]||m.type}</span></td>
              <td><span style="font-family:var(--font-mono);font-weight:700;color:var(--terracotta)">${formatPrice(m.price)}</span></td>
              <td>
                <div style="display:flex;align-items:center;gap:0.5rem">
                  <span style="font-family:var(--font-mono);font-weight:700;color:${stockColor}">${stock}</span>
                  <div style="display:flex;gap:2px">
                    <button onclick="adjustStock(${m.id},-1)" style="width:22px;height:22px;border:1px solid var(--light-gray);border-radius:4px;background:var(--cream);cursor:pointer;font-size:0.75rem">−</button>
                    <button onclick="adjustStock(${m.id},1)" style="width:22px;height:22px;border:1px solid var(--light-gray);border-radius:4px;background:var(--cream);cursor:pointer;font-size:0.75rem">+</button>
                  </div>
                </div>
              </td>
              <td><span style="font-family:var(--font-mono);font-size:0.82rem">${sold}</span></td>
              <td>${m.badge?`<span class="sbadge sbadge-approved">${m.badge}</span>`:"—"}</td>
              <td><div class="action-btns">
                <button class="btn-edit" onclick="openEditMerchModal(${m.id})">✏️ Sửa</button>
                <button class="btn-delete" onclick="deleteMerch(${m.id})">🗑</button>
              </div></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table></div>
    </div>`;
}

function adjustStock(id, delta) {
  const merch = getMerch();
  const idx = merch.findIndex(m=>Number(m.id)===Number(id));
  if(idx===-1) return;
  const current = merch[idx].stock !== undefined ? merch[idx].stock : 99;
  merch[idx].stock = Math.max(0, current + delta);
  saveMerch(merch);
  renderMerch();
}

function openAddMerchModal() {
  editingMerchId = null;
  document.getElementById("modalContent").innerHTML = merchForm({});
  openModal();
  document.getElementById("merchModalForm").addEventListener("submit", e=>{ e.preventDefault(); saveMerchForm(); });
}

function openEditMerchModal(id) {
  editingMerchId = Number(id);
  const m = getMerch().find(x=> Number(x.id) === Number(id));
  if(!m) return;
  document.getElementById("modalContent").innerHTML = merchForm(m);
  openModal();
  document.getElementById("merchModalForm").addEventListener("submit", e=>{ e.preventDefault(); saveMerchForm(); });
}

function merchForm(m) {
  return `<h3 style="font-family:var(--font-display);margin-bottom:1.25rem">${editingMerchId?"✏️ Sửa sản phẩm":"➕ Thêm sản phẩm"}</h3>
  <form id="merchModalForm">
    <div class="modal-info-grid">
      <div class="modal-info-item" style="background:none;padding:0;grid-column:1/-1"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Tên sản phẩm *</label><input type="text" id="mName" value="${m.name||""}" required style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Loại</label><select id="mType" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body)"><option value="apparel" ${m.type==="apparel"?"selected":""}>👕 Áo quần</option><option value="accessory" ${m.type==="accessory"?"selected":""}>🎒 Phụ kiện</option><option value="sticker" ${m.type==="sticker"?"selected":""}>🎨 Sticker</option><option value="homeware" ${m.type==="homeware"?"selected":""}>🏠 Đồ nhà</option></select></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Giá (VNĐ) *</label><input type="number" id="mPrice" value="${m.price||0}" min="0" required style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Emoji</label><input type="text" id="mEmoji" value="${m.emoji||"🐾"}" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);font-size:1.2rem;outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Badge (tùy chọn)</label><input type="text" id="mBadge" value="${m.badge||""}" placeholder="VD: New, Hot, Sale..." style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
      <div class="modal-info-item" style="background:none;padding:0"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Màu nền</label><input type="color" id="mBgColor" value="${m.bgColor||"#E8F0FF"}" style="width:100%;height:42px;cursor:pointer;border:2px solid var(--light-gray);border-radius:6px"/></div>
      <div class="modal-info-item" style="background:none;padding:0;grid-column:1/-1"><label style="font-size:0.8rem;font-weight:600;display:block;margin-bottom:0.3rem">Mô tả</label><input type="text" id="mDesc" value="${m.desc||""}" style="width:100%;padding:0.6rem;border:2px solid var(--light-gray);border-radius:6px;font-family:var(--font-body);outline:none"/></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button type="submit" class="btn-approve" style="flex:1;padding:0.75rem">${editingMerchId?"💾 Lưu":"➕ Thêm"}</button>
      <button type="button" class="btn-view" style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  </form>`;
}

function saveMerchForm() {
  const merch = getMerch();
  const data = {
    name: document.getElementById("mName").value.trim(),
    type: document.getElementById("mType").value,
    price: parseInt(document.getElementById("mPrice").value)||0,
    emoji: document.getElementById("mEmoji").value.trim()||"🐾",
    badge: document.getElementById("mBadge").value.trim()||null,
    bgColor: document.getElementById("mBgColor").value,
    desc: document.getElementById("mDesc").value.trim(),
  };
  if(!data.name){ showToast("⚠️ Vui lòng nhập tên sản phẩm!"); return; }
  if(editingMerchId) {
    const idx = merch.findIndex(m=> Number(m.id) === Number(editingMerchId));
    if(idx!==-1) merch[idx] = {...merch[idx], ...data};
    showToast("✏️ Đã cập nhật sản phẩm!");
  } else {
    merch.push({id:Date.now(), ...data});
    showToast("✅ Đã thêm sản phẩm mới!");
  }
  saveMerch(merch); closeModal(); renderMerch();
}

function deleteMerch(id) {
  if(!confirm("Xóa sản phẩm này?")) return;
  saveMerch(getMerch().filter(m=> Number(m.id) !== Number(id)));
  showToast("🗑 Đã xóa sản phẩm!"); renderMerch();
}

// ===== MODAL =====
function initModal() {
  document.getElementById("detailModal").addEventListener("click", e=>{ if(e.target===document.getElementById("detailModal")) closeModal(); });
  document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeModal(); });
}
function openModal()  { document.getElementById("detailModal").classList.add("open"); document.body.style.overflow="hidden"; }
function closeModal() { document.getElementById("detailModal").classList.remove("open"); document.body.style.overflow=""; }

// ===== TOAST =====
let toastTimeout;
function showToast(msg) {
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout=setTimeout(()=>t.classList.remove("show"),3500);
}
