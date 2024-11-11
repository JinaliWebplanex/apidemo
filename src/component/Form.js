import React, { useState } from "react";
import axios from "axios";

export default function Form() {
    const [productName, setProductName] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");


    
    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();

      
        // Log the values to ensure they are updating correctly
        console.log("Product Name:", productName);
        console.log("Image:", image);
        console.log("Price:", price);

        // Validate that required fields are not empty
        if (!productName || !price || !image) {
            console.error("Product name and price are required.");
            return;
        }

        const productData = {
            product: {
                name: productName,
                description: description || "No description provided",
                priceData: {
                    price: parseFloat(price),
                },
                
                productType: "physical",
                isVisible: true,
            },
        };
        
    const productMedia = {
            media: [
                {
                    mediaType: "Image",
                    url: image
                }
            ]
        };

        try {
            const response = await axios.post(
                "https://www.wixapis.com/stores/v1/products",
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCIwNGNmMDExNy0wYzBiLTQxYjYtOTM1NS03M2U2ZTRjNjQwMDVcIixcImFwcERlZklkXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDdcIixcInNpZ25EYXRlXCI6XCIyMDI0LTExLTExVDA5OjA5OjU5LjEzMFpcIixcInBlcm1pc3Npb25zXCI6XCJcIixcImRlbW9Nb2RlXCI6ZmFsc2UsXCJzaXRlT3duZXJJZFwiOlwiYmM0YzZlZWEtYzNmNi00ZjljLTkxOGItOGNiYzEzODRlMzI0XCIsXCJtZXRhU2l0ZUlkXCI6XCJhOTJjNGFkZC00MTI3LTQ1YTUtOTNjMi04ODhmYTNlMjcxYmRcIixcImV4cGlyYXRpb25EYXRlXCI6XCIyMDI0LTExLTExVDEzOjA5OjU5LjEzMFpcIixcInBzXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDc6XjEuMC4wXCJ9fSIsImlhdCI6MTczMTMxNjE5OSwiZXhwIjoxNzMxMzMwNTk5fQ.9KQkH51HgmOOB-FIOSRYMQrpzDomdm-LTFhKOd8G1Zk`, // Replace with actual access token
                    },
                }
            );
            console.log("productId :",response.data.product.id)
            const productId = response.data.product.id;

            // Step 2: Upload Image
            const formData = new FormData();
            formData.append("file", image); // Attach file
            const productMediaUrl = `https://www.wixapis.com/stores/v1/products/${productId}/media`;

            await axios.post(productMediaUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `OauthNG.JWS.eyJraWQiOiJZSEJzdUpwSCIsImFsZyI6IkhTMjU2In0.eyJkYXRhIjoie1wiaW5zdGFuY2VcIjp7XCJpbnN0YW5jZUlkXCI6XCIwNGNmMDExNy0wYzBiLTQxYjYtOTM1NS03M2U2ZTRjNjQwMDVcIixcImFwcERlZklkXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDdcIixcInNpZ25EYXRlXCI6XCIyMDI0LTExLTExVDA5OjA5OjU5LjEzMFpcIixcInBlcm1pc3Npb25zXCI6XCJcIixcImRlbW9Nb2RlXCI6ZmFsc2UsXCJzaXRlT3duZXJJZFwiOlwiYmM0YzZlZWEtYzNmNi00ZjljLTkxOGItOGNiYzEzODRlMzI0XCIsXCJtZXRhU2l0ZUlkXCI6XCJhOTJjNGFkZC00MTI3LTQ1YTUtOTNjMi04ODhmYTNlMjcxYmRcIixcImV4cGlyYXRpb25EYXRlXCI6XCIyMDI0LTExLTExVDEzOjA5OjU5LjEzMFpcIixcInBzXCI6XCIyOWM3OGFmNC03MGZhLTRiMWMtOWY0Zi1iMWMwMzFiY2E5ZDc6XjEuMC4wXCJ9fSIsImlhdCI6MTczMTMxNjE5OSwiZXhwIjoxNzMxMzMwNTk5fQ.9KQkH51HgmOOB-FIOSRYMQrpzDomdm-LTFhKOd8G1Zk`, // Replace with actual access token
                    // Replace with your token
                },
            });
            console.log(response.data);
            console.log("Product added:", response.data.product.id);

        } catch (error) {
            console.error("Error adding product:", error.response ? error.response.data : error.message);
        }
    };

    const handleReset = () => {
        setProductName("");
        setPrice("");
        setDescription("");
    };

    return (
        <div>
            <h1>Create Product</h1>
         
                <form onSubmit={handleSubmit}>
                <label htmlFor="image">Image*</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter Image Name"
                        required
                    />
                    <label htmlFor="productname">Product Name*</label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"
                        required
                    />
                    <label htmlFor="price">Price*</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Price"
                        required
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="About Product"
                    ></textarea>
                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">
                        Submit
                    </button>
                </form>
           
        </div>
    );
}
