import React, { useState } from "react";
import styles from "./EditOrder.module.scss"; // ודא שהקובץ הזה קיים

interface OrderFormData {
  order_id: string;
  client_id: string;
  order_date: string;
  delivery_date: string;
  praises: string;
  sticker_quantity: string;
  materials_type: string;
  knives_id?: string;
  engravings_id?: string;
  sticker_id?: string;
  arrival_date?: string;
  knives_quantity?: string;
}

interface Props {
  order: OrderFormData;
  onCancel: () => void;
  onSave: (updated: OrderFormData) => void;
}

const EditOrderForm = ({ order, onCancel, onSave }: Props) => {
  const [formData, setFormData] = useState<OrderFormData>(order);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        <input
          name="materials_type"
          value={formData.materials_type}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>שמור</button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>ביטול</button>
      </div>
    </form>
  );
};

export default EditOrderForm;
