import type { FC } from 'react';
import type { FSSettings } from '../../models/FirestoreModels';

interface Props {
  settings: FSSettings;
}

export const WhatsAppFloat: FC<Props> = ({ settings }) => {
  const url = `https://wa.me/${settings.waNumber}?text=${encodeURIComponent(
    'Olá! Tenho interesse em uma peça da CRI Artes.',
  )}`;

  return (
    <a
      className="wa-float"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="wa-float__ico" aria-hidden="true">
        W
      </span>
      Falar pelo WhatsApp
    </a>
  );
};
