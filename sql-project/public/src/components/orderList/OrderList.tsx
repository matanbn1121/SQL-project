import React from "react";
import styles from "./orderList.module.scss";

export interface Order {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  knives_id: string;
  engravings_id: string;
  sticker_id: string;
  arrival_date: string;
  sticker_quantity: string;
  knives_quantity: string;
  materials_type: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className={styles.orderList}>
      <div className={styles.listContainer}>
        <h3 className={styles.listTitle}>רשימת הזמנות</h3>

        {orders.length === 0 ? (
          <p className={styles.emptyMessage}>אין הזמנות להצגה.</p>
        ) : (
          <ul className={styles.orderItems}>
            {orders.map((order) => (
              <li key={order.order_id} className={styles.orderItem}>
                <div><strong>מס' הזמנה:</strong> {order.order_id}</div>
                <div><strong>מס' לקוח:</strong> {order.client_id}</div>
                <div><strong>תאריך הזמנה:</strong> {order.order_date}</div>
                <div><strong>תאריך משלוח:</strong> {order.delivery_date}</div>
                <div><strong>שבח:</strong> {order.praises}</div>
                <div><strong>מס' סכין:</strong> {order.knives_id}</div>
                <div><strong>מס' חריטה:</strong> {order.engravings_id}</div>
                <div><strong>מס' מדבקה:</strong> {order.sticker_id}</div>
                <div><strong>תאריך הגעה:</strong> {order.arrival_date}</div>
                <div><strong>כמות מדבקות:</strong> {order.sticker_quantity}</div>
                <div><strong>כמות סכינים:</strong> {order.knives_quantity}</div>
                <div><strong>סוג חומר:</strong> {order.materials_type}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderList;
