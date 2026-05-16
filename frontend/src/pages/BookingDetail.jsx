import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { ArrowLeft } from 'lucide-react';

export default function BookingDetail() {
  const { id } = useParams();
  const { data: trips = [] } = useQuery({
    queryKey: ['trips'],
    queryFn: () => bisonAPI.trips.list()
  });
  const trip = trips.find(t => t.id === parseInt(id));

  if (!trip) {
    return <div className="p-6 text-center text-gray-500">Loading trip details...</div>;
  }

  return (
    <div className="p-6">
      <Link to="/bookings" className="inline-flex items-center gap-1 text-orange-500 mb-4 hover:underline">
        <ArrowLeft size={16} /> Back to Bookings
      </Link>
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Trip #{trip.trip_number || trip.id}</h1>
        <div className="space-y-2">
          <p><strong>Route:</strong> {trip.start_location || '—'} → {trip.destination || '—'}</p>
          <p><strong>Status:</strong> {trip.trip_status || 'CREATED'}</p>
          <p><strong>Payment:</strong> {trip.payment_status || 'PENDING'}</p>
          <p><strong>Start Date:</strong> {trip.start_date || '—'}</p>
          <p><strong>End Date:</strong> {trip.end_date || '—'}</p>
        </div>
      </div>
    </div>
  );
}