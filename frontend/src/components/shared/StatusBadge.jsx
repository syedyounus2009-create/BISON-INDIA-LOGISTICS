const statusConfig = {
  'Confirmed': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Truck Dispatched': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  'Loading Started': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'In Transit': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Near Destination': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Delivered': { bg: 'bg-green-100', text: 'text-green-700' },
  'POD Uploaded': { bg: 'bg-teal-100', text: 'text-teal-700' },
  'Completed': { bg: 'bg-green-100', text: 'text-green-800' },
  'Cancelled': { bg: 'bg-red-100', text: 'text-red-700' },
  'Disputed': { bg: 'bg-red-100', text: 'text-red-800' },
  'Open': { bg: 'bg-green-100', text: 'text-green-700' },
  'Bidding': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Assigned': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Expired': { bg: 'bg-gray-100', text: 'text-gray-600' },
  'Available': { bg: 'bg-green-100', text: 'text-green-700' },
  'On Trip': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Under Maintenance': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Inactive': { bg: 'bg-gray-100', text: 'text-gray-600' },
  'Paid': { bg: 'bg-green-100', text: 'text-green-700' },
  'Unpaid': { bg: 'bg-red-100', text: 'text-red-700' },
  'Partial': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Advance Paid': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'Fully Paid': { bg: 'bg-green-100', text: 'text-green-800' },
  'Overdue': { bg: 'bg-red-100', text: 'text-red-800' },
  'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Verified': { bg: 'bg-green-100', text: 'text-green-700' },
  'Rejected': { bg: 'bg-red-100', text: 'text-red-700' },
  'Under Review': { bg: 'bg-blue-100', text: 'text-blue-700' },
};

export default function StatusBadge({ status, size = 'sm' }) {
  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700' };
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`${config.bg} ${config.text} ${padding} rounded-full font-medium inline-flex items-center gap-1`}>
      {status}
    </span>
  );
}
