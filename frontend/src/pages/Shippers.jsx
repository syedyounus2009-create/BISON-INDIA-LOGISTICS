import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Shippers() {
  const { data: shippers = [] } = useQuery({
    queryKey: ['shippers'],
    queryFn: () => bisonAPI.shippers.list()
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shippers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shippers.map(s => (
          <div key={s.id} className="bg-white p-4 rounded shadow border">
            <div className="font-semibold">{s.name || s.company_name || '—'}</div>
            <div className="text-sm text-gray-500">{s.mobile || s.phone || '—'}</div>
            <div className="text-xs text-gray-400 mt-1">GST: {s.gst_number || '—'}</div>
          </div>
        ))}
        {shippers.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">No shippers found</div>
        )}
      </div>
    </div>
  );
}