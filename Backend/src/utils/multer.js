// import multer from "multer";
// export const fileValidation = {
//   image: ["image/jpeg", "image/png", "image/gif"],
//   file: ["application/pdf", "application/msword"],
//   video: ["video/mp4"],
// };
// export const myMulter = (customValidation = fileValidation.image) => {
//   const storage = multer.diskStorage({});
//   const fileFilter = (req, file, cb) => {
//     if (customValidation.includes(file.mimetype)) {
//       return cb(null, true);
//     }
//     return cb(new Error("In-valid format", { cause: 400 }), false);
//   };

//   const upload = multer({ fileFilter, storage });
//   return upload;
// };







// new multer function

import multer from "multer";
import fs from "fs"
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url"
const __dirname = fileURLToPath(import.meta.url)

export const fileValidation = {
  image: ["image/jpeg", "image/png", "image/jpg"],
  file: ["application/pdf", "application/msword"],
  video: ["video/mp4"],
};

export const fileUpload = (customPath, customValidation = fileValidation.image) => {


  const filePath = `uploads/${customPath}`
  const fullPath = path.join(__dirname, `../../${filePath}`)

  if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, { recursive: true }, (err) => {
      if (err) console.log(err);
    })
  }


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fullPath)
    },
    filename: (req, file, cb) => {
      const uniqueFileName = nanoid() + "_" + file.originalname
      file.finalDest = `${filePath}/${uniqueFileName}`
      cb(null, uniqueFileName)
    }
  });
  const fileFilter = (req, file, cb) => {

    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("In-valid format", { cause: 400 }), false);
    }
  };

  try {
    const upload = multer({ fileFilter, storage });
    return upload;
  }
  catch (error) {
    console.error('Error setting up multer:', error);
    throw error;
  }
};


export const fileProductUpload = (customPath, customValidation = fileValidation.image) => {
  return async (req, res, next) => {
    // Generate a unique product key
    const productKey = req.productKey;

    // Define the file path based on product key
    const filePath = `uploads/${customPath}/${productKey}`;
    const fullPath = path.join(__dirname, `../../${filePath}`);

    try {
      // Ensure the folder exists (create if not)
      await fs.promises.mkdir(fullPath, { recursive: true });

      // Set up multer storage configuration
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, fullPath); // Store files in the created folder
        },
        filename: (req, file, cb) => {
          const uniqueFileName = nanoid() + "_" + file.originalname; // Unique file name
          file.finalDest = `${filePath}/${uniqueFileName}`; // Save the final path
          cb(null, uniqueFileName); // The callback should be called with null (no error) and the unique filename
        }
      });

      // File filter to validate file types
      const fileFilter = (req, file, cb) => {
        if (customValidation.includes(file.mimetype)) {
          cb(null, true); // Accept the file
        } else {
          cb(new Error("Invalid format", { cause: 400 }), false); // Reject the file
        }
      };

      // Set up the upload middleware
      const upload = multer({ fileFilter, storage });

      // Handle the file upload process
      upload.fields([
        { name: "mainImage", maxCount: 1 },   // Only 1 file for main image
        { name: "subImages", maxCount: 5 }     // Up to 5 files for sub images
      ])(req, res, next); // Execute the upload middleware

    } catch (error) {
      console.error('Error setting up multer:', error);
      return next(error); // Handle the error
    }
  };
};



export const deleteFile = (filePath) => {
  fs.unlink(filePath,
    (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
      else {
        console.log('File deleted successfully');
      }
    });
}