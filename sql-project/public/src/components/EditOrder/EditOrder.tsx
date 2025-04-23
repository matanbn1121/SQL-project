import React, { useState } from "react";
import styles from "./EditOrder.module.scss";

interface OrderFormData {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  sticker_quantity: string;
  materials_id: string; // 🟢 שם מתוקן
}

interface Props {
  order: OrderFormData;
  onCancel: () => void;
  onSave: (updated: OrderFormData) => void;
}

const EditOrderForm = ({ order, onCancel, onSave }: Props) => {
  const [formData, setFormData] = useState<OrderFormData>(order);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label>תאריך הזמנה:</label>
        <input
          type="date"
          name="order_date"
          value={formData.order_date.split("T")[0]}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>תאריך אספקה:</label>
        <input
          type="date"
          name="delivery_date"
          value={formData.delivery_date.split("T")[0]}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>ביקורת על ההזמנה:</label>
        <input
          name="praises"
          value={formData.praises}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>כמות מדבקות:</label>
        <input
          name="sticker_quantity"
          value={formData.sticker_quantity}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>סוג חומר:</label>
        <select
          name="materials_id"
          value={formData.materials_id}
          onChange={handleChange}
        >
          <option value="">בחר חומר</option>
          <option value="1">Paper</option>
          <option value="2">Plastic</option>
          <option value="3">Metal</option>
        </select>
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>שמור</button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>ביטול</button>
      </div>
    </form>
  );
};

export default EditOrderForm;
