import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/profiles'), 
    filename: (req, file, cb) => cb(null, file.originalname),
});


export const uploaderprofiles = multer({ storage });