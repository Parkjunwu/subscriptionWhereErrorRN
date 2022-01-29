module.exports = {
  client:{
    service:{
      includes:["./**/*.{ts,tsx}"],
      tagName:"gql",
      name:"subscription-backend",
      url:"http://localhost:4000/graphql",
    }
  }
}