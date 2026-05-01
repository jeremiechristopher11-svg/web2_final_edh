import { useState, useEffect } from 'react'
import { Menu, X, Bell, LogOut, User, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { NotificationPopover } from './NotificationPopover'
import { useLocation, useNavigate } from 'react-router-dom'

export default function DashboardLayout({ children, userRole = 'admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  // Correction : Fermer la sidebar automatiquement sur mobile (écran < 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMenuItems = () => {
    const commonItems = [{ label: 'Notifications', path: '/notifications', icon: '🔔' }];
    const roleItems = {
      admin: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { label: 'Gestion Pannes', path: '/gestion-pannes', icon: '⚠️' },
        { label: 'Gestion Interventions', path: '/gestion-interventions', icon: '🔧' },
      ],
      agent: [
        { label: 'Dashboard', path: '/agent/dashboard', icon: '📊' },
        { label: 'Pannes', path: '/gestion-pannes', icon: '⚠️' },
        { label: 'Interventions', path: '/gestion-interventions', icon: '🔧' },
      ],
      // ... autres rôles
    };
    return [...(roleItems[userRole] || []), ...commonItems];
  };

  const menuItems = getMenuItems();
  const isActive = (path) => location.pathname === path;

  // Génération dynamique des Breadcrumbs
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-blue-800 flex items-center justify-between">
          {sidebarOpen && <span className="font-bold text-xl">EDH Zero Paper</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-blue-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive(item.path) ? 'bg-blue-600' : 'hover:bg-blue-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500">
            {pathnames.map((value, index) => (
              <div key={value} className="flex items-center">
                {index > 0 && <ChevronRight size={14} className="mx-2" />}
                <span className="capitalize">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <NotificationPopover />
            <div className="flex items-center gap-2 border-l pl-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="text-sm font-medium">{userRole}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}