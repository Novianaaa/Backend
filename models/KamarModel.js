import { DataTypes, Sequelize } from "sequelize";
import db from "../config/Database.js";
import Santri from "./SantriModel.js";

const {DataType} = Sequelize;

const Kamar = db.define('kamar',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    namaKamar:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true
});

// Santri.hasOne(Kamar);
// Kamar.belongsTo(Santri, {foreignKey: 'santriId'} )

export default Kamar;