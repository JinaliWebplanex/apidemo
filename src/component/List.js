import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products({ onEditProduct }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://www.wixapis.com/stores-reader/v1/products/query", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCIwNGNmMDExNy0wYzBiLTQxYjYtOTM1NS03M2U2ZTRjNjQwMDVcIixcImFwcERlZklkXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDdcIixcInNpZ25EYXRlXCI6XCIyMDI0LTExLTExVDA5OjA5OjU5LjEzMFpcIixcInBlcm1pc3Npb25zXCI6XCJcIixcImRlbW9Nb2RlXCI6ZmFsc2UsXCJzaXRlT3duZXJJZFwiOlwiYmM0YzZlZWEtYzNmNi00ZjljLTkxOGItOGNiYzEzODRlMzI0XCIsXCJtZXRhU2l0ZUlkXCI6XCJhOTJjNGFkZC00MTI3LTQ1YTUtOTNjMi04ODhmYTNlMjcxYmRcIixcImV4cGlyYXRpb25EYXRlXCI6XCIyMDI0LTExLTExVDEzOjA5OjU5LjEzMFpcIixcInBzXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDc6XjEuMC4wXCJ9fSIsImlhdCI6MTczMTMxNjE5OSwiZXhwIjoxNzMxMzMwNTk5fQ.9KQkH51HgmOOB-FIOSRYMQrpzDomdm-LTFhKOd8G1Zk" // Replace with your API key
                    },
                    body: JSON.stringify({
                        query: {},
                        paging: { limit: 100 }
                    })
                });

                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

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
                        <button onClick={() => onEditProduct(product)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function EditProductModal({ product, onSave, onClose }) {
    const [name, setName] = useState(product?.name || '');
    const [description, setDescription] = useState(product?.description || '');

    const handleSave = () => {
        onSave({ ...product, name, description });
    };

    return (
        <Modal show={!!product} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function List() {
    const [showProducts, setShowProducts] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleSaveProduct = async (updatedProduct) => {
        try {
            const response = await axios.patch(`https://www.wixapis.com/stores/v1/products/${updatedProduct.id}`, {
               "product": {
                "name": updatedProduct.name,
                "description": updatedProduct.description,
        // Any other fields you want to update
    }
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCIwNGNmMDExNy0wYzBiLTQxYjYtOTM1NS03M2U2ZTRjNjQwMDVcIixcImFwcERlZklkXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDdcIixcInNpZ25EYXRlXCI6XCIyMDI0LTExLTExVDA5OjA5OjU5LjEzMFpcIixcInBlcm1pc3Npb25zXCI6XCJcIixcImRlbW9Nb2RlXCI6ZmFsc2UsXCJzaXRlT3duZXJJZFwiOlwiYmM0YzZlZWEtYzNmNi00ZjljLTkxOGItOGNiYzEzODRlMzI0XCIsXCJtZXRhU2l0ZUlkXCI6XCJhOTJjNGFkZC00MTI3LTQ1YTUtOTNjMi04ODhmYTNlMjcxYmRcIixcImV4cGlyYXRpb25EYXRlXCI6XCIyMDI0LTExLTExVDEzOjA5OjU5LjEzMFpcIixcInBzXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDc6XjEuMC4wXCJ9fSIsImlhdCI6MTczMTMxNjE5OSwiZXhwIjoxNzMxMzMwNTk5fQ.9KQkH51HgmOOB-FIOSRYMQrpzDomdm-LTFhKOd8G1Zk" // Replace with your API key
                }
            });

            if (response.status === 200) {
                console.log("Product updated successfully:", response.data);
            }
        } catch (error) {
            console.error("Error updating product:", error.message);
        } finally {
            setSelectedProduct(null);
        }
    };

    return (
        <div>
            <button type="button" onClick={() => setShowProducts(!showProducts)}>
                {showProducts ? 'Hide Products' : 'View Products'}
            </button>
            {showProducts && <Products onEditProduct={handleEditProduct} />}
            {selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    onSave={handleSaveProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
