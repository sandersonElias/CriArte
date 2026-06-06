/**
 * views/components/ImageSlot.tsx
 *
 * Exibe a imagem real do produto (Firebase Storage) ou um placeholder
 * colorido enquanto não há imagem cadastrada.
 */

import type { FC } from 'react';

interface Props {
  imageUrl?: string; // URL do Firebase Storage
  placeholder: string; // texto do placeholder quando não há imagem
  alt?: string; // texto alternativo da imagem
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
