import type { FC } from 'react';
import { waLink } from '../../utils/whatsapp';

export const WhatsAppFloat: FC = () => (
  <a
    className="wa-float"
    href={waLink('Olá! Tenho interesse em uma peça da CRI Artes.')}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="wa-float__ico" aria-hidden="true">
      W
    </span>
    Falar pelo WhatsApp
  </a>
);
