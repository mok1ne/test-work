import React from 'react';
import { Trash2 } from 'lucide-react';
import { SelectedService } from '../../types';
import styles from './SelectedServiceItem.module.scss';

interface SelectedServiceItemProps {
  service: SelectedService;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const SelectedServiceItem: React.FC<SelectedServiceItemProps> = ({
  service,
  onRemove,
  onUpdateQuantity
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <h4 className={styles.name}>{service.name}</h4>
        <p className={styles.price}>
          {service.price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className={styles.actions}>
        <div className={styles.quantityControl}>
          <button
            onClick={() => onUpdateQuantity(service.id, service.quantity - 1)}
            disabled={service.quantity <= 1}
            className={styles.quantityButton}
          >
            −
          </button>
          <span className={styles.quantity}>{service.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(service.id, service.quantity + 1)}
            className={styles.quantityButton}
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(service.id)}
          className={styles.removeButton}
          aria-label="Удалить услугу"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
};
