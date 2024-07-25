const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// สร้าง GraphQL Schema 
// เปลี่ยน Schema ให้มีความซับซ้อนมากขึ้น
// เพิ่ม user และ Type User
const schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): User   
  }

  type User {
    id: Int
    name: String
    age: Int
}
`);
// เพิ่มข้อมูล
const users = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Doe", age: 28 },
];

// ฟังก์ชัน Resolver สำหรับ Schema
const root = {
  hello: () => {
    return "Hello, world!";
  },
  user: ({ id }) => {
    return users.find((user) => user.id === id);
  },
};

const app = express();

// ตั้งค่า Endpoint สำหรับ GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // เปิดใช้งาน GraphiQL IDE สำหรับทดสอบ query
  })
);

app.listen(4000, () => {
  console.log(
    "Running a GraphQL API server at <http://localhost:4000/graphql>"
  );
});

/* Run ทดสอบที่ port 4000 at http://localhost:4000/graphql

{
    hello
}

{
    user(id: 1){
        name
        age
    }
}

*/

