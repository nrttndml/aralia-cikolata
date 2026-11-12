import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, PackageOpen, Calculator, 
  ChefHat, CalendarCheck, Settings, Trash2, 
  AlertTriangle, FileSpreadsheet, TrendingUp, Wallet, 
  Instagram, Globe, Users, CheckCircle2, Circle, Star, Lock
} from 'lucide-react';

// --- MOCK INITIAL DATA ---
const initialInventory = [
  { id: 1, name: 'Callebaut Recipe N° 823 (Sütlü)', unit: 'kg', unitPrice: 450, stock: 15, criticalLevel: 20 },
  { id: 2, name: 'Antep Fıstığı Kreması (Ayçiçek Lesitinli)', unit: 'kg', unitPrice: 850, stock: 4, criticalLevel: 10 },
  { id: 3, name: 'Kavrulmuş Kadayıf', unit: 'kg', unitPrice: 280, stock: 3, criticalLevel: 5 },
  { id: 4, name: 'Gold Çikolata (Karamelize)', unit: 'kg', unitPrice: 520, stock: 25, criticalLevel: 10 },
  { id: 5, name: 'Aralia Özel Kadife Kutu', unit: 'adet', unitPrice: 55, stock: 120, criticalLevel: 50 }
];

const initialOrders = [
  { id: 101, customer: 'Melis Yılmaz', product: 'Dubai Stili Sütlü Tablet', quantity: 4, price: 1600, status: 'Bekleyen', source: 'Instagram DM', date: '2026-11-09' },
  { id: 102, customer: 'Ahmet K.', product: 'Gold Çikolata Truff Seti', quantity: 2, price: 900, status: 'Hazırlanıyor', source: 'Web', date: '2026-11-08' },
  { id: 103, customer: 'Zeynep B.', product: 'Sade Sütlü Madlen', quantity: 5, price: 1250, status: 'Teslim Edildi', source: 'Dükkan', date: '2026-11-07' }
];

const initialTasks = [
  { id: 1, title: 'Bugünkü Dubai siparişleri için fıstık kreması hazırlanacak', type: 'Mutfak', assignee: 'Editör (Üretim)', status: 'pending' },
  { id: 2, title: 'Web siparişleri için altın varaklı kutular katlanacak', type: 'Paketleme', assignee: 'Editör (Paketleme)', status: 'done' },
  { id: 3, title: 'Kargo şirketine teslimat yapılacak', type: 'Sevkiyat', assignee: 'Editör (Sevkiyat)', status: 'pending' }
];

const initialAgenda = [
  { id: 1, title: 'Belediye Ruhsat Yenileme Ödemesi', date: '2026-11-15' },
  { id: 2, title: 'KOSGEB Genç Girişimci Evrak Teslimi', date: '2026-11-20' }
];

const initialCmsSettings = {
  logoUrl: '',
  heroImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=1600',
  storyImage: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=800',
  aboutText: 'Aralia Çikolata; kakao çekirdeğinin en doğal halini, butik üretim hassasiyeti ve kadifemsi Belçika dokusuyla buluşturan lüks bir artisanal markadır. Her bir ürünümüz, usta ellerde titizlikle şekillendirilmektedir.',
  address: 'Nişantaşı Mah. Ihlamur Yolu Sok. No: 14/A Şişli / İstanbul',
  email: 'iletisim@araliacikolata.com',
  phone: '+90 (212) 555 01 42'
};

export default function App() {
  const [cmsSettings, setCmsSettings] = useState(initialCmsSettings);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500/30 overflow-x-hidden scroll-smooth">
      {/* 1. Halka Açık Tanıtım Sitesi */}
      <PublicSite cmsSettings={cmsSettings} />

      {/* 2. Entegre Edilmiş Yönetim ve ERP Paneli (Aşağıda) */}
      <div id="erp-management-panel" className="border-t-2 border-amber-500/40 bg-zinc-950 relative">
        <div className="bg-gradient-to-r from-amber-950/40 via-zinc-950 to-amber-950/40 py-8 px-4 text-center border-b border-amber-900/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MinimalistLogo className="w-10 h-10" />
              <div className="text-left">
                <h3 className="text-xl font-serif font-bold text-amber-400">ARALIA ERP YÖNETİM PANELİ</h3>
                <p className="text-xs text-zinc-400">Çok Kullanıcılı Multi-User & Stok / Sipariş Otomasyon Sistemi</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-xl border border-amber-900/50">
              <Lock size={14} className="text-amber-400" />
              <span className="text-xs text-zinc-300">Yetkili Modülü Aktif</span>
            </div>
          </div>
        </div>

        <AdminDashboardBody cmsSettings={cmsSettings} setCmsSettings={setCmsSettings} />
      </div>
    </div>
  );
}

