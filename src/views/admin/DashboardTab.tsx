import { useState, useEffect, type FC } from 'react';
import { fetchCollection } from '../../services/firestoreService';

interface Counts {
  products: number;
  categories: number;
  testimonials: number;
  faq: number;
}

export const DashboardTab: FC = () => {
  const [counts, setCounts] = useState<Counts>({
    products: 0,
    categories: 0,
    testimonials: 0,
    faq: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCollection('products'),
      fetchCollection('categories'),
      fetchCollection('testimonials'),
      fetchCollection('faq'),
    ]).then(([p, c, t, f]) => {
      setCounts({
        products: p.length,
        categories: c.length,
        testimonials: t.length,
        faq: f.length,
      });
      setLoading(false);
    });
  }, []);

  const cards = [
    {
      label: 'Produtos',
      value: counts.products,
      icon: 'ti-package',
      color: 'teal',
    },
    {
      label: 'Categorias',
      value: counts.categories,
      icon: 'ti-category',
      color: 'purple',
    },
    {
      label: 'Depoimentos',
      value: counts.testimonials,
      icon: 'ti-quote',
      color: 'coral',
    },
    {
      label: 'Perguntas',
      value: counts.faq,
      icon: 'ti-help-circle',
      color: 'amber',
    },
  ];

  return (
    <div className="adm-dashboard">
      <p className="adm-dashboard__hello">
        Bem-vindo ao painel de controle da CRI Artes. Edite os dados e eles
        aparecem no site automaticamente, em tempo real.
      </p>

      <div className="adm-stat-grid">
        {cards.map(({ label, value, icon, color }) => (
          <div key={label} className={`adm-stat adm-stat--${color}`}>
            <i className={`ti ${icon} adm-stat__ico`} aria-hidden="true" />
            <div className="adm-stat__val">{loading ? '—' : value}</div>
            <div className="adm-stat__lbl">{label}</div>
          </div>
        ))}
      </div>

      <div className="adm-info-box">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <div>
          <strong>Como funciona?</strong>
          <p>
            Todos os dados ficam no Firebase Firestore. O site CRI Artes lê
            essas informações em tempo real — qualquer alteração feita aqui
            aparece no site em menos de 1 segundo, sem precisar fazer deploy ou
            recarregar a página.
          </p>
        </div>
      </div>
    </div>
  );
};
