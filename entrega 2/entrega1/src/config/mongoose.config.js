import { connect, Types } from "mongoose";

const connectDB = async () => {
    const URI = "mongodb+srv://salguerobustoselias:rLO02qSj03uDmDHs@cluster0.iwzf0ka.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "superbike",
    };

    try {
        await connect(URI, options);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
};
const isValidId = (id) => {
    return Types.ObjectId.isValid(id); // esto devuelve true o false.
};
export default { connectDB, isValidId };