export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const OrdersStatusList = [OrderStatus.CANCELLED, OrderStatus.DELIVERED, OrderStatus.PENDING];
