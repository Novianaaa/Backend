import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kelas from "./KelasModel.js";
import Pelajaran from "./PelajaranModel.js";
import Ustadz from "./UstadzModel.js";
import TahunAkademik from "./TahunAkademikModel.js";

const {DataTypes} = Sequelize;

const Jadwal = db.define('jadwal',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    hari:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName:true
});

// TahunAkademik.hasOne(Jadwal);
Jadwal.belongsTo(TahunAkademik, {foreignKey: 'tahunAkademikId'})

// Kelas.hasOne(Jadwal);
Jadwal.belongsTo(Kelas, {foreignKey: 'kelasId'} )

// Pelajaran.hasOne(Jadwal);
Jadwal.belongsTo(Pelajaran, {foreignKey: 'pelajaranId'} )

// Ustadz.hasOne(Jadwal);
Jadwal.belongsTo(Ustadz, {foreignKey: 'ustadzId'} )


export default Jadwal;