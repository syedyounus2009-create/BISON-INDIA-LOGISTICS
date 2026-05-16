import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import LoadBoard from '@/pages/LoadBoard';
import Bookings from '@/pages/Bookings';
import Trucks from '@/pages/Trucks';
import Drivers from '@/pages/Drivers';
import Transporters from '@/pages/Transporters';
import Shippers from '@/pages/Shippers';
import Invoices from '@/pages/Invoices';
import Transactions from '@/pages/Transactions';
import Expenses from '@/pages/Expenses';
import Promotions from '@/pages/Promotions';
import Subscriptions from '@/pages/Subscriptions';
import Settings from '@/pages/Settings';
import LandingPage from '@/pages/LandingPage';
import NewLoad from '@/pages/NewLoad';

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loads" element={<LoadBoard />} />
        <Route path="/loads/new" element={<NewLoad />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/trucks" element={<Trucks />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/transporters" element={<Transporters />} />
        <Route path="/shippers" element={<Shippers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;