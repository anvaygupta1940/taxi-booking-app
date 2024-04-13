import { PaymentElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js'
import React from 'react'

const CheckoutForm = () => {
    const stripe: any = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: any) => {
        event.preventDeafult();
        if (elements == null) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            return;
        }

        // create the payment intent and obtain client secret 
        const res = await fetch("/api/create-intent", {
            method: "POST",
            body: JSON.stringify({
                amount: 58,
            })
        });

        const secretKey = await res.json();
        console.log(secretKey);
        const { error } = await stripe.confirmPayment(
            {
                clientSecret: secretKey,
                elements,

                confirmParams: {
                    return_url: "http://localhost:3000/",
                }
            }
        )
    }





    return (
        <div className=' flex flex-col justify-center items-center mt-6'>
            <form onSubmit={handleSubmit}
                className=' max-w-md w-full ml-1 mr-1 border-[2px] p-4'>
                {/* pre-defined form for payment gateway */}
                <PaymentElement></PaymentElement>
                <button
                    type='submit' disabled={!stripe || !elements}
                    className=' w-full bg-yellow-500 p-2 rounded-lg mt-4 '>
                    Pay
                </button>
            </form>
        </div>
    )
}

export default CheckoutForm
