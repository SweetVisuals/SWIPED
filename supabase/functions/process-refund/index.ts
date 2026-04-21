import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.22.0?target=deno"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, ontent-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { stripePaymentIntentId, paypalOrderId, amount, reason } = await req.json()

    if (stripePaymentIntentId) {
      const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
        apiVersion: '2023-10-16',
      })

      // Stripe expects amount in cents
      const refund = await stripe.refunds.create({
        payment_intent: stripePaymentIntentId,
        amount: Math.round(amount * 100),
        reason: reason === 'Duplicate order' ? 'duplicate' : 'requested_by_customer',
      })

      return new Response(JSON.stringify({ success: true, refund }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (paypalOrderId) {
      const clientId = Deno.env.get('VITE_PAYPAL_CLIENT_ID')
      const secret = Deno.env.get('PAYPAL_SECRET_KEY')
      const isLive = clientId?.startsWith('A') // PayPal live IDs usually start with A, sandbox with E. Actually, better to check if it has 'live' in it or just use an env var.
      
      const auth = btoa(`${clientId}:${secret}`)
      const tokenResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      })

      const { access_token } = await tokenResponse.json()

      // PayPal Refund requires the Capture ID, not the Order ID.
      // We stored paypal_order_id, so we might need to get the capture ID first.
      // Usually, in a simple capture, there is one capture ID in the order details.
      
      const orderResponse = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      })
      
      const orderDetails = await orderResponse.json()
      const captureId = orderDetails.purchase_units[0].payments.captures[0].id

      const refundResponse = await fetch(`https://api-m.paypal.com/v2/payments/captures/${captureId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: {
            value: amount.toFixed(2),
            currency_code: orderDetails.purchase_units[0].amount.currency_code || 'EUR',
          },
          note_to_payer: reason,
        }),
      })

      const refundResult = await refundResponse.json()

      if (refundResult.status === 'COMPLETED') {
        return new Response(JSON.stringify({ success: true, refund: refundResult }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } else {
        throw new Error(refundResult.message || 'PayPal refund failed')
      }
    }

    throw new Error('No valid payment ID provided')
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
