import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function BookingFormModal({ onClose, booking }) {
  const qc = useQueryClient();
  
  // 🔁 REPLACED: Load open loads from your backend (status 'PENDING')
  const { data: allLoads = [] } = useQuery({ 
    queryKey: ['loads'], 
    queryFn: () => bisonAPI.loads.list() 
  });
  const openLoads = allLoads.filter(l => l.status === 'PENDING' || l.status === 'Open');
  
  // 🔁 REPLACED: Available trucks from your backend (status 'AVAILABLE')
  const { data: allTrucks = [] } = useQuery({ 
    queryKey: ['trucks'], 
    queryFn: () => bisonAPI.trucks.list() 
  });
  const availableTrucks = allTrucks.filter(t => t.status === 'AVAILABLE');
  
  // 🔁 REPLACED: Available drivers from your backend (status 'AVAILABLE')
  const { data: allDrivers = [] } = useQuery({ 
    queryKey: ['drivers'], 
    queryFn: () => bisonAPI.drivers.list() 
  });
  const availableDrivers = allDrivers.filter(d => d.status === 'AVAILABLE');

  const [form, setForm] = useState(booking || {
    booking_number: `BB${Date.now().toString().slice(-8)}`,
    load_id: '', shipper_name: '', transporter_name: '',
    truck_id: '', truck_number: '', driver_id: '', driver_name: '', driver_phone: '',
    from_city: '', from_state: '', to_city: '', to_state: '',
    material_type: '', weight_tons: '', loading_date: '', expected_delivery_date: '',
    agreed_price: '', advance_amount: '', commission_percent: 5,
    lr_number: '', e_way_bill: ''
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Auto-fill load details when a load is selected
  const handleLoadSelect = (loadId) => {
    const load = openLoads.find(l => l.id === parseInt(loadId));
    if (load) {
      set('load_id', loadId);
      setForm(f => ({
        ...f, load_id: loadId,
        from_city: load.pickup_location?.split(',')[0] || '',
        to_city: load.drop_location?.split(',')[0] || '',
        material_type: load.material_type,
        weight_tons: load.weight_ton,
        loading_date: load.loading_date || load.delivery_date,
        agreed_price: load.offered_price || '',
        shipper_name: load.shipper_name || f.shipper_name
      }));
    }
  };

  // Auto-fill truck details when a truck is selected
  const handleTruckSelect = (truckId) => {
    const truck = allTrucks.find(t => t.id === parseInt(truckId));
    if (truck) {
      setForm(f => ({ 
        ...f, 
        truck_id: truckId, 
        truck_number: truck.truck_number, 
        transporter_name: truck.owner_name || f.transporter_name 
      }));
    }
  };

  // Auto-fill driver details when a driver is selected
  const handleDriverSelect = (driverId) => {
    const driver = allDrivers.find(d => d.id === parseInt(driverId));
    if (driver) {
      setForm(f => ({ 
        ...f, 
        driver_id: driverId, 
        driver_name: driver.name, 
        driver_phone: driver.mobile 
      }));
    }
  };

  // 🔁 REPLACED: Create booking using your trips API
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      const price = parseFloat(data.agreed_price) || 0;
      const commissionAmt = price * (parseFloat(data.commission_percent) || 5) / 100;
      const advanceAmt = parseFloat(data.advance_amount) || price * 0.2;
      
      // Create a trip record (booking) in your backend
      return bisonAPI.trips.create({
        trip_number: data.booking_number,
        load_id: parseInt(data.load_id),
        truck_id: parseInt(data.truck_id),
        driver_id: parseInt(data.driver_id),
        start_location: data.from_city,
        destination: data.to_city,
        start_date: data.loading_date,
        end_date: data.expected_delivery_date || data.loading_date,
        agreed_price: price,
        advance_amount: advanceAmt,
        commission_amount: commissionAmt,
        status: 'CONFIRMED'
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trips'] });
      qc.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Booking created successfully!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    }
  });

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    mutate(form); 
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold font-rajdhani">New Booking</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Select Load</Label>
              <Select value={form.load_id} onValueChange={handleLoadSelect}>
                <SelectTrigger><SelectValue placeholder="Choose open load" /></SelectTrigger>
                <SelectContent>
                  {openLoads.map(l => (
                    <SelectItem key={l.id} value={l.id.toString()}>
                      {l.pickup_location?.split(',')[0]} → {l.drop_location?.split(',')[0]} ({l.material_type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Booking Number</Label>
              <Input value={form.booking_number} onChange={e => set('booking_number', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>From City</Label>
              <Input value={form.from_city} onChange={e => set('from_city', e.target.value)} placeholder="Loading city" />
            </div>
            <div className="space-y-1.5">
              <Label>To City</Label>
              <Input value={form.to_city} onChange={e => set('to_city', e.target.value)} placeholder="Delivery city" />
            </div>
            <div className="space-y-1.5">
              <Label>Shipper Name</Label>
              <Input value={form.shipper_name} onChange={e => set('shipper_name', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Select Truck</Label>
              <Select value={form.truck_id} onValueChange={handleTruckSelect}>
                <SelectTrigger><SelectValue placeholder="Choose truck" /></SelectTrigger>
                <SelectContent>
                  {availableTrucks.map(t => (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      {t.truck_number} ({t.truck_type}) - {t.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Select Driver</Label>
              <Select value={form.driver_id} onValueChange={handleDriverSelect}>
                <SelectTrigger><SelectValue placeholder="Choose driver" /></SelectTrigger>
                <SelectContent>
                  {availableDrivers.map(d => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.name} ({d.mobile}) - {d.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Material</Label>
              <Input value={form.material_type} onChange={e => set('material_type', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Weight (T)</Label>
              <Input type="number" value={form.weight_tons} onChange={e => set('weight_tons', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Loading Date</Label>
              <Input type="date" value={form.loading_date} onChange={e => set('loading_date', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Agreed Price (₹) *</Label>
              <Input type="number" value={form.agreed_price} onChange={e => set('agreed_price', e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Advance Amount (₹)</Label>
              <Input type="number" value={form.advance_amount} onChange={e => set('advance_amount', e.target.value)} placeholder="20% default" />
            </div>
            <div className="space-y-1.5">
              <Label>Commission %</Label>
              <Input type="number" value={form.commission_percent} onChange={e => set('commission_percent', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>LR Number</Label>
              <Input value={form.lr_number} onChange={e => set('lr_number', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>E-Way Bill</Label>
              <Input value={form.e_way_bill} onChange={e => set('e_way_bill', e.target.value)} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bayson-orange-gradient text-white border-0">
              {isPending ? 'Creating...' : 'Create Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
