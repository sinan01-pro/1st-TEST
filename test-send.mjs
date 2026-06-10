import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

(async () => {
  try {
    const res = await resend.emails.send({
      from: 'orders@velaro.com',
      to: 'sinangtp01@gmail.com',
      subject: 'Test Order - test-1234',
      html: `<h1>Test order</h1><p>This is a test.</p>`,
    });
    console.log('Sent:', res);
  } catch (err) {
    console.error('Send error:', err);
  }
})();