import express from "express";
import laptopRoutes from "./routes/laptopRoutes"
import mobilePhoneRoutes from "./routes/mobilePhoneRoutes"
import carRoutes from "./routes/carRoutes";
import bikeRoutes from "./routes/bikeRoute";
import connectDB from "./config/db"


const app = express();
const port = process.env.APP_PORT || 8080;

connectDB();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/', laptopRoutes);
app.use('/api/', mobilePhoneRoutes);
app.use('/api/', carRoutes);
app.use('/api/', bikeRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port} `);
});