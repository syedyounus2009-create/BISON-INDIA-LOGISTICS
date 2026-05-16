import { useAuth } from '@/lib/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Mobile Number</label>
          <input type="text" className="w-full border rounded px-3 py-2 bg-gray-50" value={user?.mobile || ''} disabled />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Role</label>
          <input type="text" className="w-full border rounded px-3 py-2 bg-gray-50" value={user?.role || 'transporter'} disabled />
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
}