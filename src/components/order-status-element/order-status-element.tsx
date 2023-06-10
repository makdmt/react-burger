import React, { FC } from "react";
import { TOrderStatus, TOrderStatusCorrelation, TOrderStatusColors } from "../../services/types/data";


export const OrderStatusElement: FC<{ status: TOrderStatus, extraClass?: string | undefined }> = ({ status, extraClass = undefined }) => {

  const statuses: TOrderStatusCorrelation = {
    done: ['Выполнен', 'white'],
    created: ['Готовится', '#00CCCC'],
    canceled: ['Отменен', 'red'],
    default: ['Не определен', '#8585AD']
  }

  const checkedStatus = React.useMemo<TOrderStatus>(() => {
    if (statuses.hasOwnProperty(status)) {
      return status;
    } else {
      return 'default';
    }
  }, [status])


  return (
    <p style={{ color: statuses[checkedStatus][1] }} className={`text text_type_main-default ${extraClass}`}>{statuses[checkedStatus][0]}</p>
  )
}
