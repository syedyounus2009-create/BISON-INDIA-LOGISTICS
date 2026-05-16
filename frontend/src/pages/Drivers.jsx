import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Drivers() {
  const { data: drivers = [] } = useQuery({ queryKey: ['drivers'], queryFn: () => bisonAPI.drivers.list() });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Drivers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map(driver => <div key={driver.id} className="bg-white p-4 rounded shadow border"><div className="font-semibold">{driver.name || driver.full_name}</div><div className="text-sm text-gray-500">{driver.mobile || driver.phone}</div></div>)}
      </div>
    </div>
  );
}