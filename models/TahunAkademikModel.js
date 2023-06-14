import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const TahunAkademik = db.define('tahunakademik',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    tahunAjar:{
        type: DataTypes.STRING,
        allowNull: false
    },
    semester:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName:true
});


export default TahunAkademik;