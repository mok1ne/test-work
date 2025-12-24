import React, { useState, useMemo } from 'react';
import { Service, SelectedService } from './types';
import { MOCK_SERVICES } from './data/mockServices';
import { ServiceCard } from './components/ServiceCard/ServiceCard';
import { OrderSummary } from './components/OrderSummary/OrderSummary';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  const handleAddService = (service: Service) => {
    setSelectedServices((prev) => {
      const existing = prev.find((s) => s.id === service.id);
      if (existing) {
        return prev.map((s) =>
          s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const handleRemoveService = (id: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setSelectedServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quantity } : s))
    );
  };

  const handleCheckout = () => {
    alert(
      `Заказ оформлен!\n\nУслуги:\n${selectedServices
        .map((s) => `- ${s.name} x${s.quantity} = ${(s.price * s.quantity).toLocaleString('ru-RU')} ₽`)
        .join('\n')}\n\nИтого: ${totalAmount.toLocaleString('ru-RU')} ₽`
    );
  };

  const totalAmount = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price * s.quantity, 0),
    [selectedServices]
  );

  const isServiceAdded = (serviceId: string) =>
    selectedServices.some((s) => s.id === serviceId);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>Салон красоты</h1>
          <p className={styles.headerSubtitle}>Выберите услуги</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.servicesSection}>
            <h2>Наши услуги</h2>
            <div className={styles.servicesGrid}>
              {MOCK_SERVICES.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onAdd={handleAddService}
                  isAdded={isServiceAdded(service.id)}
                />
              ))}
            </div>
          </div>

          <div>
            <OrderSummary
              selectedServices={selectedServices}
              totalAmount={totalAmount}
              onRemove={handleRemoveService}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;