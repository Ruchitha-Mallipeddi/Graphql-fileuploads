//const {  gql } = require("apollo-server");
const { ApolloServer,gql } = require('apollo-server-express');
const bodyParser=require('body-parser')
const { GraphQLScalarType, Kind } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const fs = require("fs");
const FileReader = require("filereader");
const FormData = require("form-data");
const fetch = require("node-fetch");
const axios = require("axios");
const express=require("express")
const { GraphQLUpload,graphqlUploadExpress } = require('graphql-upload');


// app = express()
//app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

 typeDefs = gql`
scalar Upload
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
`

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
;
const resolvers = {
     Upload: GraphQLUpload,
    // Upload: new GraphQLScalarType({
    //     name: 'Upload',
    //     description: 'The `Upload` scalar type represents a file upload.',
    //     parseValue(value) {
    //         return value;
    //     },
    //     parseLiteral(ast) {
    //         throw new GraphQLError('Upload literal unsupported.', ast);
    //     },
    //     serialize() {
    //         throw new GraphQLError('Upload serialization unsupported.');
    //     },
    // }),

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

        // const formData = new FormData();
        // formData.append("file", fileStream);
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
              { maxContentLength: Infinity,
                maxBodyLength: Infinity,
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
             alert("File uploaded successfully.");
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


// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schema');


  const app = express();
  //app.use(bodyParser({limit:'3mb'}))
  app.use(graphqlUploadExpress({ maxFileSize: 1200000000, maxFiles: 10 }));
  const server = new ApolloServer({
    typeDefs,
    uploads: false,
    resolvers,
  });
  //await server.start();

  server.applyMiddleware({ app });

//   app.use((req, res) => {
//     res.status(200);
//     res.send('Hello!');
//     res.end();
//   });

app.listen({ port: 4000 }, () => {
    console.log('Apollo Server on http://localhost:4000/graphql');
  });
