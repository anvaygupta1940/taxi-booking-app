"use client"
import CheckoutForm from '@/components/Payment/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const page = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any);
    const options: any = {
        mode: 'payment',
        amount: 199,
        currency: 'usd'
    }
    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm></CheckoutForm>
        </Elements>
    )
}

export default page
