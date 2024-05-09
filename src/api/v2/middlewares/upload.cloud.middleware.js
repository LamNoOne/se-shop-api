const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const cloudinary = require('~/config/cloudinary.config')

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  params: {
    folder: 'se-shop/avatars'
  }
})

const productStorage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  params: {
    folder: 'se-shop/products'
  }
})

module.exports = {
  uploadAvatarMiddleware: multer({ storage: avatarStorage }).single('image'),
  uploadProductImageMiddleware: multer({ storage: productStorage }).single('image')
}