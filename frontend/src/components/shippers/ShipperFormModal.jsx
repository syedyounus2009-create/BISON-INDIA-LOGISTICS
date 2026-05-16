import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];
const INDUSTRIES = ['Manufacturing', 'Retail', 'E-Commerce', 'FMCG', 'Pharma', 'Auto', 'Steel', 'Agriculture', 'Textile', 'Other'];

export default function ShipperFormModal({ shipper, onClose }) {
  const qc = useQueryClient();
  
  // Map backend field names to form fields
  const [form, setForm] = useState(shipper ? {
    name: shipper.name || shipper.company_name || '',
    contact_person: shipper.contact_person || '',
    mobile: shipper.mobile || shipper.phone || '',
    email: shipper.email || '',
    industry: shipper.industry || shipper.industry_type || '',
    gst_number: shipper.gst_number || '',
    pan_number: shipper.pan_number || '',
    address: shipper.address || '',
    city: shipper.city || '',
    state: shipper.state || '',
    pincode: shipper.pincode || '',
    subscription_plan: shipper.subscription_plan || 'Free',
    verification_status: shipper.verification_status || shipper.kyc_status || 'Pending'
  } : {
    name: '', contact_person: '', mobile: '', email: '',
    industry: '', gst_number: '', pan_number: '', address: '',
    city: '', state: '', pincode: '', subscription_plan: 'Free', verification_status: 'Pending'
  });
  
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // 🔁 REPLACED: Base44 mutations with your backend API
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      const payload = {
        name: data.name,
        contact_person: data.contact_person,
        mobile: data.mobile,
        email: data.email,
        industry: data.industry,
        gst_number: data.gst_number,
        pan_number: data.pan_number,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        subscription_plan: data.subscription_plan,
        verification_status: data.verification_status
      };
      
      return shipper 
        ? bisonAPI.shippers.update(shipper.id, payload) 
        : bisonAPI.shippers.create(payload);
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['shippers'] }); 
      toast.success(shipper ? 'Shipper updated!' : 'Shipper added!'); 
      onClose(); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Operation failed');
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
          <h2 className="text-xl font-bold font-rajdhani">{shipper ? 'Edit Shipper' : 'Add Shipper'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <Label>Company Name *</Label>
              <Input value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Contact Person</Label>
              <Input value={form.contact_person} onChange={e => set('contact_person', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Mobile Number *</Label>
              <Input value={form.mobile} onChange={e => set('mobile', e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Industry Type</Label>
              <Select value={form.industry} onValueChange={v => set('industry', v)}>
                <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>GST Number</Label>
              <Input value={form.gst_number} onChange={e => set('gst_number', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>PAN Number</Label>
              <Input value={form.pan_number} onChange={e => set('pan_number', e.target.value)} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={e => set('address', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input value={form.city} onChange={e => set('city', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Select value={form.state} onValueChange={v => set('state', v)}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Pincode</Label>
              <Input value={form.pincode} onChange={e => set('pincode', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Subscription Plan</Label>
              <Select value={form.subscription_plan} onValueChange={v => set('subscription_plan', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Free', 'Basic', 'Premium', 'Enterprise'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>KYC Status</Label>
              <Select value={form.verification_status} onValueChange={v => set('verification_status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Pending', 'Under Review', 'Verified', 'Rejected'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bayson-orange-gradient text-white border-0">
              {isPending ? 'Saving...' : shipper ? 'Update Shipper' : 'Add Shipper'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
