import React, { useState } from 'react';

const Products: React.FC = () => {
    const [productData, setProductData] = useState({
        products_name: '',
        products_price: '',
        products_description: '',
        products_imageUrl: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setProductData({ ...productData, [name]: value});
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(productData);
        fetch('http://localhost:3000/api/products/addProduct',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'credential': 'include',
        },
        body: JSON.stringify(productData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("add product done!", data)
        alert("add product done!")
      })
       .catch(() => {
        console.error("error when add product")
       } );          
    }
  return (
    <div>
    <h1>Add Product</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="products_name">Products Name:</label>
            <input
                type="text"
                id="products_name"
                name="products_name"
                value={productData.products_name}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="products_description">Price:</label>
            <input
                type="number"
                id="products_price"
                name="products_price"
                value={productData.products_price}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="password">Description:</label>
            <input
                type="products_description"
                id="products_description"
                name="products_description"
                value={productData.products_description}
                onChange={handleChange}
                required
            />
        </div>
        <div>
            <label htmlFor="password">imageUrl:</label>
            <input
                type="products_imageUrl"
                id="products_imageUrl"
                name="products_imageUrl"
                value={productData.products_imageUrl}
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit">Add</button>
    </form>
</div>
  )
}

export default Products

// products_name varchar(200),
// products_price float,
// products_description varchar(300),
// products_imageUrl varchar(255)
