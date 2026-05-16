import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Transporters() {
  const { data: transporters = [] } = useQuery({
    queryKey: ['transporters'],
    queryFn: () => bisonAPI.transporters.list()
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transporters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transporters.map(t => (
          <div key={t.id} className="bg-white p-4 rounded shadow border">
            <div className="font-semibold">{t.name || t.company_name || '—'}</div>
            <div className="text-sm text-gray-500">{t.mobile || t.phone || '—'}</div>
            <div className="text-xs text-gray-400 mt-1">Plan: {t.subscription_plan || 'Free'}</div>
          </div>
        ))}
        {transporters.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">No transporters found</div>
        )}
      </div>
    </div>
  );
}