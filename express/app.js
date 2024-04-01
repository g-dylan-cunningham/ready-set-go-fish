const express = require('express');
// const prisma = require('./db/prisma');
const cors = require('cors');
const app = express();


const storeRoute = require("./routes/storeRoute");
const unprotectedStoreRoute = require("./routes/unprotectedStoreRoute");
const skuRoute = require("./routes/skuRoute");
const baseSpecieRoute = require("./routes/baseSpecieRoute");
const storeSpecieRoute = require("./routes/storeSpecieRoute");
const userRoute = require("./routes/userRoute")

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})
//cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/store', storeRoute);
app.use('/sku', skuRoute);
app.use('/baseSpecie', baseSpecieRoute);
app.use('/storeSpecie', storeSpecieRoute);
app.use('/user', userRoute);
app.use('/storeRead', unprotectedStoreRoute)
// app.use('/sku', skuRoute);

// //test api
// app.get('/test', (req, res) => {
//   try {
//     res.status(200).json({ message: 'API is working' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //get all users
// app.get('/users', async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //get user by id
// app.get('/users/:id', async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //create user
// app.post('/users', async (req, res) => {
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email
//       },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //update user
// app.put('/users/:id', async (req, res) => {
//   try {
//     const user = await prisma.user.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         name: req.body.name,
//         email: req.body.email
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //delete user
// app.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));