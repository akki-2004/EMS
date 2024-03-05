import React, { useState } from 'react';
import { create } from 'ipfs-http-client'; 
import {
  useContract,
  Web3Button,
  useStorageUpload,
  MediaRenderer
} from "@thirdweb-dev/react";
import CryptoJS from 'crypto-js';

//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

export default function EvidenceWrite() {
  // const [uploadSuccess, setUploadSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const { contract } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");
  const [formData, setFormData] = useState({
    cnr: '',
    id: '',
    imageHash: '',
    data: '', 
    fileName: '',
    fileHash: '',
    fileDescription: '',
    UploadDate: '',
    UploadTime: '',
    file: null,
  });
    const { mutateAsync: upload } = useStorageUpload();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const encryptData = (data, secretKey) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    // Handle file submission to IPFS

    const now = new Date();
    formData.UploadDate = now.toLocaleDateString();
    formData.UploadTime = now.toLocaleTimeString();

    const updatedFormData = { ...formData };
    console.log("DATA:",updatedFormData)
    Object.keys(updatedFormData).forEach((key) => {
      if (!updatedFormData[key]) {
        console.log(updatedFormData[key]);
        formData[key] = ` Empty ${key}`;
      }
    });
    console.log('Form data submitted:', formData);

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the first selected file
  
    setFormData((prevState) => ({
      ...prevState,
      file: file,
      fileName: file.name,
    }));
    
    try {
      // Upload the file to IPFS
      const uploadUrl = await upload({
        data: [file],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });
      setFormData((prevState) => ({
        ...prevState,
        fileHash: uploadUrl[0],
      }));
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };
  const handleImageChange = async (event) => {
    const Image = event.target.files[0]; // Get the first selected file
    try {
      // Upload the file to IPFS
      const uploadUrl = await upload({
        data: [Image],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });
      console.log("URI IS: ",uploadUrl);
      setFormData((prevState) => ({
        ...prevState,
        imageHash: uploadUrl[0],
      }));
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="cnr">CNR:</label>
          <input type="text" name="cnr" id="cnr" value={formData.cnr} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID Number:</label>
          <input type="text" name="id" id="id" value={formData.id} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          Evidence image: 
          <input type="file" onChange={handleImageChange} className="form-control-file" />
        </div>
        

        <div className="form-group">
          <label htmlFor="data">Data:</label>
          <input type="text" name="data" id="data" value={formData.data} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="fileDescription">Description:</label>
          <input type="text" name="fileDescription" id="fileDescription" value={formData.fileDescription} onChange={handleChange} className="form-control" />
        </div>

        <div className="form-group">
          <input type="file" onChange={handleFileChange} className="form-control-file" />
        </div>
          <button type="submit">Submit</button>
          <Web3Button 
  contractAddress="0x006dd039Fb88580A45e407764bD08053Af045c14"
  action={async (contract) => contract.call(
    'addData',
    [[
      formData.cnr,
      encryptData(formData.id, formData.cnr),
      encryptData(formData.imageHash, formData.cnr),
      encryptData(formData.data, formData.cnr),
      encryptData(formData.fileName, formData.cnr),
      encryptData(formData.fileHash, formData.cnr),
      encryptData(formData.fileDescription, formData.cnr),
      encryptData(formData.UploadDate, formData.cnr),
      encryptData(formData.UploadTime, formData.cnr)
    ]]
  )}
  onError={(error) => alert(error)}
  onSuccess={(result) => {
    setSubmittedData(result); // Update the state with the returned data
    setUploadSuccess(true);
  }}
>
  Submit data
</Web3Button>

      </form>      
    </div>
  );
}