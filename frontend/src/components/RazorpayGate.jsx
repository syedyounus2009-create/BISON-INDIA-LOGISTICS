// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — RAZORPAY SUBSCRIPTION COMPONENT
// CODESPACE PATH: frontend/src/components/RazorpayGate.jsx
// ============================================================================

import React, { useState } from 'react';
import { IndianRupee, ShieldCheck, Loader2 } from 'lucide-react';

export default function RazorpayGate({ planName, amount, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const initializePaymentExchange = async () => {
    setIsProcessing(true);

    // Inject Razorpay core script asynchronously if not already mounted
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => executeTransaction();
      document.body.appendChild(script);
    } else {
      executeTransaction();
    }
  };

  const executeTransaction = () => {
    const options = {
      key: 'rzp_test_CORE_INTEGRITY_KEY', // Solder local test environment key
      amount: parseInt(amount.replace(/,/g, '')) * 100, // Convert clean INR to paisa
      currency: 'INR',
      name: 'BISON INDIA LOGISTICS',
      description: `ACTIVATE ${planName.toUpperCase()} SUBSCRIPTION NODE`,
      image: '/bison-logo.png',
      handler: function (response) {
        setIsProcessing(false);
        // Fire successful handshaking signature upstream
        if (onSuccess) onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: 'OPERATOR CORE',
        email: 'billing@bisonindia.com',
      },
      theme: {
        color: '#FF7A00', // Symmetrical brand orange accent match
      },
      modal: {
        ondismiss: () => setIsProcessing(false)
      }
    };

    const rzpWindow = new window.Razorpay(options);
    rzpWindow.open();
  };

  return (
    <button
      onClick={initializePaymentExchange}
      disabled={isProcessing || amount === '0' || amount === 'Custom'}
      className="w-full bg-[#FF7A00] hover:bg-[#FF8C1A] text-black py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-md disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>INITIALIZING SECURE LINK...</span>
        </>
      ) : (
        <>
          <IndianRupee className="w-3.5 h-3.5 stroke-[3]" />
          <span>AUTHORIZE ₹{amount} NOW</span>
        </>
      )}
    </button>
  );
}