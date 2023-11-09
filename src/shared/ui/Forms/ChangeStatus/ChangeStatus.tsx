import React, { FC, useEffect, useState } from 'react';

import { OrderStatus as OrderStatusEnum } from 'entities/Order/types/order.statuses';
import classes from './ChangeStatus.module.scss';

type OrderStatus = typeof OrderStatusEnum[keyof typeof OrderStatusEnum];

interface StatusUpdaterProps {
    status: OrderStatus;
    onStatusChanged: (status: OrderStatus) => void;
}


export const ChangeStatusBtn: FC<StatusUpdaterProps> = ({status, onStatusChanged}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status);

  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  const handleStatusChange = () => {
    const statusValues = Object.values(OrderStatusEnum);
    const currentIndex = statusValues.indexOf(currentStatus);

    if (currentIndex < statusValues.length - 1) {
      const nextStatus = statusValues[currentIndex + 1] as OrderStatus;
      setCurrentStatus(nextStatus);
      onStatusChanged(nextStatus)
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as OrderStatus;
    setCurrentStatus(selectedStatus);
    onStatusChanged(selectedStatus)
  };

  return (
    <div className={classes.statusUpdaterContainer}>
      <select value={currentStatus} onChange={handleSelectChange} className={classes.statusSelect}>
        {Object.values(OrderStatusEnum).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button onClick={handleStatusChange} type="button" className={classes.changeStatusButton}>
        ➜
      </button>
    </div>
  );
};
