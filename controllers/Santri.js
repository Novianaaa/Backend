import Kamar from "../models/KamarModel.js";
import Kelas from "../models/KelasModel.js";
import Santri from "../models/SantriModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getSantri = async (req, res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Santri.count({
        where:{
            [Op.or]:[{nameLengkap:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Santri.findAll({
        where:{
            [Op.or]:[{nameLengkap:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
//     try {
//         let response;
//         if(req.role === "admin"){
//             response = await Santri.findAll({
//                 attributes:['uuid','nis', 'nameLengkap','tempatLahir', 'tanggalLahir','jenisKelamin', 'noTelepon', 'agama', 'alamat', 'asalSekolah', 'statusSantri', 'namaWali', 'pekerjaanWali', 'alamatWali', 'noTeleponWali'],
//                 include:[{
//                     model: User,
//                     attributes:['name','email']
//                 }]
//             });
//         }else{
//             response = await Santri.findAll({
//                 attributes:['uuid','nis', 'nameLengkap','tempatLahir', 'tanggalLahir','jenisKelamin', 'noTelepon', 'agama', 'alamat', 'asalSekolah', 'statusSantri', 'namaWali', 'pekerjaanWali', 'alamatWali', 'noTeleponWali'],
//                 where:{
//                     userId: req.userId
//                 },
//                 include:[{
//                     model: User,
//                     attributes:['name','email']
//                 }]
//             });
//         }
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
}

export const getSantriById = async(req, res) =>{
    try {
        const santri = await Santri.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!santri) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Santri.findAll({
                attributes:['uuid','nis', 'nameLengkap','tempatLahir', 'tanggalLahir','jenisKelamin', 'noTelepon', 'agama', 'alamat', 'asalSekolah', 'statusSantri', 'namaWali', 'pekerjaanWali', 'alamatWali', 'noTeleponWali'],
                where:{
                    id: santri.id
                },
                include:[
                {
                    model: User,
                    attributes:['name','email'],
                },
                {
                    model: Kelas,
                    attributes: ["namaKelas"],
                },
                {
                    model:Kamar,
                    attributes: ["namaKamar"]
                }
            ]
            });
        }else{
            response = await Santri.findOne({
                attributes:['uuid','nis', 'nameLengkap','tempatLahir', 'tanggalLahir','jenisKelamin', 'noTelepon', 'agama', 'alamat', 'asalSekolah', 'statusSantri', 'namaWali', 'pekerjaanWali', 'alamatWali', 'noTeleponWali'],
                where:{
                    [Op.and]:[{id: santri.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSantri = async(req, res) =>{
    const { nis, nameLengkap, tempatLahir, tanggalLahir, jenisKelamin, noTelepon, agama, 
        alamat, asalSekolah, statusSantri, namaWali, pekerjaanWali, alamatWali, noTeleponWali, kelasId, kamarId} = req.body;
    try {
          // Cek keberadaan kelasId
    const kelas = await Kelas.findByPk(kelasId);
    if (!kelas) {
      return res.status(400).json({ error: "Invalid kelasId" });
    }
       const santri = await Santri.create({
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
            kelasId,
            kamarId,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Santri Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateSantri = async(req, res) =>{
    try {
        const santri = await Santri.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!santri) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {
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
            noTeleponWali} = req.body;
        if(req.role === "admin"){
            await Santri.update({
                nis: nis,
                nameLengkap:nameLengkap,
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
                userId: req.userId},{
                    where:{
                        id: santri.id
                    }
                });
        }else{
            if(req.userId !== santri.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Santri.update({nis, nameLengkap, tempatLahir, tanggalLahir, jenisKelamin, noTelepon, agama, 
                alamat, asalSekolah, statusSantri, namaWali, pekerjaanWali, alamatWali, noTeleponWali},{
                where:{
                    [Op.and]:[{id: santri.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data Santri updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSantri = async(req, res) =>{
    try {
        const santri = await Santri.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!santri) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {nis, nameLengkap, tempatLahir, tanggalLahir, jenisKelamin, noTelepon, agama, 
            alamat, asalSekolah, statusSantri, namaWali, pekerjaanWali, alamatWali, noTeleponWali} = req.body;
        if(req.role === "admin"){
            await Santri.destroy({
                where:{
                    id: santri.id
                }
            });
        }else{
            if(req.userId !== santri.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Santri.destroy({
                where:{
                    [Op.and]:[{id: santri.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data Santri deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}