// import Santri from "./SantriModel.js";
// import Users from "./UserModel.js";
// import db from "../config/Database.js";
// import Kelas from "./KelasModel.js";
// import Kamar from "./KamarModel.js";

// export default function initializeAssociations() {
//   Santri.belongsTo(Users, { foreignKey: "userId" });
// //   Users.hasOne(Santri, { foreignKey: "userId" });
//   Kelas.belongsTo(Santri, { foreignKey: "santriId" });
//   Santri.belongsTo(Kelas, { foreignKey: "kelasId" });
//   Kamar.belongsTo(Santri, { foreignKey: "santriId" });
//   Santri.belongsTo(Kamar, { foreignKey: "kamarId" });
//   // Definisikan asosiasi lain di sini
// }

// initializeAssociations();
import User from "./UserModel.js";
import Santri from "./SantriModel.js";

User.hasOne(Santri, { foreignKey: 'userId' });
Santri.belongsTo(User, { foreignKey: 'userId' });

export { User, Santri };
