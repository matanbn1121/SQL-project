import React, { useState } from "react";
import styles from "./orderList.module.scss";
import useOrderListVM from "./OrderListVM";
import EditOrderForm from "../../components/EditOrder/EditOrder"; // ודא שזה הנתיב הנכון אצלך

const OrderList: React.FC = () => {
  const { formData, deleteOrder, updateOrder } = useOrderListVM();
  const [editingId, setEditingId] = useState<string | null>(null);

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
                {editingId === order.order_id ? (
          <EditOrderForm
          order={order}
          onCancel={() => setEditingId(null)}
          onSave={(updatedOrder) => {
            updateOrder(updatedOrder); 
            setEditingId(null);
          }}
        />
                ) : (
                  <>
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
                    <button onClick={() => setEditingId(order.order_id)}>ערוך</button>
                    <button onClick={() => deleteOrder(order.order_id)}>מחק</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderList;