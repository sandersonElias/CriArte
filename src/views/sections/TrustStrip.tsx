import type { FC } from 'react';
import { TRUST_ITEMS } from '../../models/seedData';

export const TrustStrip: FC = () => (
  <section className="trust" aria-label="Diferenciais">
    {TRUST_ITEMS.map(({ ico, t, d }) => (
      <div className="trust__item" key={t}>
        <div className="trust__ico" aria-hidden="true">
          {ico}
        </div>
        <div>
          <div className="trust__title">{t}</div>
          <div className="trust__desc">{d}</div>
        </div>
      </div>
    ))}
  </section>
);
