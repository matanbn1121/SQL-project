import styles from "./AddOrder.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import useAddOrderVM from "./AddOrderVM";

const AddOrder = () => {
  const {
    handleBackClick,
    handleSubmit,
    formData,
    handleInputChange,
  } = useAddOrderVM();

  return (
    <div className={styles.addOrder}>
      <div className={styles.addOrder_nav}>
        <button onClick={handleBackClick} className={styles.back}>
          ← חזור
        </button>

        <img src={logo} alt="logo" className={styles.logo} />
        <h2 className={styles.title}>הוספת הזמנה חדשה</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="client_id" className={styles.label}>מספר לקוח</label>
            <input
              className={styles.input}
              name="client_id"
              id="client_id"
              value={formData.client_id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="order_date" className={styles.label}>תאריך הזמנה</label>
            <input
              className={styles.input}
              name="order_date"
              id="order_date"
              type="date"
              value={formData.order_date}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="delivery_date" className={styles.label}>תאריך אספקה</label>
            <input
              className={styles.input}
              name="delivery_date"
              id="delivery_date"
              type="date"
              value={formData.delivery_date}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="praises" className={styles.label}>הערות</label>
            <input
              className={styles.input}
              name="praises"
              id="praises"
              value={formData.praises}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="knives_id" className={styles.label}>מזהה סכין</label>
            <input
              className={styles.input}
              name="knives_id"
              id="knives_id"
              value={formData.knives_id}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="engravings_id" className={styles.label}>מזהה חריטה</label>
            <input
              className={styles.input}
              name="engravings_id"
              id="engravings_id"
              value={formData.engravings_id}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="sticker_id" className={styles.label}>מזהה מדבקה</label>
            <input
              className={styles.input}
              name="sticker_id"
              id="sticker_id"
              value={formData.sticker_id}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="arrival_date" className={styles.label}>תאריך הגעה</label>
            <input
              className={styles.input}
              name="arrival_date"
              id="arrival_date"
              type="date"
              value={formData.arrival_date}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="sticker_quantity" className={styles.label}>כמות מדבקות</label>
            <input
              className={styles.input}
              name="sticker_quantity"
              id="sticker_quantity"
              type="number"
              value={formData.sticker_quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="knives_quantity" className={styles.label}>כמות סכינים</label>
            <input
              className={styles.input}
              name="knives_quantity"
              id="knives_quantity"
              type="number"
              value={formData.knives_quantity}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="materials_type" className={styles.label}>סוג חומר</label>
            <input
              className={styles.input}
              name="materials_type"
              id="materials_type"
              value={formData.materials_type}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" text="הוסף הזמנה" />
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
