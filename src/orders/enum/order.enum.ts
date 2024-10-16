export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  PAID = 'PAID',
}

export const OrdersStatusList = [OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING, OrderStatus.PAID];
