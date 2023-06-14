import { Op } from "sequelize";
import Kelas from "../models/KelasModel.js";

export const getKelas = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Kelas.count({
        where:{
            [Op.or]:[{namaKelas:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Kelas.findAll({
        where:{
            [Op.or]:[{namaKelas:{
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
        result: result.map(item => item.toJSON()),
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
      // try {
      //     const response = await Kelas.findAll({
      //         attributes:['uuid', 'namaKelas']
      //     });
      //     res.status(200).json(response);
      // } catch (error) {
      //     res.status(500).json({msg: error.message});
      // }
  }
export const getKelasById = async (req, res) => {
  try {
    const response = await Kelas.findOne({
      attributes: ["uuid", "namaKelas"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createKelas = async (req, res) => {
  const { namaKelas } = req.body;
  try {
    await Kelas.create({
      namaKelas: namaKelas,
    });
    res.status(201).json({msg: "Create Data Kelas Succesfuly"})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateKelas = async(req, res) => {
  const kelas = await Kelas.findOne({
    where: {
      uuid:req.params.id
    }
  });
  if (!kelas) return res.status(404).json({msg: " Data Kelas Tidak ditemukan"});
  const {namaKelas} = req.body
  try {
    await Kelas.update({
      namaKelas: namaKelas
    }, {
      where:{
        id: kelas.id
      }
    });
    res.status(200).json({msq: " Data Kelas Updated"})
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
};
export const deleteKelas = async (req, res) => {
  const kelas = await Kelas.findOne({
    where: {
      uuid:req.params.id
    }
  });
  if (!kelas) return res.status(404).json({msg: " Data Kelas Tidak ditemukan"});
  try {
    await Kelas.destroy({
      where:{
        id: kelas.id
      }
    });
    res.status(200).json({msg: "Delete Data Successfuly"});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
};

