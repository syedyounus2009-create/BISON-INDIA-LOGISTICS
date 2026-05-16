import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, BookOpen, Truck, Wallet } from 'lucide-react';

const tabs = [
  { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/loads', label: 'Loads', icon: Package },
  { path: '/bookings', label: 'Trips', icon: BookOpen },
  { path: '/trucks', label: 'Fleet', icon: Truck },
  { path: '/transactions', label: 'Finance', icon: Wallet },
];

export default function BottomTabBar() {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 px-4 z-50 pb-safe">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || (tab.path === '/dashboard' && location.pathname === '/');
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center gap-0.5 py-1 px-3"
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-medium ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
