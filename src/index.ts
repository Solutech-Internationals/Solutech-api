import express from "express";
import laptopRoutes from "./routes/laptopRoutes"
import connectDB from "./config/db"


const app = express();
const port = process.env.APP_PORT || 8080;

connectDB();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/', laptopRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port} `);
});