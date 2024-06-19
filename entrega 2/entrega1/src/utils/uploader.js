import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join( "src", "public", "images"));
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploader = multer({ storage });
export default uploader;