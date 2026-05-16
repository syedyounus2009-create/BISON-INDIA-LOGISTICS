import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Bookings() {
  const { data: trips = [] } = useQuery({
    queryKey: ['trips'],
    queryFn: () => bisonAPI.trips.list()
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Trip #</th>
              <th className="px-4 py-2 text-left">Route</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip.id} className="border-t">
                <td className="px-4 py-2">{trip.trip_number || trip.id}</td>
                <td className="px-4 py-2">{trip.start_location || '—'} → {trip.destination || '—'}</td>
                <td className="px-4 py-2">{trip.trip_status || 'CREATED'}</td>
                <td className="px-4 py-2">{trip.payment_status || 'PENDING'}</td>
              </tr>
            ))}
            {trips.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}