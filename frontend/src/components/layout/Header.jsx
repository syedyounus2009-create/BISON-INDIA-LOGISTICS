import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">BISON Smart Logistics</h1>
          <p className="text-xs text-gray-500">India's Trusted Transport Network</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}