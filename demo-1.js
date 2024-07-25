const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// สร้าง GraphQL Schema
const schema = buildSchema(`
    type Query {
        hello: String  
    }
`);

// ฟังก์ชัน Resolver สำหรับ Schema
const root = {
    hello: () => {
        return "Hello, World!";
    },
};

const app = express();

// ตั้งค่า Endpoint สำหรับ GraphQL
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true, // เปิดใช้งาน GraphiQL IDE สำหรับทดสอบ Query
    })
);

app.listen(4000, () => {
    console.log("Running a GraphQL API server at <http://localhost:4000/graphql>");
});

/* Run ทดสอบที่ port 4000 at http://localhost:4000/graphql

{
    hello
}

*/