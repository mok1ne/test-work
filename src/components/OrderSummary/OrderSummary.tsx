import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { SelectedService } from '../../types';
import { SelectedServiceItem } from '../SelectedServiceItem/SelectedServiceItem';
import styles from './OrderSummary.module.scss';

interface OrderSummaryProps {
  selectedServices: SelectedService[];
  totalAmount: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedServices,
  totalAmount,
  onRemove,
  onUpdateQuantity,
  onCheckout
}) => {
  if (selectedServices.length === 0) {
    return (
      <div className={styles.summary}>
        <div className={styles.header}>
          <ShoppingCart style={{ color: '#9ca3af' }} />
          <h2 className={styles.title}>Корзина</h2>
        </div>
        <p className={styles.emptyState}>
          Корзина пуста. Добавьте услуги для оформления заказа.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <ShoppingCart style={{ color: '#2563eb' }} />
        <h2 className={styles.title}>Итого</h2>
      </div>

      <div className={styles.servicesList}>
        {selectedServices.map((service) => (
          <SelectedServiceItem
            key={service.id}
            service={service}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>Общая сумма:</span>
        <span className={styles.totalAmount}>
          {totalAmount.toLocaleString('ru-RU')} ₽
        </span>
      </div>

      <button onClick={onCheckout} className={styles.checkoutButton}>
        Оформить заказ
      </button>
    </div>
  );
};