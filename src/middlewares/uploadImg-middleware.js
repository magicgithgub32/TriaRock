const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config()

 
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'TriaRock',
    allowFormats: ['jpg', 'png', 'jpeg', 'gif', 'avif']
  },
});

const uploadProductImgCloudinary = multer({storage})

const deleteProductImgCloudinary = (imgUrl) => {
    const imgSplitted = imgUrl.split('/');
    const nameSplitted = imgSplitted[imgSplitted.length - 1].split('.');
    const folderSplitted = imgSplitted[imgSplitted.length - 2];
    const public_id = `${folderSplitted}/${nameSplitted[0]}`;
    cloudinary.uploader.destroy(public_id, () => {
      console.log('Image deleted');
    });
  };
  
  const configCloudinary = () => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  };
  
  module.exports = {
    uploadProductImgCloudinary,
    deleteProductImgCloudinary,
    configCloudinary
  };