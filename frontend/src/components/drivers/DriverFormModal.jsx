import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

export default function DriverFormModal({ driver, onClose }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(driver || {
    name: '',           // ← changed from 'full_name' to match your backend
    mobile: '',         // ← changed from 'phone'
    email: '',
    aadhaar_number: '',
    license_number: '',
    license_type: 'HMV',
    license_expiry: '',
    experience_years: '',
    home_city: '',
    home_state: '',
    current_location: '',
    bank_account: '',
    ifsc_code: '',
    emergency_contact: '',
    is_verified: false
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // 🔁 REPLACED: Base44 driver mutations with your backend API
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => driver 
      ? bisonAPI.drivers.update(driver.id, data) 
      : bisonAPI.drivers.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['drivers'] });
      toast.success(driver ? 'Driver updated!' : 'Driver added!');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ 
      ...form, 
      experience_years: parseInt(form.experience_years) || 0,
      // Map frontend fields to backend expectations
      name: form.name || form.full_name,  // fallback for old field name
      mobile: form.mobile || form.phone,  // fallback for old field name
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold font-rajdhani">{driver ? 'Edit Driver' : 'Add Driver'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2 md:col-span-1">
              <Label>Full Name *</Label>
              <Input 
                value={form.name || form.full_name || ''} 
                onChange={e => set('name', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <Label>Mobile Number *</Label>
              <Input 
                value={form.mobile || form.phone || ''} 
                onChange={e => set('mobile', e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Aadhaar Number</Label>
              <Input value={form.aadhaar_number} onChange={e => set('aadhaar_number', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>License Number *</Label>
              <Input value={form.license_number} onChange={e => set('license_number', e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>License Type</Label>
              <Select value={form.license_type} onValueChange={v => set('license_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="LMV">LMV</SelectItem>
                  <SelectItem value="HMV">HMV</SelectItem>
                  <SelectItem value="HTV">HTV</SelectItem>
                  <SelectItem value="HPMV">HPMV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>License Expiry</Label>
              <Input type="date" value={form.license_expiry} onChange={e => set('license_expiry', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Experience (Years)</Label>
              <Input type="number" value={form.experience_years} onChange={e => set('experience_years', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Home City</Label>
              <Input value={form.home_city} onChange={e => set('home_city', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Home State</Label>
              <Select value={form.home_state} onValueChange={v => set('home_state', v)}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>{STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Bank Account</Label>
              <Input value={form.bank_account} onChange={e => set('bank_account', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>IFSC Code</Label>
              <Input value={form.ifsc_code} onChange={e => set('ifsc_code', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Emergency Contact</Label>
              <Input value={form.emergency_contact} onChange={e => set('emergency_contact', e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.is_verified} onCheckedChange={v => set('is_verified', v)} />
            <Label>KYC Verified</Label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bayson-orange-gradient text-white border-0">
              {isPending ? 'Saving...' : driver ? 'Update Driver' : 'Add Driver'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
