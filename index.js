import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import NilaiRoute from "./routes/NilaiRoute.js";
import KamarRoute from "./routes/KamarRoute.js";
import UstadzRoute from "./routes/UstadzRoute.js";
import TahunAkademikRoute from "./routes/TahunAkademikRoute.js";
import db from "./config/Database.js";
import SantriRoute from "./routes/SantriRoute.js";
import JadwalRoute from "./routes/JadwalRoute.js";
import KelasRoute from "./routes/KelasRoute.js";
import DbRoute from "./routes/DbRoute.js";
import PelajaranRoute from "./routes/PelajaranRoute.js";
import SequelizeStore from "connect-session-sequelize";
import FileUpload from "express-fileupload";


dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});
// let arr = [1, 2, 3];
// arr = [3, 2, 1]

// (async()=>{
//     await db.sync();
// })();



// Mendirikan koneksi database
// db.authenticate()
//   .then(() => {
//     console.log("Terhubung ke database MySQL");
//     // Inisialisasi asosiasi setelah terhubung ke database
//     initializeAssociations();
//     // Mulai menjalankan server atau logika aplikasi lainnya
//   })
//   .catch((error) => {
//     console.error("Gagal terhubung ke database:", error);
//   });

app.use(session({
    secret:process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie:{
        secure: 'auto'
    }
}));


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(DbRoute);
app.use(SantriRoute);
app.use(KamarRoute);
app.use(UstadzRoute);
app.use(TahunAkademikRoute);
app.use(KelasRoute);
app.use(PelajaranRoute);
app.use(NilaiRoute);
app.use(JadwalRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});