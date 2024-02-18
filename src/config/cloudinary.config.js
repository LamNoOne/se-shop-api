const cloudinary = require('cloudinary').v2
const { clouds } = require('~/config/environment.config')

cloudinary.config({
  cloud_name: clouds.cloudinary.name,
  api_key: clouds.cloudinary.apiKey,
  api_secret: clouds.cloudinary.apiSecret
})

module.exports = cloudinary