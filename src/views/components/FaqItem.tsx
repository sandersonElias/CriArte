import type { FC } from 'react';
import type { FSFaqItem } from '../../models/FirestoreModels';

interface Props {
  item: FSFaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqItem: FC<Props> = ({ item, isOpen, onToggle }) => (
  <div className="faq-item">
    <div
      className="faq-item__q"
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
    >
      {item.q}
      <span
        className={`faq-item__icon${isOpen ? ' faq-item__icon--open' : ''}`}
        aria-hidden="true"
      >
        +
      </span>
    </div>
    {isOpen && <p className="faq-item__a">{item.a}</p>}
  </div>
);
