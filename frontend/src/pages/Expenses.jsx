import { useQuery } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';

export default function Expenses() {
  const { data: expenses = [] } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => bisonAPI.expenses.list()
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Trip Expenses</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id} className="border-t">
                <td className="px-4 py-2">{exp.date || exp.created_at?.split('T')[0] || '-'}</td>
                <td className="px-4 py-2">{exp.expense_type}</td>
                <td className="px-4 py-2">{exp.location || '-'}</td>
                <td className="px-4 py-2 text-right font-semibold">₹{(exp.amount || 0).toLocaleString()}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${exp.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {exp.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}