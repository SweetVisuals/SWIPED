import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@11.1.0?target=deno"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', { apiVersion: '2022-11-15' })
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

  let event
  try {
    const body = await req.text()
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret!)
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object
      const email = subscription.customer_email || subscription.metadata.email
      
      // Get Profile ID from Email
      const { data: profile } = await supabase.from('profiles').select('id').eq('email', email).single()
      
      if (profile) {
        // Find existing non-cancelled subscription to update or insert
        const { error: upsertError } = await supabase.from('subscriptions').upsert({
          profile_id: profile.id,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
          status: subscription.status,
          interval: subscription.metadata.interval || (subscription.items.data[0].plan.interval === 'month' ? 'monthly' : 'fortnightly'),
          total: subscription.items.data[0].plan.amount / 100,
          next_delivery_date: new Date(subscription.current_period_end * 1000).toISOString()
        })
        
        if (upsertError) console.error('Upsert subscription error:', upsertError)
      }
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('stripe_subscription_id', subscription.id)
      break
    }
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      const email = paymentIntent.receipt_email || paymentIntent.metadata.email
      
      // Update order status and store payment ID
      await supabase
        .from('orders')
        .update({ 
          status: 'processed', 
          stripe_payment_intent_id: paymentIntent.id 
        })
        .eq('customer_email', email)
        .eq('status', 'pending');
      break
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})
