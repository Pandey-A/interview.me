/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://userdb_owner:RD7lCwXWT1oe@ep-green-butterfly-a5cgjvn7.us-east-2.aws.neon.tech/users-interviews?sslmode=require' ,
    }
  };