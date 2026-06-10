import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customer_name, customer_email, customer_phone, customer_address, items, total_amount } = req.body;

  if (!customer_name || !customer_email || !customer_phone || !customer_address || !items || !total_amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([{ customer_name, customer_email, customer_phone, customer_address, items, total_amount }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ order: data });
}