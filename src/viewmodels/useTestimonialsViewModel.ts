import { TESTIMONIALS } from '../models/seedData';
import { useSlider } from '../hooks/useSlider';

export function useTestimonialsViewModel() {
  const slider = useSlider(TESTIMONIALS.length);
  return { slides: TESTIMONIALS, ...slider };
}
