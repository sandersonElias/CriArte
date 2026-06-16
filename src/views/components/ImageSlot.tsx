import type { FC } from 'react';

interface Props {
  imageUrl?: string;
  placeholder: string;
  alt?: string;
  className?: string;
}

export const ImageSlot: FC<Props> = ({
  imageUrl,
  placeholder,
  alt,
  className,
}) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={alt ?? placeholder}
        className={`image-real${className ? ` ${className}` : ''}`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`image-slot${className ? ` ${className}` : ''}`}>
      {placeholder}
    </div>
  );
};
