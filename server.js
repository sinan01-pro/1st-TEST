import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

dotenv.config({ path: '.env.local' });

const PORT = process.env.PORT || 3001;

if (!process.env.GMAIL_USER) {
  console.error('Missing GMAIL_USER in environment');
  process.exit(1);
}
if (!process.env.GMAIL_CLIENT_ID) {
  console.error('Missing GMAIL_CLIENT_ID in environment');
  process.exit(1);
}
if (!process.env.GMAIL_CLIENT_SECRET) {
  console.error('Missing GMAIL_CLIENT_SECRET in environment');
  process.exit(1);
}
if (!process.env.GMAIL_REFRESH_TOKEN) {
  console.error('Missing GMAIL_REFRESH_TOKEN in environment');
  process.exit(1);
}
if (!process.env.BUSINESS_EMAIL) {
  console.error('Missing BUSINESS_EMAIL in environment');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: async () => {
      const { token } = await oauth2Client.getAccessToken();
      return token;
    },
  },
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json());

app.post('/api/send-order-email', async (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    items,
    total_amount,
    order_id,
  } = req.body || {};

  if (!customer_name || !customer_email || !order_id) {
    return res.status(400).json({ error: 'Missing required fields: customer_name, customer_email, order_id' });
  }

  const itemsHtml = Array.isArray(items)
    ? items.map(item => `<li>${item.name} - ৳${item.price} x ${item.quantity}</li>`).join('')
    : '<li>(no items)</li>';

  const html = `
    <h2>Order Confirmation</h2>
    <p>Hi ${customer_name},</p>
    <p>Thank you for your purchase! Here are your order details:</p>
    <ul>
      <li><strong>Order ID:</strong> ${order_id}</li>
      <li><strong>Name:</strong> ${customer_name}</li>
      <li><strong>Email:</strong> ${customer_email}</li>
      <li><strong>Phone:</strong> ${customer_phone || 'N/A'}</li>
      <li><strong>Address:</strong> ${customer_address || 'N/A'}</li>
    </ul>
    <h3>Items</h3>
    <ul>${itemsHtml}</ul>
    <h3>Total: ৳${total_amount ?? '0'}</h3>
  `;

  try {
    console.log('send-order-email request body:', {
      customer_name,
      customer_email,
      order_id,
      total_amount,
      items_length: Array.isArray(items) ? items.length : 0,
    });

    const customerInfo = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: customer_email,
      subject: `Order Confirmation - ${order_id}`,
      html,
    });
    console.log('Gmail customerInfo:', customerInfo);

    const businessInfo = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: `New Order - ${order_id}`,
      html,
    });
    console.log('Gmail businessInfo:', businessInfo);

    return res.json({ success: true, customerInfo, businessInfo });
  } catch (error) {
    console.error('send-order-email error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: (error && error.message) || String(error) });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));