import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Analytics() {
  const { data: trucks = [] } = useQuery({ queryKey: ['trucks'], queryFn: () => bisonAPI.trucks.list() });
  const { data: trips = [] } = useQuery({ queryKey: ['trips'], queryFn: () => bisonAPI.trips.list() });
  const { data: loads = [] } = useQuery({ queryKey: ['loads'], queryFn: () => bisonAPI.loads.list() });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Trucks</h3>
          <p className="text-3xl font-bold">{trucks.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Trips</h3>
          <p className="text-3xl font-bold">{trips.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Loads</h3>
          <p className="text-3xl font-bold">{loads.length}</p>
        </div>
      </div>
    </div>
  );
}