function AdminDashboardBody({ cmsSettings, setCmsSettings }) {
  const [role, setRole] = useState('Admin'); // 'Admin', 'Editor', 'Viewer'
  const [activeTab, setActiveTab] = useState('dashboard');

  const [inventory, setInventory] = useState(initialInventory);
  const [orders, setOrders] = useState(initialOrders);
  const [tasks, setTasks] = useState(initialTasks);
  const [agenda, setAgenda] = useState(initialAgenda);

  const canEdit = role === 'Admin' || role === 'Editor';
  const canDelete = role === 'Admin';
  const canManageUsers = role === 'Admin';

  const handleExport = () => {
    alert(`Veriler Excel formatında 'aralia_cikolata_rapor.xlsx' adıyla dışa aktarılıyor...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
      
      {/* SIDEBAR TABS FOR ERP */}
      <aside className="w-full lg:w-64 bg-zinc-900/40 p-4 rounded-3xl border border-amber-900/30 flex flex-col shrink-0 space-y-4">
        <div className="p-3 bg-zinc-950 rounded-2xl border border-amber-900/20 text-center">
          <label className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 block">RBAC Rol Seçimi</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-zinc-900 border border-amber-900/50 rounded-lg p-2 text-amber-400 text-xs focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="Admin">👑 Admin (Tam Yetki)</option>
            <option value="Editor">👩‍🍳 Editör (Personel)</option>
            <option value="Viewer">👁️ İzleyici (Read-only)</option>
          </select>
        </div>

        <nav className="space-y-1">
          <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" tab="dashboard" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<ShoppingBag size={18}/>} label="Siparişler & CRM" tab="orders" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<PackageOpen size={18}/>} label="Stok & Depo" tab="inventory" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<Calculator size={18}/>} label="Fiyat Simülatörü" tab="pricing" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<ChefHat size={18}/>} label="Reçete & Planlayıcı" tab="planner" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<CheckCircle2 size={18}/>} label="Görevler & Ajanda" tab="tasks" activeTab={activeTab} setActiveTab={setActiveTab} />
          {role === 'Admin' && (
            <NavItem icon={<Settings size={18}/>} label="Site Ayarları (CMS)" tab="cms" activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </nav>
      </aside>

      {/* MAIN ERP CONTENT */}
      <main className="flex-1 bg-zinc-900/20 p-6 md:p-8 rounded-3xl border border-amber-900/20 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white capitalize tracking-wide">
              {activeTab === 'dashboard' ? 'Genel Bakış' : 
               activeTab === 'pricing' ? 'Akıllı Fiyatlandırma' : 
               activeTab === 'cms' ? 'Site & Medya Ayarları (CMS)' :
               activeTab.replace('-', ' ')}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Aktif Rol Yetkisi: <span className="text-amber-400 font-medium">{role}</span></p>
          </div>
          
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-xs px-4 py-2 rounded-full text-white font-medium">
              <Instagram size={14} /> @araliacikolata
            </a>
            <button onClick={handleExport} className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-xs px-4 py-2 rounded-full border border-amber-900/50 text-amber-400">
              <FileSpreadsheet size={14} /> Excel İndir
            </button>
          </div>
        </div>

        <div className="animate-fade-in">
          {activeTab === 'dashboard' && <DashboardView orders={orders} inventory={inventory} />}
          {activeTab === 'orders' && <OrdersView orders={orders} setOrders={setOrders} canEdit={canEdit} canDelete={canDelete} />}
          {activeTab === 'inventory' && <InventoryView inventory={inventory} setInventory={setInventory} canEdit={canEdit} />}
          {activeTab === 'pricing' && <PricingSimulator inventory={inventory} />}
          {activeTab === 'planner' && <RecipesPlanner orders={orders} />}
          {activeTab === 'tasks' && <TasksView tasks={tasks} setTasks={setTasks} agenda={agenda} canEdit={canEdit} canManageUsers={canManageUsers} />}
          {activeTab === 'cms' && role === 'Admin' && <CmsSettingsView cmsSettings={cmsSettings} setCmsSettings={setCmsSettings} />}
        </div>
      </main>
    </div>
  );
}

// --- MINIMALIST & CHIC LOGO COMPONENT ---
function MinimalistLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`${className} relative flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-950 rounded-2xl border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] shrink-0 overflow-hidden group`}>
      <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors"></div>
      <svg viewBox="0 0 40 40" className="w-6 h-6 text-amber-400 transform group-hover:scale-105 transition-transform" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 4C14 12 10 17 10 23C10 28.5 14.5 33 20 33C25.5 33 30 28.5 30 23C30 17 26 12 20 4Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M15 22C15 22 17.5 25 20 25C22.5 25 25 22 25 22" strokeLinecap="round" />
        <circle cx="20" cy="15" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}

function NavItem({ icon, label, tab, activeTab, setActiveTab }) {
  const active = activeTab === tab;
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        active 
        ? 'bg-amber-900/20 border border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.05)]' 
        : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent hover:border-zinc-800'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

// 1. DASHBOARD
function DashboardView({ orders, inventory }) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const pendingOrders = orders.filter(o => o.status === 'Bekleyen').length;
  const criticalItems = inventory.filter(i => i.stock <= i.criticalLevel);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Toplam Ciro (Aylık)" value={`₺${totalRevenue.toLocaleString()}`} icon={<TrendingUp size={24} className="text-amber-400" />} />
        <StatCard title="Kasadaki Nakit" value="₺14,250" icon={<Wallet size={24} className="text-amber-400" />} />
        <StatCard title="Bekleyen Sipariş" value={pendingOrders.toString()} highlight={pendingOrders > 0} icon={<PackageOpen size={24} className="text-amber-400" />} />
        <StatCard title="Stok Uyarıları" value={criticalItems.length.toString()} highlight={criticalItems.length > 0} isAlert icon={<AlertTriangle size={24} className={criticalItems.length > 0 ? "text-red-500 animate-pulse" : "text-amber-400"} />} />
      </div>

      {criticalItems.length > 0 && (
        <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg shadow-red-900/5">
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2 bg-red-950 rounded-full border border-red-900"><AlertTriangle className="text-red-500" size={20} /></div>
            <h3 className="text-lg font-bold text-red-400">Kritik Stok Uyarısı</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {criticalItems.map(item => (
              <span key={item.id} className="bg-red-900/30 border border-red-800/50 text-red-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                {item.name} <strong className="text-white bg-red-950 px-2 py-0.5 rounded-full">{item.stock} {item.unit}</strong>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-amber-900/20 backdrop-blur-sm">
          <h3 className="text-lg font-serif font-bold mb-4 text-amber-400 flex items-center justify-between">
            Son Siparişler
            <span className="text-xs font-sans text-zinc-500 font-normal">Son 5 İşlem</span>
          </h3>
          <div className="space-y-3">
            {orders.slice(0, 5).map(o => (
              <div key={o.id} className="flex justify-between items-center p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50 hover:border-amber-900/30 transition-colors">
                <div>
                  <p className="font-medium text-zinc-200">{o.customer}</p>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                    {o.source === 'Instagram DM' ? <Instagram size={12} className="text-pink-500"/> : <Globe size={12} className="text-blue-500"/>}
                    {o.product} ({o.quantity} Kutu)
                  </p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-amber-900/20 backdrop-blur-sm">
          <h3 className="text-lg font-serif font-bold mb-4 text-amber-400">Müşteri Eğilim CRM (Özet)</h3>
          <div className="space-y-4">
             <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-zinc-300">En Çok Satan Ürün</span>
                 <span className="text-amber-400 font-bold">Dubai Stili Sütlü Tablet</span>
               </div>
               <div className="w-full bg-zinc-900 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{width: '75%'}}></div></div>
             </div>
             <div className="p-4 bg-zinc-950/50 rounded-xl border border-zinc-800/50">
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-zinc-300">Instagram / Web Sipariş Oranı</span>
                 <span className="text-pink-500 font-bold">%65 / %35</span>
               </div>
               <div className="flex h-2 w-full rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-[65%]"></div>
                 <div className="bg-blue-600 w-[35%]"></div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, isAlert, highlight }) {
  return (
    <div className={`bg-zinc-900/50 p-6 rounded-2xl border ${isAlert && highlight ? 'border-red-900/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]' : 'border-amber-900/20'} relative overflow-hidden group`}>
      <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
        {icon}
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-3 rounded-xl ${isAlert && highlight ? 'bg-red-950 border border-red-900' : 'bg-zinc-950 border border-amber-900/30'}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-zinc-400 font-medium mb-1">{title}</p>
          <p className={`text-2xl font-bold font-serif ${isAlert && highlight ? 'text-red-400' : 'text-white'}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    'Bekleyen': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Hazırlanıyor': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Teslim Edildi': 'bg-green-500/10 text-green-400 border-green-500/30'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-zinc-800 text-zinc-400'}`}>
      {status}
    </span>
  );
}

