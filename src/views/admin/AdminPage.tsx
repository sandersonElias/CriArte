import { useState, type FC } from 'react';
import { AdminLayout, type AdminTab } from './AdminLayout';
import { DashboardTab } from './DashboardTab';
import { ProductsTab } from './ProductsTab';
import { CategoriesTab } from './CategoriesTab';
import { TestimonialsTab } from './TestimonialsTab';
import { FaqTab } from './FaqTab';
import { SettingsTab } from './SettingsTab';

export const AdminPage: FC = () => {
  const [tab, setTab] = useState<AdminTab>('dashboard');

  const content: Record<AdminTab, JSX.Element> = {
    dashboard: <DashboardTab />,
    products: <ProductsTab />,
    categories: <CategoriesTab />,
    testimonials: <TestimonialsTab />,
    faq: <FaqTab />,
    settings: <SettingsTab />,
  };

  return (
    <AdminLayout activeTab={tab} onTabChange={setTab}>
      {content[tab]}
    </AdminLayout>
  );
};
