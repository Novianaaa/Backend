import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Santri from "./SantriModel.js";
import Pelajaran from "./PelajaranModel.js";
import Kelas from "./KelasModel.js";

const {DataTypes} = Sequelize;

const Nilai = db.define('nilai',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nilai:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true
});

Pelajaran.hasOne(Nilai);
Nilai.belongsTo(Pelajaran, {foreignKey: 'pelajaranId'} )

Kelas.hasOne(Nilai);
Nilai.belongsTo(Kelas, {foreignKey: 'kelasId'} )

export default Nilai;