// 2. ORDERS & CRM
function OrdersView({ orders, setOrders, canEdit, canDelete }) {
  const [showForm, setShowForm] = useState(false);
  
  const handleAddOrder = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newOrder = {
      id: Date.now(),
      customer: fd.get('customer'),
      product: fd.get('product'),
      quantity: Number(fd.get('quantity')),
      price: Number(fd.get('price')),
      source: fd.get('source'),
      status: 'Bekleyen',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
    setShowForm(false);
  };

  const deleteOrder = (id) => {
    if(canDelete) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {canEdit && (
        <div className="flex justify-end">
          <button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg shadow-amber-900/20 text-sm font-medium transition-all">
             {showForm ? 'İptal Et' : <><Instagram size={16} /> Instagram DM / Yeni Sipariş Ekle</>}
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleAddOrder} className="bg-zinc-900/80 p-6 rounded-2xl border border-amber-900/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 animate-fade-in backdrop-blur-md">
          <input name="customer" placeholder="Müşteri Adı" required className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none" />
          <select name="product" className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none">
            <option>Dubai Stili Sütlü Tablet</option>
            <option>Gold Çikolata Truff Seti</option>
            <option>Sade Sütlü Madlen</option>
            <option>Antep Fıstıklı Roş</option>
          </select>
          <input name="quantity" type="number" placeholder="Kutu Adet" required className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none" />
          <input name="price" type="number" placeholder="Fiyat (₺)" required className="bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none" />
          
          <select name="source" className="lg:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white outline-none">
            <option value="Instagram DM">Instagram DM</option>
            <option value="Web">Web Sitesi</option>
            <option value="Dükkan">Dükkan / Elden</option>
          </select>

          <div className="lg:col-span-4 flex justify-end gap-3 items-center">
            <button type="submit" className="bg-amber-600 hover:bg-amber-500 px-8 py-3 rounded-xl text-white font-medium transition-colors w-full lg:w-auto shadow-lg shadow-amber-900/20">Kaydet</button>
          </div>
        </form>
      )}

      <div className="bg-zinc-900/50 rounded-2xl border border-amber-900/20 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-amber-900/30 text-amber-400/70 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Müşteri</th>
                <th className="p-4 font-medium">Ürün</th>
                <th className="p-4 font-medium">Kaynak</th>
                <th className="p-4 font-medium">Tutar</th>
                <th className="p-4 font-medium">Durum</th>
                {canDelete && <th className="p-4 text-right font-medium">İşlem</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-4">
                    <p className="font-medium text-zinc-200">{o.customer}</p>
                    <p className="text-[10px] text-zinc-500">{o.date}</p>
                  </td>
                  <td className="p-4 text-sm text-zinc-300">{o.quantity}x {o.product}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
                      {o.source === 'Instagram DM' ? <Instagram size={14} className="text-pink-500"/> : o.source === 'Web' ? <Globe size={14} className="text-blue-500"/> : <ShoppingBag size={14} className="text-amber-400"/>}
                      {o.source}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white font-medium">₺{o.price}</td>
                  <td className="p-4"><StatusBadge status={o.status} /></td>
                  {canDelete && (
                    <td className="p-4 text-right">
                      <button onClick={() => deleteOrder(o.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-950/30 opacity-0 group-hover:opacity-100">
                        <Trash2 size={16}/>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && <div className="p-8 text-center text-zinc-500">Sipariş bulunmamaktadır.</div>}
      </div>
    </div>
  );
}

// 3. INVENTORY & SMART ALERTS
function InventoryView({ inventory, setInventory, canEdit }) {
  const updateStock = (id, change) => {
    if(!canEdit) return;
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock + change) } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {inventory.map(item => {
          const isCritical = item.stock <= item.criticalLevel;
          return (
            <div key={item.id} className={`bg-zinc-900/80 p-6 rounded-2xl border ${isCritical ? 'border-red-900/50 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'border-amber-900/20'} relative overflow-hidden group backdrop-blur-sm transition-all`}>
              {isCritical && (
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-900/20 rounded-full blur-xl animate-pulse"></div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-serif font-bold text-zinc-100 max-w-[80%] leading-tight">{item.name}</h3>
                {isCritical && <AlertTriangle className="text-red-500 animate-pulse shrink-0" size={20} />}
              </div>
              
              <div className="text-xs text-zinc-500 mb-6 flex justify-between pb-4 border-b border-zinc-800/50">
                <span>Birim: ₺{item.unitPrice} / {item.unit}</span>
                <span className="text-amber-400/50">Kritik: {item.criticalLevel}</span>
              </div>
              
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Mevcut Stok</p>
                  <p className={`text-4xl font-bold font-serif ${isCritical ? 'text-red-400' : 'text-amber-400'}`}>
                    {item.stock} <span className="text-sm font-sans font-normal text-zinc-500 ml-1">{item.unit}</span>
                  </p>
                </div>
                
                {canEdit && (
                  <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
                    <button onClick={()=>updateStock(item.id, -1)} className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-lg hover:bg-red-950 hover:text-red-400 transition-colors text-xl font-light">-</button>
                    <button onClick={()=>updateStock(item.id, 1)} className="w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-lg hover:bg-green-950 hover:text-green-400 transition-colors text-xl font-light">+</button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// 4. SMART PRICING & COST SIMULATOR
function PricingSimulator({ inventory }) {
  const [sliderVal, setSliderVal] = useState(0);
  const laborCost = 100;
  
  const choc = inventory.find(i => i.name.includes('823')) || { unitPrice: 450 };
  const filling = inventory.find(i => i.name.includes('Fıstığı')) || { unitPrice: 850 };
  
  const baseRawCost = (choc.unitPrice * 0.2) + (filling.unitPrice * 0.1);
  const simulatedRawCost = baseRawCost * (1 + (sliderVal / 100));
  
  const wasteCost = simulatedRawCost * 0.05;
  const hiddenCost = simulatedRawCost * 0.03;
  const totalCost = simulatedRawCost + wasteCost + laborCost + hiddenCost;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-zinc-900/80 p-8 rounded-3xl border border-amber-900/30 backdrop-blur-md shadow-2xl shadow-black/50">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h2 className="text-xl font-serif font-bold text-amber-400 mb-2">Hammadde Zam Simülatörü</h2>
            <p className="text-sm text-zinc-400">Olası fiyat artışlarının Aralia Dubai Stili Tablet (300g) maliyetine etkisini test edin.</p>
          </div>
          <div className="bg-zinc-950 px-6 py-3 rounded-2xl border border-amber-900/50 flex items-center gap-4">
            <span className="text-sm text-zinc-500 uppercase tracking-wider">Zam Oranı</span>
            <span className="text-3xl font-bold text-amber-400 font-serif">%{sliderVal}</span>
          </div>
        </div>
        
        <input 
          type="range" min="0" max="50" step="1" 
          value={sliderVal} 
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full h-3 bg-zinc-950 rounded-full appearance-none cursor-pointer mb-12 border border-zinc-800 accent-amber-500 hover:accent-amber-400 transition-all"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 border-b border-zinc-800 pb-2">Maliyet Analizi (Formül)</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-zinc-950/50 p-3 rounded-xl border border-zinc-800/50">
                <span className="text-zinc-300">Ana Hammadde (Simüle Edilmiş)</span> 
                <span className="font-medium text-white">₺{simulatedRawCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center bg-red-950/10 p-3 rounded-xl border border-red-900/20">
                <span className="text-red-400/80">Fire Maliyeti (%5)</span> 
                <span className="font-medium text-red-400">+ ₺{wasteCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center bg-amber-950/10 p-3 rounded-xl border border-amber-900/20">
                <span className="text-amber-400/80">İşçilik & Ambalaj (Sabit)</span> 
                <span className="font-medium text-amber-400">+ ₺{laborCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-950/10 p-3 rounded-xl border border-blue-900/20">
                <span className="text-blue-400/80">Görünmeyen Gider (%3)</span> 
                <span className="font-medium text-blue-400">+ ₺{hiddenCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-zinc-950 p-6 rounded-2xl border border-amber-500/30 flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -top-10 -right-10"></div>
             <p className="text-sm text-amber-200/50 uppercase tracking-[0.2em] mb-2 relative z-10">Toplam Birim Maliyet</p>
             <p className="text-5xl font-serif font-bold text-amber-400 relative z-10">₺{totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[30, 40, 45, 50].map(margin => {
          const targetPrice = totalCost / (1 - (margin/100));
          return (
            <div key={margin} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 text-center hover:border-amber-500/50 transition-colors group backdrop-blur-sm">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2 group-hover:text-amber-400/70 transition-colors">% {margin} Kâr Marjı</p>
              <p className="text-2xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">₺{targetPrice.toFixed(0)}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// 5. RECIPES & PRODUCTION PLANNER
function RecipesPlanner({ orders }) {
  const pendingOrders = orders.filter(o => o.status === 'Bekleyen');
  
  let totalChoc = 0;
  let totalCream = 0;
  let totalKadayif = 0;

  pendingOrders.forEach(o => {
    if(o.product.includes('Dubai') || o.product.includes('Tablet')) {
      totalChoc += (o.quantity * 180);
      totalCream += (o.quantity * 90);
      totalKadayif += (o.quantity * 30);
    } else {
      totalChoc += (o.quantity * 200);
    }
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-zinc-900/80 p-8 rounded-3xl border border-amber-900/30 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-serif font-bold text-amber-400 mb-2">Aralia Üretim Planlayıcısı</h2>
          <p className="text-zinc-400 text-sm">Bekleyen {pendingOrders.length} sipariş için mutfak hazırlık rotası hesaplandı.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-center shadow-inner">
             <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Standart Reçete (Dubai)</p>
             <p className="font-bold text-amber-400 text-sm">%60 Çikolata | %40 İç Dolgu</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800/80 text-center relative overflow-hidden backdrop-blur-sm group hover:border-amber-900/50 transition-colors">
          <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3 font-bold">Eritilecek Çikolata</p>
          <p className="text-5xl font-serif font-bold text-white mb-2">{(totalChoc / 1000).toFixed(2)}</p>
          <p className="text-sm text-amber-400/70 font-medium">KG</p>
        </div>
        
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800/80 text-center relative overflow-hidden backdrop-blur-sm group hover:border-green-900/50 transition-colors">
          <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3 font-bold">Fıstık Kreması</p>
          <p className="text-5xl font-serif font-bold text-white mb-2">{(totalCream / 1000).toFixed(2)}</p>
          <p className="text-sm text-green-500/70 font-medium">KG</p>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800/80 text-center relative overflow-hidden backdrop-blur-sm group hover:border-orange-900/50 transition-colors">
          <p className="text-zinc-500 uppercase tracking-widest text-xs mb-3 font-bold">Kavrulmuş Kadayıf</p>
          <p className="text-5xl font-serif font-bold text-white mb-2">{(totalKadayif / 1000).toFixed(2)}</p>
          <p className="text-sm text-orange-500/70 font-medium">KG</p>
        </div>
      </div>
    </div>
  );
}

// 6. TASKS & CALENDAR
function TasksView({ tasks, setTasks, agenda, canEdit, canManageUsers }) {
  const toggleTask = (id) => {
    if(!canEdit) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'pending' ? 'done' : 'pending' } : t));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
            <Users size={20} /> Personel Görev Panosu
          </h2>
          {canManageUsers && (
            <button className="text-xs bg-zinc-900 border border-amber-900/50 text-amber-400 px-3 py-1.5 rounded-full hover:bg-amber-900/20 transition-colors">
              + Yeni Görev Ata
            </button>
          )}
        </div>

        <div className="bg-zinc-900/50 border border-amber-900/20 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="divide-y divide-zinc-800/50">
            {tasks.map(task => (
              <div key={task.id} className={`p-5 flex items-start gap-4 transition-colors ${task.status === 'done' ? 'bg-zinc-950/50 opacity-60' : 'hover:bg-zinc-800/30'}`}>
                <button onClick={() => toggleTask(task.id)} disabled={!canEdit} className="mt-1 shrink-0">
                  {task.status === 'done' ? <CheckCircle2 className="text-amber-400" size={24} /> : <Circle className="text-zinc-600 hover:text-amber-400 transition-colors" size={24} />}
                </button>
                <div className="flex-1">
                  <p className={`text-sm md:text-base font-medium ${task.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] uppercase tracking-wider bg-zinc-950 text-amber-400 border border-amber-900/30 px-2 py-0.5 rounded-full">
                      {task.type}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Users size={12} /> {task.assignee}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-serif font-bold text-amber-400 flex items-center gap-2">
          <CalendarCheck size={20} /> Resmi Ajanda
        </h2>
        
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-sm space-y-4">
          <p className="text-xs text-zinc-500 mb-4">KOSGEB & Belediye İşlemleri</p>
          
          {agenda.map(item => (
            <div key={item.id} className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group hover:border-amber-900/30 transition-colors">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-amber-500 transition-colors"></div>
              <h4 className="text-sm font-medium text-zinc-300 ml-2">{item.title}</h4>
              <div className="flex items-center gap-2 text-xs text-zinc-500 ml-2">
                <CalendarCheck size={12} className="text-amber-400/50" />
                <span>Son Tarih: {item.date}</span>
              </div>
            </div>
          ))}
          
          {canManageUsers && (
            <button className="w-full mt-4 py-3 border border-dashed border-zinc-700 text-zinc-500 text-sm rounded-2xl hover:border-amber-500 hover:text-amber-400 transition-colors">
              Takvime Ekle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 7. CMS SETTINGS VIEW
function CmsSettingsView({ cmsSettings, setCmsSettings }) {
  const [formState, setFormState] = useState(cmsSettings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCmsSettings(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto bg-zinc-900/80 p-8 rounded-3xl border border-amber-900/30 backdrop-blur-md">
      <h2 className="text-xl font-serif font-bold text-amber-400 mb-6">Halka Açık Site ve Medya Ayarları</h2>
      
      {saved && (
        <div className="mb-6 p-4 bg-green-950/30 border border-green-800/50 text-green-400 rounded-2xl text-sm flex items-center gap-2">
          <CheckCircle2 size={18} /> Ayarlar başarıyla güncellendi! Site üzerindeki değişiklikler anında yansıtıldı.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Hero Arka Plan Resim URL</label>
          <input 
            type="url" 
            value={formState.heroImage} 
            onChange={(e) => setFormState({...formState, heroImage: e.target.value})}
            required 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Hikayemiz Bölüm Resim URL</label>
          <input 
            type="url" 
            value={formState.storyImage} 
            onChange={(e) => setFormState({...formState, storyImage: e.target.value})}
            required 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Hikayemiz Metni</label>
          <textarea 
            rows={4}
            value={formState.aboutText} 
            onChange={(e) => setFormState({...formState, aboutText: e.target.value})}
            required 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Adres</label>
            <input 
              type="text" 
              value={formState.address} 
              onChange={(e) => setFormState({...formState, address: e.target.value})}
              required 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">E-Posta</label>
            <input 
              type="email" 
              value={formState.email} 
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              required 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Telefon</label>
            <input 
              type="text" 
              value={formState.phone} 
              onChange={(e) => setFormState({...formState, phone: e.target.value})}
              required 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:border-amber-500 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-8 py-3 rounded-xl transition-colors shadow-lg shadow-amber-900/20 text-sm">
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}

// --- PUBLIC SITE COMPONENT ---
function PublicSite({ cmsSettings }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    { id: 1, name: 'Dubai Stili Sütlü Tablet', category: 'tablet', price: '₺400', desc: 'Kavrulmuş özel kadayıf ve %100 doğal Antep fıstığı kremasının kusursuz uyumu.', badge: 'Çok Satan', img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Fıstık Rüyası Truff', category: 'truff', price: '₺450', desc: 'Bütün haldeki lüks Antep fıstıkları ve sütlü Belçika çikolatasının enfes buluşması.', badge: 'Özel Seri', img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: '85% Bitter Madlen', category: 'tablet', price: '₺350', desc: 'Yoğun kakao aroması arayanlar için özel hasat çekirdeklerinden üretilmiş premium bitter.', badge: null, img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Gold Karamelli Pralin', category: 'special', price: '₺480', desc: 'İpeksi karamel dolgulu ve karamelize altın çikolata kaplı butik lezzet.', badge: 'Yeni', img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'Fındıklı Kadife Tablet', category: 'tablet', price: '₺380', desc: 'Giresun fındıklarının kavrulmuş eşsiz aromasıyla zenginleştirilmiş sütlü çikolata.', badge: null, img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'Lüks Aralia Hediye Kutusu', category: 'special', price: '₺950', desc: 'Sevdikleriniz için özenle tasarlanmış kadife kutu içerisinde 24lü özel seçki.', badge: 'Popüler', img: 'https://images.unsplash.com/photo-1526318961596-a859239453c5?auto=format&fit=crop&q=80&w=800' },
  ];

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="relative">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-amber-900/30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer">
              <MinimalistLogo className="w-10 h-10" />
              <span className="text-2xl font-serif font-bold text-amber-400 tracking-widest">ARALIA</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Anasayfa</a>
              <a href="#collection" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Koleksiyon</a>
              <a href="#story" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Hikayemiz</a>
              <a href="#reviews" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">Yorumlar</a>
              <a href="#contact" className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors">İletişim</a>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="#erp-management-panel" 
                className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-4 py-2 rounded-full text-xs font-medium transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)]"
              >
                <Lock size={14} /> Yönetim Paneli
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          backgroundImage: `url('${cmsSettings.heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/60 to-zinc-950"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-800/20 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-amber-400 uppercase tracking-[0.4em] text-sm md:text-base mb-6 font-semibold drop-shadow-md">Artisanal Chocolate</p>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Kakao Çekirdeğinin Doğallığı, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600">Kadifemsi Dokunuş</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            El yapımı butik üretimimizle, en kaliteli malzemeleri lüks bir çikolata deneyimine dönüştürüyoruz.
          </p>
          <a href="#collection" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-zinc-950 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] transform hover:-translate-y-1">
            Koleksiyonu Keşfet
          </a>
        </div>
      </section>

      {/* COLLECTION SECTION WITH FILTER */}
      <section id="collection" className="py-32 bg-zinc-950 relative border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Özel Koleksiyonumuz</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full opacity-50 mb-8"></div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { id: 'all', label: 'Tüm Ürünler' },
                { id: 'tablet', label: 'Tabletler' },
                { id: 'truff', label: 'Trufflar' },
                { id: 'special', label: 'Özel Seriler' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-amber-500/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-zinc-900/40 rounded-3xl border border-amber-900/30 overflow-hidden hover:border-amber-500/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] flex flex-col">
                <div className="h-80 relative overflow-hidden flex items-center justify-center bg-zinc-900">
                   <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10"></div>
                   {product.badge && (
                     <div className="absolute top-4 left-4 z-20">
                       <span className="bg-amber-500 text-zinc-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">{product.badge}</span>
                     </div>
                   )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-amber-400 mb-2">{product.name}</h3>
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-2 flex-1">{product.desc}</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-800/50">
                    <span className="text-2xl font-serif font-bold text-white">{product.price}</span>
                    <span className="text-xs text-amber-400/70 uppercase tracking-widest font-medium">Boutique</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="py-32 relative bg-zinc-950 border-t border-amber-900/20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Hikayemiz & Zanaat</h2>
            <div className="w-16 h-1 bg-amber-500 rounded-full opacity-50"></div>
            <p className="text-zinc-400 leading-relaxed font-light text-lg whitespace-pre-wrap">
              {cmsSettings.aboutText}
            </p>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] md:aspect-square bg-zinc-900 rounded-3xl border border-amber-900/30 overflow-hidden relative shadow-[0_0_50px_rgba(245,158,11,0.15)] group">
               <img src={cmsSettings.storyImage} alt="Hikayemiz" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
               <div className="absolute inset-0 border-2 border-amber-500/20 m-6 rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="reviews" className="py-32 bg-zinc-900/20 border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Müşteri Deneyimleri</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ceren Demir', comment: 'Dubai stili çikolatanın kadifemsi dokusu hayatımda yediğim en iyi deneyimdi. Paketlemesi de tek kelimeyle harika.', role: 'Gastronomi Yazarı' },
              { name: 'Canberk S.', comment: 'Nişantaşındaki dükkanınızdan aldığım özel hediye kutusu tüm davetlileri büyüledi. Teşekkürler Aralia!', role: 'Kurumsal Müşteri' },
              { name: 'Selin A.', comment: 'Instagram üzerinden sipariş verdim, kargolama inanılmaz titizdi ve lezzeti eşsiz. Kesinlikle favorim.', role: 'Çikolata Sever' }
            ].map((rev, i) => (
              <div key={i} className="bg-zinc-950/60 p-8 rounded-3xl border border-amber-900/20 relative backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-zinc-300 italic text-sm leading-relaxed mb-6">"{rev.comment}"</p>
                </div>
                <div className="border-t border-zinc-900 pt-4">
                  <p className="font-bold text-white text-sm">{rev.name}</p>
                  <p className="text-xs text-amber-400/60">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-zinc-950 border-t border-amber-900/40 pt-20 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <MinimalistLogo className="w-8 h-8" />
                <span className="text-xl font-serif font-bold text-amber-400 tracking-widest">ARALIA</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Premium el yapımı çikolata. Lüks, zarif ve eşsiz tatlar.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">İletişim</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li className="hover:text-amber-400 transition-colors">{cmsSettings.address}</li>
                <li className="hover:text-amber-400 transition-colors">{cmsSettings.email}</li>
                <li className="hover:text-amber-400 transition-colors">{cmsSettings.phone}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Sosyal Medya</h4>
              <a href="https://instagram.com/araliacikolata" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-400 hover:text-pink-500 transition-colors bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800 hover:border-pink-900/50">
                <Instagram size={18} />
                <span className="font-medium">@araliacikolata</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs">© 2026 Aralia Çikolata. Tüm Hakları Saklıdır.</p>
            
            <a 
              href="#erp-management-panel" 
              className="group flex items-center gap-2 text-xs text-zinc-400 hover:text-amber-400 transition-colors bg-zinc-900/80 px-5 py-2.5 rounded-full border border-amber-900/40 shadow-md"
            >
              <Lock size={14} className="text-amber-400" />
              <span>Yönetim Paneline Git (ERP)</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
