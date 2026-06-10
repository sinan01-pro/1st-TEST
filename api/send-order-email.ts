import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customer_name, customer_email, customer_phone, customer_address, items, total_amount, order_id } = req.body;

  if (!customer_email || !customer_name || !items || !total_amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const itemsHtml = Array.isArray(items)
    ? items.map((item: any) => `<li>${item.name} - ৳${item.price} x ${item.quantity}</li>`).join('')
    : '<li>Order items</li>';

  const html = `
    <h2>Order Confirmation</h2>
    <p>Hi ${customer_name},</p>
    <p>Thank you for your purchase! Here are your order details:</p>
    <h3>Order Information</h3>
    <ul>
      <li><strong>Order ID:</strong> ${order_id}</li>
      <li><strong>Name:</strong> ${customer_name}</li>
      <li><strong>Email:</strong> ${customer_email}</li>
      <li><strong>Phone:</strong> ${customer_phone}</li>
      <li><strong>Address:</strong> ${customer_address}</li>
    </ul>
    <h3>Items</h3>
    <ul>
      ${itemsHtml}
    </ul>
    <h3>Total: ৳${total_amount}</h3>
    <p>We'll send you tracking info soon!</p>
    <p>Thanks for shopping with VELARO!</p>
  `;

  try {
    const data = await resend.emails.send({
      from: 'orders@velaro.com',
      to: customer_email,
      subject: `Order Confirmation - ${order_id}`,
      html: html,
    });

    await resend.emails.send({
      from: 'orders@velaro.com',
      to: process.env.BUSINESS_EMAIL || 'your-email@example.com',
      subject: `New Order - ${order_id} from ${customer_name}`,
      html: html,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}