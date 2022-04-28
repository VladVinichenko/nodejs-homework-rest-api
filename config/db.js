const { mongoose } = require('mongoose')

const uri = process.env.URI_DB

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
})

mongoose.connection.on('disconnected', () => {
  console.log('Dicconnected from DB');
})

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Disconnected from DB');
    process.exit(1)
  })
})

module.exports = db


















// const fs = require('fs/promises')
// const { join } = require('path')


// class StorageAdapter {
//   constructor(file) {
//     this.file = file
//   }

//   async read() {
//     const result = await fs.readFile(join(__dirname, this.file), 'utf-8')
//     return JSON.parse(result)
//   }

//   async write(data) {
//     await fs.writeFile(
//       join(__dirname, this.file), JSON.stringify(data, null, 2)
//     )
//   }
// }

// module.exports = StorageAdapter


// const { MongoClient, ServerApiVersion } = require('mongodb');

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
