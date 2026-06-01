import type { FC } from 'react';

interface Props {
  placeholder: string;
  className?: string;
}

export const ImageSlot: FC<Props> = ({ placeholder, className }) => (
  <div className={`image-slot${className ? ` ${className}` : ''}`}>
    {placeholder}
  </div>
);
