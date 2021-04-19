import { urls } from "../../constants";
import axios from "axios";
import fs from "fs";

export const uploadFile = async (payload) => {
  console.log(payload);
  try {
    const formData = new FormData();
    formData.append("file", payload);
    // const fileStream = fs.createReadStream(`/home/ruchitha/Desktop/GraphqlFiles/Sample1`)
    // formData.append("file",fileStream )
    const res = await axios.post(`${urls.uploadFile}`, formData);
    if (res.ok) {
      console.log(res.data);
      alert("File uploaded successfully.");
    }
  } catch (err) {
    console.log(err);
  }
};
export const uploadFileWithPreSignedUrl = async (
  url,
  bucketName,
  fileName,
  file
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    console.log("axios call ", bucketName);
    // const fileStream = fs.createReadStream(`/home/ruchitha/Desktop/GraphqlFiles/Sample1`)
    // formData.append("file",fileStream )
    const res = await axios.put(url, file, {
      headers: {
        // 'Content-Type': file.type
        "Content-Type": "application/octet-stream",
      },
    });
    if (res.ok) {
      //console.log(res.data);
      alert("File uploaded successfully.");
    }
  } catch (err) {
    console.log(err);
  }
};
export const downloadFileWithPreSignedUrl = async (url, fileName) => {
  try {
    // // const fileStream = fs.createReadStream(`/home/ruchitha/Desktop/GraphqlFiles/Sample1`)
    // // formData.append("file",fileStream )
    // const res = await axios.get(url);
    // if (res.ok) {
    //   //console.log(res.data);
    //   alert("File uploaded successfully.");
    // }
    const link = document.createElement("a");
    link.href = url;
    console.log(fileName);
    link.setAttribute("download", fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllFiles = async () => {
  try {
    const response = await axios.get(`${urls.getAllFiles}`);
    return response.data;
  } catch {
    console.log("error");
  }
};

export const downloadFile = async (fileName) => {
  try {
    // const options = {
    //   url: `${urls.downloadFile}?fileName=${fileName}`,
    //   method: "GET",
    //   responseType: "blob",
    // };
    // const response = await axios.get(`${urls.downloadFile}?fileName=${fileName}`);
    // const url = window.URL.createObjectURL(new Blob([response.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", fileName); //or any other extension
    // document.body.appendChild(link);
    // link.click();

    axios({
      url: `${urls.downloadFile}/${fileName}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      //link.setAttribute("download", fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  } catch {
    console.log("error");
  }
};
