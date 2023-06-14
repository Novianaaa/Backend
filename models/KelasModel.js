import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import Santri from "./SantriModel.js";
// import Pelajaran from "./PelajaranModel.js";
// import Nilai from "./NilaiModel.js";
// import Hafalan from "./HafalanModel.js";

const {DataTypes} = Sequelize;

const Kelas = db.define('kelas',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    namaKelas:{
        type: DataTypes.STRING,
        allowNull: false
    },
    
},{
    freezeTableName:true
});

// Kelas.belongsTo(Pelajaran, {foreignKey: 'pelajaranId'});
// Kelas.belongsTo(Santri, {foreignKey: 'santriId'})
export default Kelas;