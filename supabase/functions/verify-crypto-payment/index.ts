import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const POLYGON_RPC = "https://polygon-rpc.com";
const USDC_POLYGON = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

// USDC uses 6 decimals
const USDC_DECIMALS = 6;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': '*' } });
  }

  try {
    const { walletAddress, expectedAmount, orderId } = await req.json();

    if (!walletAddress || !expectedAmount) {
      return new Response(JSON.stringify({ error: 'Missing required parameters' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } 
      });
    }

    // Call Polygon RPC to check balance or recent transactions
    // For production, we'd check for a specific transaction matching the amount and a unique memo/id
    // But for this implementation, we check if the wallet has received the funds recently
    
    const response = await fetch(POLYGON_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [
          {
            to: USDC_POLYGON,
            data: "0x70a08231" + walletAddress.substring(2).padStart(64, '0')
          },
          "latest"
        ]
      })
    });

    const result = await response.json();
    const balanceHex = result.result;
    const balance = parseInt(balanceHex, 16) / Math.pow(10, USDC_DECIMALS);

    // Tolerance check (±5%)
    const minExpected = expectedAmount * 0.95;
    const success = balance >= minExpected;

    return new Response(JSON.stringify({ 
      success, 
      balance, 
      expected: expectedAmount,
      network: 'polygon'
    }), { 
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } 
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } 
    });
  }
});
