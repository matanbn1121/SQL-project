import React, { useEffect, useState } from 'react';

const Store = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products/showAllProducts");
                if (!response.ok) throw new Error("Failed to fetch products");

                const data = await response.json();
                setProducts(data.result);
                console.log("Products:", data.result); 
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>My Store:</h1>
            <ul style={{ listStyle: 'none', padding: 0,display:'flex', flexWrap: 'wrap'}}>
                {products.map((product: any) => (
                    <li key={product.products_id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
                        <h2>{product.products_name}</h2>
                        <p><strong>Price:</strong> {product.products_price} ₪</p>
                        <p>{product.products_description}</p>
                        {product.products_imageUrl && (
                            <img
                                src={product.products_imageUrl}
                                alt={product.products_name}
                                style={{ width: '200px', height: 'auto' }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Store;
