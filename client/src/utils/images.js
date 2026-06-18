import { BACKEND_URL } from '../services/api.js';

export const getImageUrl = (image) => {
  if (!image) return 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80';
  if (image.startsWith('http')) return image;
  return `${BACKEND_URL}${image}`;
};
