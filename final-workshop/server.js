const express = require("express");
const bodyParser = require('body-parser')
const app = express();
app.use(express.urlencoded({ extended: true }))
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const env = require("dotenv");



const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');



app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

env.config();

// Connection URI
const uri = process.env.MONGO_DB


const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(process.env.PORT, () =>
console.log("server is running on port")
);


// Main Code Here //
// Generating JWT
app.post("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
      const token = req.header(tokenHeaderKey);

      const verified = jwt.verify(token, jwtSecretKey);
      if (verified) {
          return res.send("Successfully Verified");
      } else {
          // Access Denied
          return res.status(401).send(error);
      }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  }
});