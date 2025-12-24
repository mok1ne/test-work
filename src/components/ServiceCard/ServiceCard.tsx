import React from 'react';
import { Plus } from 'lucide-react';
import { Service } from '../../types';
import styles from './ServiceCard.module.scss';

interface ServiceCardProps {
  service: Service;
  onAdd: (service: Service) => void;
  isAdded: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAdd, isAdded }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{service.name}</h3>
        {service.description && (
          <p className={styles.description}>{service.description}</p>
        )}
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>
          {service.price.toLocaleString('ru-RU')} ₽
        </span>
        <button
          onClick={() => onAdd(service)}
          disabled={isAdded}
          className={styles.button}
        >
          <Plus />
          {isAdded ? 'Добавлено' : 'Добавить'}
        </button>
      </div>
    </div>
  );
};