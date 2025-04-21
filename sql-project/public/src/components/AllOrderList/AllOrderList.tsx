import React from "react";
import styles from "./AllOrderList.module.scss";
import useOrderListVM from "./AllOrderListVM";

// export interface Order {
//   order_id: string;
//   client_id: string;
//   order_date: string;
//   delivery_date: string;
//   order_feedback: string;
//   knives_id: string;
//   engravings_id: string;
//   sticker_id: string;
//   arrival_date: string;
//   order_sticker_quantity: string;
//   knives_quantity: string;
//   material_description: string;
// }
// interface OrderListProps {
//   orders: Order[];
// }

const AllOrderList: React.FC = () => {
  const { formData } = useOrderListVM(); // עכשיו formData הוא מערך
  console.log("orders is:")
  console.log(formData)
  
  return (
    <div className={styles.orderList}>
      <div className={styles.listContainer}>
        <h3 className={styles.listTitle}>רשימת כל ההזמנות</h3>

        {formData.length === 0 ? (
          <p className={styles.emptyMessage}>אין הזמנות להצגה.</p>
        ) : (
          <ul className={styles.orderItems}>
            {formData.map((order) => (
              <li key={order.order_id} className={styles.orderItem}>
                <div><strong>מס' הזמנה:</strong> {order.order_id}</div>
                <div><strong>מס' לקוח:</strong> {order.client_id}</div>
                <div>
                  <strong>תאריך הזמנה:</strong>{" "}
                  {new Date(order.order_date).toLocaleDateString("he-IL")}
                </div>
                <div>
                  <strong>תאריך אספקה:</strong>{" "}
                  {new Date(order.delivery_date).toLocaleDateString("he-IL")}
                </div>
                <div><strong>ביקורת על ההזמנה:</strong> {order.praises}</div>
                <div><strong>כמות מדבקות:</strong> {order.sticker_quantity}</div>
                <div><strong>סוג חומר:</strong> {order.materials_type}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


export default AllOrderList;
