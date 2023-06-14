import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Ustadz from "./UstadzModel.js";
import Kelas from "./KelasModel.js";

const {DataTypes} = Sequelize;

const Pelajaran = db.define('pelajaran',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jenisPelajaran:{
        type: DataTypes.STRING,
        allowNull: false
    },
    namaKitab:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName:true
});

// relasi tabel
// many-to-one dengan Tabel Pengajar

Pelajaran.belongsTo(Ustadz, {foreignKey: 'ustadzId'});
Pelajaran.belongsTo(Kelas, {foreignKey: 'kelasId'})
export default Pelajaran;