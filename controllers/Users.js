import User from "../models/UserModel.js";
import Santri from "../models/SantriModel.js";
import { Op } from "sequelize";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search_query || "";
      const offset = limit * page;
  
      const { count, rows: users } = await User.findAndCountAll({
        attributes: ["uuid", "name", "email", "role", "santriId"],
        include: [
          {
            model: Santri,
            attributes: [
              "uuid",
              "nis",
              "nameLengkap",
              "tempatLahir",
              "tanggalLahir",
              "jenisKelamin",
              "noTelepon",
              "agama",
              "alamat",
              "asalSekolah",
              "statusSantri",
              "namaWali",
              "pekerjaanWali",
              "alamatWali",
              "noTeleponWali",
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              email: {
                [Op.like]: "%" + search + "&",
              },
            },
          ],
        },
        offset: offset,
        limit: limit,
        order: [["id", "DESC"]],
      });
  
      const totalPage = Math.ceil(count / limit);
  
      res.json({
        result: users,
        page: page,
        limit: limit,
        totalRows: count,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  export const getUserById = async (req, res) => {
    try {
      const response = await User.findOne({
        attributes: ["uuid", "name", "email", "role", "santriId"],
        where: {
          uuid: req.params.id,
        },
        include: [
          {
            model: Santri,
            attributes: [
              "uuid",
              "nis",
              "nameLengkap",
              "tempatLahir",
              "tanggalLahir",
              "jenisKelamin",
              "noTelepon",
              "agama",
              "alamat",
              "asalSekolah",
              "statusSantri",
              "namaWali",
              "pekerjaanWali",
              "alamatWali",
              "noTeleponWali",
            ],
          },
        ],
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  export const createUser = async (req, res) => {
    const {
      uuid,
      name,
      email,
      password,
      confPassword,
      role,
      nis,
      nameLengkap,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      noTelepon,
      agama,
      alamat,
      asalSekolah,
      statusSantri,
      namaWali,
      pekerjaanWali,
      alamatWali,
      noTeleponWali,
    } = req.body;
  
    if (password !== confPassword)
      return res
        .status(400)
        .json({ msg: "Password dan Confirm Password tidak sama" });
  
    const hashPassword = await argon2.hash(password);
  
    try {
      const user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      });
  
      const santri = await Santri.create({
        nis: nis,
        nameLengkap: nameLengkap,
        tempatLahir: tempatLahir,
        tanggalLahir: tanggalLahir,
        jenisKelamin: jenisKelamin,
        noTelepon: noTelepon,
        agama: agama,
        alamat: alamat,
        asalSekolah: asalSekolah,
        statusSantri: statusSantri,
        namaWali: namaWali,
        pekerjaanWali: pekerjaanWali,
        alamatWali: alamatWali,
        noTeleponWali: noTeleponWali,
        userId: user.uuid, // Menggunakan uuid user yang baru dibuat sebagai userId
      });
  
      res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
export const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid:req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"});
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        hashPassword = await argon2.hash(password);
    }
    if(password !== confPassword)return res.status (400).json({msg: "Password dan Confirm Pasword tidak sama"});
    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where:{
              uuid: req.params.id,
            }
        });
        res.status(200).json({msg: "User Updated"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const deleteUser= async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid:req.params.id
        }
    });
    if(!user)return res.status(404).json({msg: "User Tidak Ditemukan"})
    try {
        await User.destroy({
            where:{
                id:user.id
            }
        });
        res.status(200).json({msg: "User Deleted"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}