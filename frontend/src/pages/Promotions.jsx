import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { Tag } from 'lucide-react';

export default function Promotions() {
  const { data: promos = [] } = useQuery({
    queryKey: ['promotions'],
    queryFn: () => bisonAPI.promotions?.list() || []
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Promotions</h1>
      {promos.length === 0 ? (
        <div className="bg-white p-8 rounded shadow text-center text-gray-500">
          <Tag className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No promotions yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promos.map(promo => (
            <div key={promo.id} className="bg-white p-4 rounded shadow border flex items-center gap-3">
              <Tag className="text-orange-500" size={20} />
              <div>
                <div className="font-mono font-bold">{promo.promo_code}</div>
                <div className="text-sm text-gray-500">{promo.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}