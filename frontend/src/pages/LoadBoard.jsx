import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, MapPin, Weight, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

export default function LoadBoard() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [postForm, setPostForm] = useState({
    material_type: '',
    weight_tons: '',
    pickup_location: '',
    drop_location: '',
    offered_price: '',
  });
  const queryClient = useQueryClient();

  // Fetch loads
  const { data: loads = [], isLoading } = useQuery({
    queryKey: ['loads'],
    queryFn: () => bisonAPI.loads.list(),
  });

  // Fetch trucks and drivers for trip creation
  const { data: trucks = [] } = useQuery({
    queryKey: ['trucks'],
    queryFn: () => bisonAPI.trucks.list(),
  });
  const { data: drivers = [] } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => bisonAPI.drivers.list(),
  });

  // Post load mutation
  const postMutation = useMutation({
    mutationFn: (data) => bisonAPI.loads.create({
      ...data,
      weight_tons: parseFloat(data.weight_tons),
      offered_price: parseFloat(data.offered_price),
      status: 'PENDING',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['loads']);
      toast.success('Load posted successfully!');
      setIsPostModalOpen(false);
      setPostForm({ material_type: '', weight_tons: '', pickup_location: '', drop_location: '', offered_price: '' });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to post load'),
  });

  // Create trip mutation
  const tripMutation = useMutation({
    mutationFn: (data) => bisonAPI.trips.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['loads']);
      queryClient.invalidateQueries(['trips']);
      toast.success('Trip created successfully!');
      setIsTripModalOpen(false);
      setSelectedLoad(null);
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Failed to create trip'),
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    postMutation.mutate(postForm);
  };

  const handleTripSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tripData = {
      trip_number: `TRP-${Date.now()}`,
      load_id: selectedLoad.id,
      truck_id: parseInt(formData.get('truck_id')),
      driver_id: parseInt(formData.get('driver_id')),
      start_location: selectedLoad.pickup_location,
      destination: selectedLoad.drop_location,
      start_date: new Date().toISOString().split('T')[0],
    };
    tripMutation.mutate(tripData);
  };

  const openTripModal = (load) => {
    setSelectedLoad(load);
    setIsTripModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Load Board</h1>
          <p className="text-gray-500">{loads.filter(l => l.status === 'PENDING').length} open loads</p>
        </div>
        <Button onClick={() => setIsPostModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" /> Post Load
        </Button>
      </div>

      {isLoading && <div className="text-center py-8">Loading loads...</div>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loads.map(load => (
          <Card key={load.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{load.material_type || 'Material'}</span>
                <span className="text-sm font-normal text-gray-500">{load.weight_ton || 0} T</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>{load.pickup_location || '?'} → {load.drop_location || '?'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                <IndianRupee className="h-4 w-4" />
                <span>₹{load.offered_price?.toLocaleString() || 0}</span>
              </div>
              {load.status === 'PENDING' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => openTripModal(load)}
                >
                  Create Trip
                </Button>
              )}
              {load.status === 'ASSIGNED' && (
                <span className="text-xs text-blue-600 block text-center">Assigned to trip</span>
              )}
            </CardContent>
          </Card>
        ))}
        {loads.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No loads found. Click "Post Load" to create one.
          </div>
        )}
      </div>

      {/* Post Load Modal */}
      <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Post New Load</DialogTitle></DialogHeader>
          <form onSubmit={handlePostSubmit} className="space-y-4">
            <Input 
              placeholder="Material Type (e.g., Steel, Cement)" 
              value={postForm.material_type} 
              onChange={e => setPostForm({...postForm, material_type: e.target.value})} 
              required 
            />
            <Input 
              type="number" 
              placeholder="Weight (Tons)" 
              value={postForm.weight_tons} 
              onChange={e => setPostForm({...postForm, weight_tons: e.target.value})} 
              required 
            />
            <Input 
              placeholder="Pickup Location (City, State)" 
              value={postForm.pickup_location} 
              onChange={e => setPostForm({...postForm, pickup_location: e.target.value})} 
              required 
            />
            <Input 
              placeholder="Drop Location (City, State)" 
              value={postForm.drop_location} 
              onChange={e => setPostForm({...postForm, drop_location: e.target.value})} 
              required 
            />
            <Input 
              type="number" 
              placeholder="Offered Price (₹)" 
              value={postForm.offered_price} 
              onChange={e => setPostForm({...postForm, offered_price: e.target.value})} 
              required 
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsPostModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={postMutation.isPending}>
                {postMutation.isPending ? 'Posting...' : 'Post Load'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Trip Modal */}
      <Dialog open={isTripModalOpen} onOpenChange={setIsTripModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Trip for Load #{selectedLoad?.id}</DialogTitle></DialogHeader>
          <form onSubmit={handleTripSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Truck</label>
              <select 
                name="truck_id" 
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                required
                defaultValue=""
              >
                <option value="" disabled>Select a truck</option>
                {trucks.filter(t => t.status === 'AVAILABLE').map(truck => (
                  <option key={truck.id} value={truck.id}>
                    {truck.truck_number} ({truck.truck_type || 'Unknown type'})
                  </option>
                ))}
              </select>
              {trucks.filter(t => t.status === 'AVAILABLE').length === 0 && (
                <p className="text-xs text-red-500 mt-1">No available trucks. Please add a truck first.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Driver</label>
              <select 
                name="driver_id" 
                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                required
                defaultValue=""
              >
                <option value="" disabled>Select a driver</option>
                {drivers.filter(d => d.status === 'AVAILABLE').map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} ({driver.mobile})
                  </option>
                ))}
              </select>
              {drivers.filter(d => d.status === 'AVAILABLE').length === 0 && (
                <p className="text-xs text-red-500 mt-1">No available drivers. Please add a driver first.</p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsTripModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={tripMutation.isPending}>
                {tripMutation.isPending ? 'Creating...' : 'Create Trip'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}