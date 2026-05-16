import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Invoices() {
  const { data: invoices = [] } = useQuery({ queryKey: ['invoices'], queryFn: () => bisonAPI.invoices?.list() || [] });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-2">Invoice #</th><th className="px-4 py-2">Amount</th><th className="px-4 py-2">Status</th></tr></thead>
        <tbody>{invoices.map(inv => <tr key={inv.id} className="border-t"><td className="px-4 py-2">{inv.invoice_number}</td><td className="px-4 py-2">₹{inv.amount}</td><td className="px-4 py-2">{inv.status}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}