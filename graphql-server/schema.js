const typeDefs = gql`  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  
  type Query {
    _ : Boolean // Added here to satisfy requirement of having at least one query defined
  }
  
  type Mutation {
    singleUpload(file: Upload!): File!,
    singleUploadStream(file: Upload!): File!
  }
`;