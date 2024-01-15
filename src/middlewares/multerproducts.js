import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/products'), 
    filename: (req, file, cb) => cb(null, file.originalname),
});


export const uploaderproducts = multer({ storage });