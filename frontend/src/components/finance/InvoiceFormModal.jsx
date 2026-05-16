import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function InvoiceFormModal({ invoice, onClose }) {
  const qc = useQueryClient();
  const [form, setForm] = useState(invoice || {
    invoice_number: `INV-${Date.now().toString().slice(-8)}`,
    customer_name: '', customer_gst: '', customer_address: '',
    invoice_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, unit_price: 0, amount: 0 }],
    tax_rate: 18, discount: 0, notes: ''
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { description: '', quantity: 1, unit_price: 0, amount: 0 }] }));
  const removeItem = (idx) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
  const updateItem = (idx, field, value) => {
    const newItems = [...form.items];
    newItems[idx][field] = value;
    if (field === 'quantity' || field === 'unit_price') {
      newItems[idx].amount = (newItems[idx].quantity || 1) * (newItems[idx].unit_price || 0);
    }
    setForm(f => ({ ...f, items: newItems }));
  };

  const subtotal = form.items.reduce((s, i) => s + (i.amount || 0), 0);
  const taxAmount = subtotal * (form.tax_rate / 100);
  const discountAmount = subtotal * (form.discount / 100);
  const total = subtotal + taxAmount - discountAmount;

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => invoice ? bisonAPI.invoices.update(invoice.id, data) : bisonAPI.invoices.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['invoices'] }); toast.success(invoice ? 'Invoice updated!' : 'Invoice created!'); onClose(); }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ ...form, subtotal, tax_amount: taxAmount, discount_amount: discountAmount, total_amount: total });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">{invoice ? 'Edit Invoice' : 'Create Invoice'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Invoice Number</Label><Input value={form.invoice_number} onChange={e => set('invoice_number', e.target.value)} required /></div>
            <div><Label>Invoice Date</Label><Input type="date" value={form.invoice_date} onChange={e => set('invoice_date', e.target.value)} required /></div>
            <div><Label>Due Date</Label><Input type="date" value={form.due_date} onChange={e => set('due_date', e.target.value)} required /></div>
            <div><Label>Customer Name</Label><Input value={form.customer_name} onChange={e => set('customer_name', e.target.value)} required /></div>
            <div><Label>Customer GST</Label><Input value={form.customer_gst} onChange={e => set('customer_gst', e.target.value)} /></div>
            <div className="col-span-2"><Label>Customer Address</Label><Input value={form.customer_address} onChange={e => set('customer_address', e.target.value)} /></div>
          </div>

          <div><h3 className="font-semibold mb-2">Invoice Items</h3>
            <div className="space-y-2">{form.items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5"><Input placeholder="Description" value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} /></div>
                <div className="col-span-2"><Input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(idx, 'quantity', parseFloat(e.target.value))} /></div>
                <div className="col-span-3"><Input type="number" placeholder="Unit Price" value={item.unit_price} onChange={e => updateItem(idx, 'unit_price', parseFloat(e.target.value))} /></div>
                <div className="col-span-1 text-right font-medium">₹{item.amount.toLocaleString()}</div>
                <div className="col-span-1"><button type="button" onClick={() => removeItem(idx)} className="text-red-500">✕</button></div>
              </div>
            ))}</div>
            <Button type="button" variant="outline" size="sm" onClick={addItem} className="mt-2">+ Add Item</Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div><Label>Tax Rate (%)</Label><Input type="number" value={form.tax_rate} onChange={e => set('tax_rate', parseFloat(e.target.value))} /></div>
            <div><Label>Discount (%)</Label><Input type="number" value={form.discount} onChange={e => set('discount', parseFloat(e.target.value))} /></div>
            <div className="text-right"><p className="text-sm text-gray-500">Subtotal</p><p className="font-bold">₹{subtotal.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Tax (GST)</p><p className="font-bold">₹{taxAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Discount</p><p className="font-bold">-₹{discountAmount.toLocaleString()}</p>
              <p className="text-lg font-bold text-orange-600 mt-2">Total: ₹{total.toLocaleString()}</p>
            </div>
          </div>

          <div><Label>Notes</Label><Input value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Terms & conditions..." /></div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bg-orange-500 text-white">{isPending ? 'Saving...' : invoice ? 'Update Invoice' : 'Create Invoice'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
