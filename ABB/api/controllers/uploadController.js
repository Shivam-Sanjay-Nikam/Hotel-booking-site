const fs = require('fs');
const cloudinary = require("cloudinary").v2;

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadpics = async (req, res) => {
  
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const file = req.files.file;
    const uploadPath = __dirname + "/files/" + Date.now() + `.${file.name.split('.').pop()}`;

    const response = await uploadFileToCloudinary(file, "project-abb");
    console.log(response)

    file.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error while uploading the file.' });
      }
    });

    res.status(200).json({ 
      message: 'File uploaded successfully.',
      img: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
