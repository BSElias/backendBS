import fs from "fs";
import path from "./paths";

const deleteImage = async (filename) => {
    const filepath = `${path.images}/${filename}`;
    try {
        await fs.promises.unlink(filepath);
    } catch (error) {
        console.log("No Existe el Archivo");
    }
}; export default { deleteImage };