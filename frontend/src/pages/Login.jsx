import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('transporter');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let success;
      if (isLogin) success = await login(mobile, password);
      else success = await register(mobile, password, role);
      if (success) window.location.href = '/dashboard';
      else setError(isLogin ? 'Invalid credentials' : 'Registration failed');
    } catch (err) { setError('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-2xl font-bold">BISON SMART LOGISTICS</h1>
          <p className="text-gray-500 text-sm mt-1">India's Trusted Transport Network</p>
        </div>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-2.5 rounded-lg font-medium ${isLogin ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-2.5 rounded-lg font-medium ${!isLogin ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>Register</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="tel" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          {!isLogin && (
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
              <option value="transporter">Transporter</option><option value="shipper">Shipper</option><option value="driver">Driver</option><option value="admin">Admin</option>
            </select>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-2 rounded-lg">{loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}</button>
        </form>
      </div>
    </div>
  );
}