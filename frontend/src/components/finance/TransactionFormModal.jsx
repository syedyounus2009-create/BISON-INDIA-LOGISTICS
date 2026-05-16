import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function TransactionFormModal({ transaction, onClose }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(transaction || {
    amount: '', direction: 'Credit', transaction_type: 'Payment', payment_mode: 'NEFT',
    party_name: '', party_type: 'Transporter', reference_number: '',
    transaction_date: new Date().toISOString().split('T')[0], notes: ''
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => transaction ? bisonAPI.transactions.update(transaction.id, data) : bisonAPI.transactions.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['transactions'] }); toast.success(transaction ? 'Transaction updated!' : 'Transaction recorded!'); onClose(); }
  });

  const handleSubmit = (e) => { e.preventDefault(); mutate({ ...form, amount: parseFloat(form.amount) }); };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-xl font-bold">{transaction ? 'Edit Transaction' : 'Record Transaction'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Amount (₹)</Label><Input type="number" value={form.amount} onChange={e => set('amount', e.target.value)} required /></div>
            <div><Label>Direction</Label><Select value={form.direction} onValueChange={v => set('direction', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Credit">Credit (Incoming)</SelectItem><SelectItem value="Debit">Debit (Outgoing)</SelectItem></SelectContent></Select></div>
            <div><Label>Transaction Type</Label><Select value={form.transaction_type} onValueChange={v => set('transaction_type', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Advance Payment">Advance Payment</SelectItem><SelectItem value="Balance Payment">Balance Payment</SelectItem><SelectItem value="Commission">Commission</SelectItem><SelectItem value="Refund">Refund</SelectItem><SelectItem value="Subscription">Subscription</SelectItem></SelectContent></Select></div>
            <div><Label>Payment Mode</Label><Select value={form.payment_mode} onValueChange={v => set('payment_mode', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="NEFT">NEFT</SelectItem><SelectItem value="UPI">UPI</SelectItem><SelectItem value="Cash">Cash</SelectItem><SelectItem value="Cheque">Cheque</SelectItem></SelectContent></Select></div>
            <div><Label>Party Name</Label><Input value={form.party_name} onChange={e => set('party_name', e.target.value)} /></div>
            <div><Label>Party Type</Label><Select value={form.party_type} onValueChange={v => set('party_type', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Shipper">Shipper</SelectItem><SelectItem value="Transporter">Transporter</SelectItem><SelectItem value="Platform">Platform</SelectItem></SelectContent></Select></div>
            <div><Label>Reference Number</Label><Input value={form.reference_number} onChange={e => set('reference_number', e.target.value)} /></div>
            <div><Label>Transaction Date</Label><Input type="date" value={form.transaction_date} onChange={e => set('transaction_date', e.target.value)} /></div>
            <div className="col-span-2"><Label>Notes</Label><Input value={form.notes} onChange={e => set('notes', e.target.value)} /></div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bg-orange-500 text-white">{isPending ? 'Saving...' : transaction ? 'Update' : 'Record Transaction'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
