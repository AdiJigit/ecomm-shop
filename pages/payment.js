import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-10 mt-10" onSubmit={submitHandler}>
        <h1 className="mb-14 text-[18px] font-[500]">
          CHOOSE A PAYMENT METHOD
        </h1>

        <div className="w-max flex gap-5 text-white">
          <div className="input-payment relative flex text-black border w-[150px] h-[150px] duration-500 hover:scale-[1.02] hover:border-b-[2px] hover:border-b-black">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id="paypal"
              type="radio"
              checked={selectedPaymentMethod === 'paypal'}
              onChange={() => setSelectedPaymentMethod('paypal')}
            />
            <label
              className="absolute top-0 bottom-0 left-0 right-0 text-xl font-bold pl-11 pt-[55px] cursor-pointer"
              htmlFor="paypal"
            >
              <span className="text-[#15477C]">Pay</span>
              <span className="text-[#0E79BF]">pal</span>
            </label>
          </div>
          <div className="input-payment relative border w-[150px] h-[150px] duration-500 hover:scale-[1.02] hover:border-b-[2px] hover:border-b-black">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id="stripe"
              type="radio"
              checked={selectedPaymentMethod === 'stripe'}
              onChange={() => setSelectedPaymentMethod('stripe')}
            />
            <label
              className="absolute top-0 bottom-0 left-0 right-0 text-xl font-bold pl-11 pt-[55px] cursor-pointer"
              htmlFor="stripe"
            >
              <span className="text-[#626CD9]">Stripe</span>
            </label>
          </div>
        </div>
        <div className="mb-4 mt-32 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="primary-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

export default PaymentScreen;


PaymentScreen.auth = true;