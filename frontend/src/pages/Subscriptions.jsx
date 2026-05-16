import { useMutation } from '@tanstack/react-query';
import { bisonAPI } from '@/api/bisonClient';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const plans = [
  { id: 1, name: 'Free', price: 0, features: ['5 loads/month', 'Basic tracking', 'Email support'] },
  { id: 2, name: 'Basic', price: 999, features: ['50 loads/month', 'Live tracking', 'Priority support', 'Invoice generation'] },
  { id: 3, name: 'Premium', price: 2999, features: ['Unlimited loads', 'Advanced analytics', 'Dedicated manager', 'API access'] },
];

export default function Subscriptions() {
  const subscribe = useMutation({
    mutationFn: (planId) => bisonAPI.subscription.subscribe(planId),
    onSuccess: () => toast.success('Subscription updated!'),
    onError: () => toast.error('Subscription failed')
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Subscription Plans</h1>
      <p className="text-gray-500 mb-6">Choose the perfect plan for your business</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className={`bg-white p-6 rounded-xl shadow border ${plan.name === 'Basic' ? 'ring-2 ring-orange-500' : ''}`}>
            {plan.name === 'Basic' && <div className="text-center text-orange-500 text-sm font-semibold mb-2">MOST POPULAR</div>}
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <div className="mt-2">
              <span className="text-3xl font-bold">₹{plan.price}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Button 
              onClick={() => subscribe.mutate(plan.id)} 
              disabled={subscribe.isPending}
              className="w-full mt-6 bg-orange-500 text-white hover:bg-orange-600"
            >
              {subscribe.isPending ? 'Processing...' : 'Subscribe'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}