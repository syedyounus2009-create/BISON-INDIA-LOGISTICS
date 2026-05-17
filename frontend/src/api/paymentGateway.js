// ============================================================================
// SYSTEM IDENTIFIER: BISON INDIA LOGISTICS — EXTERNAL PAYMENT GATEWAYS BUS [IC]
// FILE PATH: frontend/src/api/paymentGateway.js
// ============================================================================

/**
 * UTILITY: HELPER SCRIPT LOADER
 * Injects external checkout network scripts into the document frame dynamically.
 */
const loadExternalScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * MASTER PAYMENT GATEWAY INTERFACE
 * Standard plug-and-play execution ports for financial clearings.
 */
export const paymentGateway = {
  
  /**
   * PORT A: RAZORPAY UPI / NETBANKING INTEGRATION (TARGET: DOMESTIC INDIA)
   */
  initializeRazorpayTransaction: async ({ amount, invoiceNumber, customerMobile, customerEmail, onTransactionSuccess }) => {
    // 1. Mount the remote Razorpay checkout script onto the bus line
    const isScriptLoaded = await loadExternalScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!isScriptLoaded) {
      alert('[PAYMENT BUS FAILURE] Failed to load Razorpay checkout script terminal.');
      return { success: false };
    }

    // 2. Configure checkout option parameters matching Indian payment networks
    const configurationOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key',
      amount: Math.round(amount * 100), // Converted to base paisa units
      currency: 'INR',
      name: 'BISON SMART LOGISTICS',
      description: `Clearing Invoice Ref: ${invoiceNumber}`,
      image: '/logo-web.jpg',
      handler: function (response) {
        // Transaction verified by remote node
        onTransactionSuccess({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature
        });
      },
      prefill: {
        contact: customerMobile || '',
        email: customerEmail || ''
      },
      theme: {
        color: '#FF7A00' // Matches your custom safety amber branding color
      }
    };

    const checkoutWindowInstance = new window.Razorpay(configurationOptions);
    checkoutWindowInstance.open();
  },

  /**
   * PORT B: STRIPE INTENT INTEGRATION (TARGET: INTERNATIONAL CONTEXTS)
   */
  initializeStripeTransaction: async ({ clientSecret, onTransactionSuccess }) => {
    const isScriptLoaded = await loadExternalScript('https://js.stripe.com/v3/');
    
    if (!isScriptLoaded) {
      alert('[PAYMENT BUS FAILURE] Failed to connect to Stripe external script node.');
      return { success: false };
    }

    console.log('[STRIPE PORT ENERGIZED] Tokenized Secret loaded:', clientSecret);
    // Stripe Element mounting pipelines connect here for production runs
  }
};