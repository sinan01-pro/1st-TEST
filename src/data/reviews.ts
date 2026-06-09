import type { Review } from '@/types';

export const reviews: Review[] = [
  { id: 1, productId: 1, name: 'Rafiq Hossain', rating: 5, date: '2025-05-15', text: 'The quality of the oversized tees is unmatched. I\'ve never felt fabric this premium at this price point in Bangladesh. Will definitely buy again!', verified: true, location: 'Dhaka' },
  { id: 2, productId: 1, name: 'Tanvir Ahmed', rating: 5, date: '2025-05-10', text: 'Fast delivery to Dhaka, and the shirt fits perfectly. VELARO has become my go-to for casual wear. The 240gsm cotton is no joke.', verified: true, location: 'Chittagong' },
  { id: 3, productId: 1, name: 'Saiful Islam', rating: 4, date: '2025-04-28', text: 'Great quality but sizing runs a bit large. Ordered an M and had to exchange for S. Exchange process was smooth though.', verified: true, location: 'Sylhet' },
  { id: 4, productId: 3, name: 'Naimur Rahman', rating: 5, date: '2025-05-20', text: 'Finally, a polo shirt that looks expensive but doesn\'t break the bank. The mother-of-pearl buttons are a nice touch.', verified: true, location: 'Dhaka' },
  { id: 5, productId: 3, name: 'Kamrul Hasan', rating: 5, date: '2025-05-18', text: 'Customer service was exceptional. They helped me pick the right size and the delivery was seamless.', verified: true, location: 'Rajshahi' },
  { id: 6, productId: 5, name: 'Fahim Shahriar', rating: 5, date: '2025-05-12', text: 'I\'ve ordered three times now. Consistent quality every single time. Highly recommended for formal wear.', verified: true, location: 'Dhaka' },
  { id: 7, productId: 7, name: 'Imran Hossain', rating: 5, date: '2025-05-08', text: 'The cargo pants are incredible. Perfect fit, durable fabric, and the pockets are actually functional. Worth every taka.', verified: true, location: 'Khulna' },
  { id: 8, productId: 9, name: 'Arif Khan', rating: 4, date: '2025-04-30', text: 'Good jeans but took a while to break in. Now they fit like a glove. The dark wash is exactly what I wanted.', verified: true, location: 'Chittagong' },
  { id: 9, productId: 11, name: 'Mahmudul Hasan', rating: 5, date: '2025-05-22', text: 'The watch exceeded my expectations. Looks like it costs 10x more than what I paid. The chronograph functions work perfectly.', verified: true, location: 'Dhaka' },
  { id: 10, productId: 13, name: 'Sakib Rahman', rating: 5, date: '2025-05-05', text: 'Best wallet I\'ve owned. The leather quality is outstanding and the RFID blocking gives me peace of mind.', verified: true, location: 'Sylhet' },
  { id: 11, productId: 15, name: 'Rakib Islam', rating: 4, date: '2025-04-25', text: 'Great sunglasses for the price. Polarized lenses work well in the Bangladeshi sun. Comfortable to wear all day.', verified: true, location: 'Barisal' },
  { id: 12, productId: 7, name: 'Shahin Alam', rating: 5, date: '2025-05-19', text: 'These cargo pants are a game changer. Perfect for both casual outings and light outdoor work. Very comfortable.', verified: true, location: 'Rangpur' },
];

export const testimonials = [
  { id: 1, name: 'Rafiq Hossain', rating: 5, date: '2025-05-15', text: 'The quality of the oversized tees is unmatched. I\'ve never felt fabric this premium at this price point in Bangladesh.', verified: true, location: 'Dhaka' },
  { id: 2, name: 'Tanvir Ahmed', rating: 5, date: '2025-05-10', text: 'Fast delivery to Dhaka, and the shirt fits perfectly. VELARO has become my go-to for formal wear.', verified: true, location: 'Chittagong' },
  { id: 3, name: 'Saiful Islam', rating: 5, date: '2025-04-28', text: 'The watch exceeded my expectations. Looks like it costs 10x more than what I paid.', verified: true, location: 'Sylhet' },
  { id: 4, name: 'Naimur Rahman', rating: 5, date: '2025-05-20', text: 'Finally, a Bangladeshi brand that understands modern menswear. The cargo pants are incredible.', verified: true, location: 'Dhaka' },
  { id: 5, name: 'Kamrul Hasan', rating: 5, date: '2025-05-18', text: 'Customer service was exceptional. They helped me pick the right size and the delivery was seamless.', verified: true, location: 'Rajshahi' },
  { id: 6, name: 'Fahim Shahriar', rating: 5, date: '2025-05-12', text: 'I\'ve ordered three times now. Consistent quality every single time. Highly recommended.', verified: true, location: 'Dhaka' },
];

export const getProductReviews = (productId: number): Review[] => {
  return reviews.filter(r => r.productId === productId);
};
