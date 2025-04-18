import React from "react";
import styles from "./orderList.module.scss";

export interface Order {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  order_feedback: string;
  knives_id: string;
  engravings_id: string;
  sticker_id: string;
  arrival_date: string;
  order_sticker_quantity: string;
  knives_quantity: string;
  material_description: string;
}
interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className={styles.orderList}>
      <div className={styles.listContainer}>
        <h3 className={styles.listTitle}>רשימת כל ההזמנות</h3>

        {orders.length === 0 ? (
          <p className={styles.emptyMessage}>אין הזמנות להצגה.</p>
        ) : (
          <ul className={styles.orderItems}>
            {orders.map((order) => (
              <li key={order.order_id} className={styles.orderItem}>
                <div><strong>מס' הזמנה:</strong> {order.order_id}</div>
                <div><strong>מס' לקוח:</strong> {order.client_id}</div>
                <div>
                  <strong>תאריך הזמנה:</strong>
                  {" "}{new Date(order.order_date).toLocaleDateString("he-IL")}
                  </div>

                <div>
                  <strong>תאריך אספקה:</strong>
                  {" "}{new Date(order.delivery_date).toLocaleDateString("he-IL")}
                </div>

                <div><strong>ביקורת על ההזמנה:</strong> {order.order_feedback}</div>
                {/* <div><strong>מס' סכין:</strong> {order.knives_id}</div>
                <div><strong>מס' חריטה:</strong> {order.engravings_id}</div>
                <div><strong>מס' מדבקה:</strong> {order.sticker_id}</div> */}
                <div><strong>כמות מדבקות:</strong> {order.order_sticker_quantity}</div>
                <div><strong>סוג חומר:</strong> {order.material_description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderList;
