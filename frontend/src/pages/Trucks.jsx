import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Trucks() {
  const { data: trucks = [] } = useQuery({ queryKey: ['trucks'], queryFn: () => bisonAPI.trucks.list() });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trucks</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-2">Number</th><th className="px-4 py-2">Type</th><th className="px-4 py-2">Status</th></tr></thead>
        <tbody>{trucks.map(truck => <tr key={truck.id} className="border-t"><td className="px-4 py-2">{truck.truck_number}</td><td className="px-4 py-2">{truck.truck_type || '-'}</td><td className="px-4 py-2">{truck.status || 'AVAILABLE'}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}