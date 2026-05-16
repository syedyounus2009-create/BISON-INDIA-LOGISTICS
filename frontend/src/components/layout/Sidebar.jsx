import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Truck, Users, 
  FileText, CreditCard, Settings, LogOut, 
  MapPin, TrendingUp, Wallet, Tag 
} from 'lucide-react';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/loads', label: 'Load Board', icon: Package },
  { path: '/bookings', label: 'Bookings', icon: MapPin },
  { path: '/trucks', label: 'Trucks', icon: Truck },
  { path: '/drivers', label: 'Drivers', icon: Users },
  { path: '/transporters', label: 'Transporters', icon: Users },
  { path: '/shippers', label: 'Shippers', icon: Users },
  { path: '/invoices', label: 'Invoices', icon: FileText },
  { path: '/transactions', label: 'Transactions', icon: Wallet },
  { path: '/expenses', label: 'Expenses', icon: TrendingUp },
  { path: '/promotions', label: 'Promotions', icon: Tag },
  { path: '/subscriptions', label: 'Plans', icon: CreditCard },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-40 h-screen w-64 transform bg-gray-900 text-white transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex h-16 items-center justify-center border-b border-gray-800">
          <span className="text-xl font-bold text-orange-500">BISON</span>
          <span className="ml-1 text-sm text-gray-400">LOGISTICS</span>
        </div>
        
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose?.()}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-0 w-full border-t border-gray-800 p-4">
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}