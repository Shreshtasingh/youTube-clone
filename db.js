// Import necessary modules
const mongoose = require('mongoose')
const multer = require('multer')
const ImageKit = require("imagekit")
const axios = require('axios')
// MongoDB connection URL from environment variables
const url = process.env.MONGODB_URI;
// Connect to MongoDB using mongoose
mongoose.connect(url, {
  useFindAndModify: false,
  useCreateIndex: true //allows indexing of documents
})
  .then(() => console.info("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));
// Create a new connection to MongoDB
const conn = mongoose.createConnection(url);
// Initialize ImageKit with credentials from environment variables
const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
// BunnyCDN endpoint for video streaming //where the videos would be uploaded
const bunnyStreamEndpoint = `https://video.bunnycdn.com/library/${process.env.BUNNY_STREAM_LIBRARY_ID}/videos` //in bunny whenever a channel posts a video a seperate folder is created these folders are known as library id

// Function to create a video entry in BunnyCDN
const createVideoEntry = async (fileName) => {
  const response = await axios.post /*using axios for sending a req without reloading the browser*/(bunnyStreamEndpoint, { title: fileName }, {
    headers: {
        //bunny api key to verify that the video which is being uploaded is from our channel 
      AccessKey: process.env.BUNNY_STREAM_API_KEY,
      'Content-Type': 'application/json'
    }
  })
  return response.data.guid;
}
// Configure multer for handling file uploads in memory
const storage = multer.memoryStorage()
const upload = multer({ storage })
// Export the configured modules and functions
module.exports = { conn, upload, imageKit, createVideoEntry, bunnyStreamEndpoint }