import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue:  DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    // name:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true,
            
    //     }
    // },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName:true
});

import Santri from "./SantriModel.js";
Users.hasOne(Santri, { foreignKey: 'santriId' });
// Users.associatte = function(models){
//     Users.belongsTo(models.Santri, {
//         foreignKey: 'santriId',
//         as: 'santri'
//     });
// }


export default Users;