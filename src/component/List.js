import React, { useEffect, useState } from 'react';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the Wix API
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://www.wixapis.com/stores-reader/v1/products/query", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCIwNGNmMDExNy0wYzBiLTQxYjYtOTM1NS03M2U2ZTRjNjQwMDVcIixcImFwcERlZklkXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDdcIixcInNpZ25EYXRlXCI6XCIyMDI0LTExLTExVDA1OjAwOjMxLjY0NVpcIixcInBlcm1pc3Npb25zXCI6XCJcIixcImRlbW9Nb2RlXCI6ZmFsc2UsXCJzaXRlT3duZXJJZFwiOlwiYmM0YzZlZWEtYzNmNi00ZjljLTkxOGItOGNiYzEzODRlMzI0XCIsXCJtZXRhU2l0ZUlkXCI6XCJhOTJjNGFkZC00MTI3LTQ1YTUtOTNjMi04ODhmYTNlMjcxYmRcIixcImV4cGlyYXRpb25EYXRlXCI6XCIyMDI0LTExLTExVDA5OjAwOjMxLjY0NVpcIixcInBzXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDc6XjEuMC4wXCJ9fSIsImlhdCI6MTczMTMwMTIzMSwiZXhwIjoxNzMxMzE1NjMxfQ.A-5qzr9yBxNa9Sk5K3tJq6HBSreN8b3AECHwXgmk7nc`, // Replace with your API key or token
                    },
                    body: JSON.stringify({
                        query: {},
                        paging: {
                            limit: 100
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        {product.media?.mainMedia?.image && (
                            <img
                                src={product.media.mainMedia.image.url}
                                alt={product.name}
                                width={product.media.mainMedia.image.width / 50}
                                height={product.media.mainMedia.image.height / 50}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function List() {
    const [showProducts, setShowProducts] = useState(false);

    return (
        <div>
            <button type="button" onClick={() => setShowProducts(!showProducts)}>
                {showProducts ? 'Hide Products' : 'View Products'}
            </button>
            {showProducts && <Products />}
        </div>
    );
}
