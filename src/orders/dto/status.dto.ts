import { IsEnum } from 'class-validator';
import { OrdersStatusList, OrderStatus } from '../enum/order.enum';

export class StatusDto {
  @IsEnum(OrdersStatusList, { message: 'status must be: ' + OrdersStatusList.join(', ') })
  status: OrderStatus;
}
