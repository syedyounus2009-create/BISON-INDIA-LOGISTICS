import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Bell, Menu } from 'lucide-react';

export default function MobileHeader({ unreadCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname !== '/dashboard' && location.pathname !== '/';

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between pt-safe">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        ) : (
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
        )}
        {!showBack && (
          <div>
            <div className="font-bold text-gray-800 text-sm leading-tight">BISON</div>
            <div className="text-[9px] text-orange-500 font-medium tracking-wider">SMART LOGISTICS</div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link to="/notifications" className="relative p-2">
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
        <Link to="/menu" className="p-2">
          <Menu className="w-5 h-5 text-gray-600" />
        </Link>
      </div>
    </div>
  );
}
