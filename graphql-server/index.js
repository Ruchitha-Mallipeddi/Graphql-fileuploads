const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const FileReader = require("filereader");
const FormData = require("form-data");
const fetch = require("node-fetch");
const axios = require("axios");
const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    fetchFilesInBucket(bucketName: String!): [String]
    fetchPresignedPutUrl(bucketName: String!, fileName: String): String
    fetchPresignedGetUrl(bucketName: String!, fileName: String): String
  }

  type Mutation {
    singleUpload(file: Upload!, bucketName: String): File
  }
`;

// const resolvers = {
//   Mutation: {
//     singleUpload: (parent, args) => {
//       return args.file.then(file => {
//          const {createReadStream, filename, mimetype} = file

//          const fileStream = file.createReadStream()
//        //console.log(file.createReadStream());
//          fileStream.pipe(fs.createWriteStream(`/home/ruchitha/Desktop/GraphqlFiles/${filename}`))

//         return file;
//       });
//     },

//   },
// };
const resolvers = {
  Mutation: {
    singleUpload: async (_, { file, bucketName }) => {
      //     Promise.all(file).then(async(values) => {
      //     console.log(values);
      //   const fileRequest = {
      //     file: values[0].createReadStream()
      //   };
      //   console.log(fileRequest);

      //   let response = await fetch("http://127.0.0.1:5000/uploader", {
      //     method: "POST",
      //     headers: {
      //       Accept: "*/*",
      //       "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
      //     },
      //     body: JSON.stringify(fileRequest),
      //   });
      //   const data = await response.json();
      //   console.log(data);
      //   return values
      //    // return file;
      //  // });
      // })

      // .catch((error) => {
      //   console.log("error  "+error);
      //   return file
      // });
      return file.then(async (file) => {
        const { createReadStream, filename, mimetype } = file;

        //  console.log("file name "+filename)
        console.log("mimetype " + mimetype);

        //  const newFile = { id: 1, filename, mimetype, path:"/home/ruchitha/Desktop/GraphqlFiles/Sample.txt" };
        //  console.log(file);
        //    let reader = new FileReader();
        //    reader.readAsBinaryString(file);
        //   reader.onload = () => {

        //  let data = new FormData();
        //   let newFile =file;
        //   console.log(newFile);
        //   }

        const fileStream = createReadStream();
        // console.log(filestream)
        //  console.log("file")
        //  console.log(file)
        //console.log(fileStream)
        //  fileStream.pipe(fs.createWriteStream(`/home/ruchitha/Desktop/GraphqlFiles/${filename}`))
        // const newFileStream= await fs.createReadStream(`/home/ruchitha/Desktop/GraphqlFiles/Sample1`)
        //console.log(newFileStream);

        // var file = files.item(0);
        // var binaryFile = '';
        // const reader = new FileReader();
        // reader.onload = e => {

        //   binaryFile = reader.result
        // };
        // reader.readAsDataURL(fileStream);
        // console.log(binaryFile)

        const formData = new FormData();
        formData.append("file", fileStream);
        //   var formdata = {
        //     // file: {  // missing some properties
        //     //     value: fileStream,
        //     // }
        //     file: fileStream
        // }
        try {
          console.log("request  " + bucketName);
          const res = axios
            .post(
              "http://0.0.0.0:8081/files/upload/bucket/" +
                bucketName +
                "/file/" +
                filename,
              fileStream,
              {
                headers: {
                  // 'Content-type':"multipart/form-data; boundary=<calculated when request is sent>"
                  "Content-type": mimetype,
                },
              }
            )
            .then((response) => {
              console.log(response);
            });

          if (res.ok) {
            //console.log(res.data);
            // alert("File uploaded successfully.");
          }
        } catch (err) {
          console.log(err);
        }
      });
    },
  },
  Query: {
    fetchFilesInBucket: async (_, { bucketName }) => {
      try {
        console.log("files in a bucket");
        const res = await axios.get("http://0.0.0.0:8081/files/" + bucketName);

        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },

    fetchPresignedPutUrl: async (_, { bucketName, fileName }) => {
      try {
        console.log("files in a bucket");
        const res = await axios.get(
          "http://0.0.0.0:8081/files/" + bucketName + "/" + fileName
        );

        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },

    fetchPresignedGetUrl: async (_, { bucketName, fileName }) => {
      try {
        console.log("files in a bucket");
        const res = await axios.get(
          "http://0.0.0.0:8081/files/bucket/" +
            bucketName +
            "/file/" +
            fileName +
            "/download"
        );

        //console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`\`🚀  Server ready at ${url}`);
});
