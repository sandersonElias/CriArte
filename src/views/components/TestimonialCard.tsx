import type { FC } from 'react';
import type { Testimonial } from '../../models/Testimonial';

interface Props {
  testimonial: Testimonial;
}

export const TestimonialCard: FC<Props> = ({ testimonial }) => {
  const { initials, name, location, text } = testimonial;

  return (
    <div className="tcard">
      <div className="tcard__stars" aria-label="5 estrelas">
        ★★★★★
      </div>
      <p className="tcard__text">"{text}"</p>
      <div className="tcard__who">
        <div className="tcard__avatar" aria-hidden="true">
          {initials}
        </div>
        <div>
          <div className="tcard__name">{name}</div>
          <div className="tcard__loc">{location}</div>
        </div>
      </div>
    </div>
  );
};
