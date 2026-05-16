import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Transactions() {
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => bisonAPI.transactions.list()
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Party</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.transaction_date?.split('T')[0] || '-'}</td>
                <td className="px-4 py-2">{t.transaction_type || '-'}</td>
                <td className="px-4 py-2">{t.party_name || '-'}</td>
                <td className="px-4 py-2 text-right font-semibold">₹{(t.amount || 0).toLocaleString()}</td>
                <td className="px-4 py-2">{t.status || 'COMPLETED'}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}