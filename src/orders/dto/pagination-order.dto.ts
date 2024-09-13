import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrdersStatusList, OrderStatus } from '../enum/order.enum';

export class PaginationOrderDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, { message: 'status must be: ' + OrdersStatusList.join(', ') })
  status?: OrderStatus;
}
