import React, { useEffect, useState } from "react";
import TableScreenTemplate from "../../components/templates/TableScreenTemplate/TableScreenTemplate";
import TopNavigationBar from "../../components/organisms/TopNavigationBar/TopNavigationBar";
import SideNavigationBar from "../../components/organisms/SideNavigationBar/SideNavigationBar";
import EnhancedTable from "../../components/organisms/WhiteBoardTable/EnhancedTable";
import { useHistory } from "react-router-dom";
import {
  fetchAllFiles,
  uploadFileWithPreSignedUrl,
  downloadFileWithPreSignedUrl,
} from "../../services/FileStorage";
import gql from "graphql-tag";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
const UPLOAD_FILE = gql`
  mutation SingleUpload($file: Upload!, $bucketName: String!) {
    singleUpload(file: $file, bucketName: $bucketName) {
      filename
      mimetype
      encoding
    }
  }
`;
const FETCH_PRESIGNED_GET_URL = gql`
  query fetchPresignedGetUrl($bucketName: String!, $fileName: String!) {
    fetchPresignedGetUrl(bucketName: $bucketName, fileName: $fileName)
  }
`;
const FETCH_FILES_IN_BUCKET = gql`
  query fetchFilesInBucket($bucketName: String!) {
    fetchFilesInBucket(bucketName: $bucketName)
  }
`;

const FETCH_PRESIGNED_PUT_URL = gql`
  query fetchPresignedPutUrl($bucketName: String!, $fileName: String!) {
    fetchPresignedPutUrl(bucketName: $bucketName, fileName: $fileName)
  }
`;

export default function FileStorage() {
  const history = useHistory();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");
  const [downloadFileName, setDownloadFileName] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [mopId, setMopId] = useState();
  const [bucket, setBucket] = useState();
  const [bucketName2, setBucketName2] = useState();

  const [getPreSignedPutUrl] = useLazyQuery(FETCH_PRESIGNED_PUT_URL, {
    onCompleted: (data) => {
      console.log(data);
      var preSignedPutUrl = data.fetchPresignedPutUrl;
      uploadFileWithPreSignedUrl(
        preSignedPutUrl,
        bucketName2,
        selectedFile2.name,
        selectedFile2
      );
    },
  });
  const [getFiles, { loading, data }] = useLazyQuery(FETCH_FILES_IN_BUCKET, {
    onCompleted: (data) => {
      console.log(data);
      var files = data.fetchFilesInBucket;
      if (files != null) {
        files = files.map((file) => {
          return { name: file };
        });
        console.log("files ->", files);
        setFiles(files);
      } else {
        setFiles([]);
      }
    },
  });
  const [getPreSignedGetUrl] = useLazyQuery(FETCH_PRESIGNED_GET_URL, {
    onCompleted: (data) => {
      console.log(data);
      var preSignedGetUrl = data.fetchPresignedGetUrl;
      downloadFileWithPreSignedUrl(preSignedGetUrl, downloadFileName);
    },
  });
  const handleClick = async (fileName) => {
    // await downloadFile(fileName);
    setDownloadFileName(fileName);
    getPreSignedGetUrl({
      variables: { bucketName: mopId, fileName: fileName },
    });
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     var files = await fetchAllFiles();

  //     files = files.map((file) => {
  //       return { name: file };
  //     });
  //     console.log("files ->", files);
  //     setFiles(files);
  //   }
  //   fetchData();
  // }, [selectedFile]);

  const headCells = [
    { id: "name", numeric: false, label: " File-Name (click to download)" },
  ];

  const handleTabChange = (event, value) => {
    if (value === "FileStorage") {
      history.push("/file-storage");
    }
  };

  // const onUploadHandler = async (e) => {
  //   e.preventDefault();
  //   console.log("e.target.file --> ", e.target.files[0]);
  //   setSelectedFile(e.target.files[0]);
  //    uploadFile({variables:{file:e.target.files[0]}})
  //   // var binaryFile = '';
  //   //     const reader = new FileReader();
  //   //     reader.onload = e => {handleMopIdChange

  //   //       binaryFile = reader.result
  //   //       //uploadFile({variables:{file:binaryFile}})
  //   //      // await uploadFile(e.target.files[0]);
  //   //     uploadFile(binaryFile);
  //   //     };
  //   //     reader.readAsBinaryString(e.target.files[0]);

  // };

  const onUploadHandler = async (e) => {
    e.preventDefault();
    // console.log("e.target.file --> ", e.target.files[0]);
    // setSelectedFile(e.target.files[0]);
    // getPreSignedPutUrl({variables:{bucketName:bucket,fileName:e.target.files[0].name}})
    uploadFile({ variables: { file: e.target.files[0], bucketName: bucket } });
    // alert("File uploaded successfully.");
  };
  const onUploadHandlerForPresignedUrl = async (e) => {
    e.preventDefault();
    // console.log("e.target.file --> ", e.target.files[0]);
    setSelectedFile2(e.target.files[0]);
    getPreSignedPutUrl({
      variables: { bucketName: bucketName2, fileName: e.target.files[0].name },
    });
  };

  const handleMopIdChange = (event) => {
    setMopId(event.target.value);
  };
  const handleBucketChange = (event) => {
    event.preventDefault();
    setBucket(event.target.value);
    console.log(bucket);
  };
  const handleBucket2Change = (event) => {
    event.preventDefault();
    setBucketName2(event.target.value);
    //console.log(bucket)
  };

  const handleSubmit = async (event) => {
    console.log("test");
    getFiles({
      variables: { bucketName: mopId },
    });

    // onCompleted: (data) =>{
    //   console.log(data);
    //   var files = data.fetchFilesInBucket;

    //     files = files.map((file) => {
    //       return { name: file };
    //     });,
    //     console.log("files ->", files);
    //     setFiles(files);
    // }
  };

  return (
    <TableScreenTemplate
      header={<TopNavigationBar />}
      sidebar={<SideNavigationBar handleTabChange={handleTabChange} />}
      body={
        <EnhancedTable
          headCells={headCells}
          rows={files}
          defaultOrderBy="name"
          defaultOrder="asc"
          rowsPerPage={5}
          onUploadHandler={onUploadHandler}
          onUploadHandlerForPresignedUrl={onUploadHandlerForPresignedUrl}
          handleMopIdChange={handleMopIdChange}
          handleSubmit={handleSubmit}
          handleBucketChange={handleBucketChange}
          handleClick={handleClick}
          handleBucket2Change={handleBucket2Change}
        />
      }
    />
  );
}
