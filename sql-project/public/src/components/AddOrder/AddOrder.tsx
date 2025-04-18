import styles from "./AddOrder.module.scss";
import logo from "../../assets/logo_he.png";
import Button from "../../components/Button/Button";
import useAddOrderVM from "./AddOrderVM";

const AddOrder = () => {
  const {
    clientId,
    handleBackClick,
    handleSubmit,
    formData,
    handleInputChange,
    materials,
    setMaterials,
    selectedMaterialId,
    setSelectedMaterialId,
    sticker_finish,
    set_sticker_finish,
    selected_sticker_finesh,
    set_selected_sticker_finesh,
    date,
    setDate,
  } = useAddOrderVM();

  return (
    <div className={styles.addOrder}>
      <div className={styles.addOrder_nav}>
        <button onClick={handleBackClick} className={styles.back}>
          ← חזור
        </button>

        <img src={logo} alt="לוגו" className={styles.logo} />
        <p>Welcome Back {clientId?.[0]?.client_name || "משתמש"}</p>
        <h2 className={styles.title}>הוספת הזמנה חדשה</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* <div className={styles.inputGroup}>
            <label htmlFor="client_id" className={styles.label}>מספר לקוח</label>
            <input
              className={styles.input}
              name="client_id"
              id="client_id"
              value={formData.client_id}
              onChange={handleInputChange}
              required
            />
          </div> */}

          {/* <div className={styles.inputGroup}>
            <label htmlFor="order_date" className={styles.label}>תאריך הזמנה</label>
            <input
              className={styles.input}
              name="order_date"
              id="order_date"
              type="date"
              value={formData.order_date}
              onChange={handleInputChange}
            />
          </div> */}

          <div className={styles.inputGroup}>
            <label htmlFor="delivery_date" className={styles.label}>
              למתי צריך את המדבקות?
            </label>
            <input
              className={styles.input}
              name="delivery_date"
              id="delivery_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="knives_id" className={styles.label}>
              מידת מדבקות
            </label>
            <input
              className={styles.input}
              name="knives_id" /* לשנות */
              id="knives_id"
              value={formData.knives_id}
              onChange={handleInputChange}
            />
          </div>

          {/* <div className={styles.inputGroup}>
            <label htmlFor="arrival_date" className={styles.label}>תאריך הגעה</label>
            <input
              className={styles.input}
              name="arrival_date"
              id="arrival_date"
              type="date"
              value={formData.arrival_date}
              onChange={handleInputChange}
            />
          </div> */}

          <div className={styles.inputGroup}>
            <label htmlFor="sticker_quantity" className={styles.label}>
              כמות מדבקות
            </label>
            <input
              className={styles.input}
              name="sticker_quantity"
              id="sticker_quantity"
              type="number"
              value={formData.sticker_quantity}
              onChange={handleInputChange}
            />
          </div>

          {/* <div className={styles.inputGroup}>
            <label htmlFor="engravings_id" className={styles.label}>תרצה צפוי מיוחד על המדבקות?</label>
            <input
              className={styles.input}
              name="engravings_id"
              id="engravings_id"
              value={formData.engravings_id}
              onChange={handleInputChange}
            />
          </div> */}

          <div className={styles.inputGroup}>
            <label htmlFor="sticker_finesh" className={styles.label}>
            תרצה צפוי על המדבקות?
            </label>
            <select onChange={(e) => set_selected_sticker_finesh(e.target.value)}>
              {sticker_finish.map((sf: any) => (
                <option
                  key={sf.sticker_finesh_id}
                  value={sf.sticker_finesh_id}
                >
                  {sf.sticker_finesh_description}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="materials_type" className={styles.label}>
              סוג חומר
            </label>
            <select onChange={(e) => setSelectedMaterialId(e.target.value)}>
              {materials.map((material: any) => (
                <option
                  key={material.materials_id}
                  value={material.materials_id}
                >
                  {material.material_description} - {material.material_width}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="praises" className={styles.label}>
              הערות
            </label>
            <input
              className={styles.input}
              name="praises"
              id="praises"
              value={formData.praises}
              onChange={handleInputChange}
            />
          </div>

          <button>הוסף הזמנה</button>
          {/* <Button type="submit" text="הוסף הזמנה" /> */}
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
