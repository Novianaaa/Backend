import { Sequelize, Op } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Ustadz = db.define('ustadz', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  namaUstadz: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamatUstadz: {
    type: DataTypes.STRING,
    allowNull: false
  },
  noTeleponUstadz: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pendidikanUstadz: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pekerjaanUstadz: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true,
  toJSON: {
    transform(instance) {
      return instance;
    }
  }
});

export default Ustadz;
