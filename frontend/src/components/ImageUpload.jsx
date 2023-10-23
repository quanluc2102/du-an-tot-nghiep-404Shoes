import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("file", file);

        axios.post("http://localhost:8080/api/images/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                console.log(response.data);
                // Handle success or display a success message to the user
            })
            .catch((error) => {
                console.error(error);
                // Handle error
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
}

export default ImageUpload;
