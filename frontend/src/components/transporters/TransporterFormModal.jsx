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

export default function TransporterFormModal({ transporter, onClose }) {
  const qc = useQueryClient();
  
  // Map backend field names to form fields
  const [form, setForm] = useState(transporter ? {
    name: transporter.name || transporter.company_name || '',
    contact_person: transporter.contact_person || '',
    mobile: transporter.mobile || transporter.phone || '',
    email: transporter.email || '',
    gst_number: transporter.gst_number || '',
    pan_number: transporter.pan_number || '',
    address: transporter.address || '',
    city: transporter.city || '',
    state: transporter.state || '',
    pincode: transporter.pincode || '',
    bank_account: transporter.bank_account || '',
    ifsc_code: transporter.ifsc_code || '',
    bank_name: transporter.bank_name || '',
    subscription_plan: transporter.subscription_plan || 'Free',
    verification_status: transporter.verification_status || transporter.kyc_status || 'Pending',
    is_verified: transporter.is_verified || false
  } : {
    name: '', contact_person: '', mobile: '', email: '',
    gst_number: '', pan_number: '', address: '', city: '', state: '',
    pincode: '', bank_account: '', ifsc_code: '', bank_name: '',
    subscription_plan: 'Free', verification_status: 'Pending', is_verified: false
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
        gst_number: data.gst_number,
        pan_number: data.pan_number,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        bank_account: data.bank_account,
        ifsc_code: data.ifsc_code,
        bank_name: data.bank_name,
        subscription_plan: data.subscription_plan,
        verification_status: data.verification_status,
        is_verified: data.is_verified
      };
      
      return transporter 
        ? bisonAPI.transporters.update(transporter.id, payload) 
        : bisonAPI.transporters.create(payload);
    },
    onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['transporters'] }); 
      toast.success(transporter ? 'Transporter updated!' : 'Transporter added!'); 
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
          <h2 className="text-xl font-bold font-rajdhani">{transporter ? 'Edit Transporter' : 'Add Transporter'}</h2>
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
              <Label>Bank Account Number</Label>
              <Input value={form.bank_account} onChange={e => set('bank_account', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>IFSC Code</Label>
              <Input value={form.ifsc_code} onChange={e => set('ifsc_code', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Name</Label>
              <Input value={form.bank_name} onChange={e => set('bank_name', e.target.value)} />
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
          <div className="flex items-center gap-2">
            <Switch checked={form.is_verified} onCheckedChange={v => set('is_verified', v)} />
            <Label>Mark as Verified Partner</Label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bayson-orange-gradient text-white border-0">
              {isPending ? 'Saving...' : transporter ? 'Update Transporter' : 'Add Transporter'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
