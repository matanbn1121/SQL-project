import React, { useEffect, useState } from "react";

const Orders = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [date, setDate] = useState("");

  function test(){
    alert("hey")
  }

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/fetchMaterials"
        );
        if (!response.ok) throw new Error("Failed to fetch materials");

        const data = await response.json();
        setMaterials(data.result);
        console.log("Materials list:", data.result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div>
      <div>
        <h2>פה נציג את ההזמנות שקיימות לאותו לקוח כולל סטטוס שלהם</h2>
      </div>
      <div style={{ padding: "20px" }}>
        <h1>הזמנות + יצירת הזמנות</h1>
        <form action="" onSubmit={test}>
          <p>מידות המדבקות:</p>
          <select name="stikers" id="stikers_id">
            <option value="small">40X20</option>
            <option value="medium">120X300</option>
            <option value="large">85X90</option>
          </select>

          <p>בחירת חומר גלם</p>
          <select onChange={(e) => setSelectedMaterialId(e.target.value)}>
            {materials.map((material: any) => (
              <option key={material.materials_id} value={material.materials_id}>
                  {material.material_description} - {material.material_width}
              </option>
            ))}
          </select>

          <p>כמות מדבקות</p>
          <input type="number" name="" id="" />

          <p>השבחות:</p>
          <select name="materials" id="materials_id">
            <option value="paper">לכה מבריקה</option>
            <option value="plastic">לכה מט </option>
            <option value="metal">למינציה מט</option>
          </select>

          <p>מועד אספקה</p>
          <input type="date" onChange={(e) => setDate(e.target.value)} />

          <p>מועד אספקה שנבחר הוא : {date}</p>
          <p>חומר גלם שנבחר ID: {selectedMaterialId}</p>
          <button>הזמן</button>
        </form>

        {/* <h1>{materials}</h1> */}
      </div>
    </div>
  );
};

export default Orders;
