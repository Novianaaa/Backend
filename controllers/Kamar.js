import { Op } from "sequelize";
import Kamar from "../models/KamarModel.js";

export const getKamar = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Kamar.count({
        where:{
            [Op.or]:[{namaKamar:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Kamar.findAll({
        where:{
            [Op.or]:[{namaKamar:{
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
      // try {
      //     const response = await Kamar.findAll({
      //         attributes:['uuid', 'namaKamar']
      //     });
      //     res.status(200).json(response);
      // } catch (error) {
      //     res.status(500).json({msg: error.message});
      // }
  }
export const getKamarById = async (req, res) => {
  try {
    const response = await Kamar.findOne({
      attributes: ["uuid", "namaKamar"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createKamar = async (req, res) => {
  const { namaKamar } = req.body;
  try {
    await Kamar.create({
      namaKamar: namaKamar,
    });
    res.status(201).json({msg: "Create Data Kamar Succesfuly"})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateKamar = async(req, res) => {
  const kamar = await Kamar.findOne({
    where: {
      uuid:req.params.id
    }
  });
  if (!kamar) return res.status(404).json({msg: " Data Kamar Tidak ditemukan"});
  const {namaKamar} = req.body
  try {
    await Kamar.update({
      namaKamar: namaKamar
    }, {
      where:{
        id: kamar.id
      }
    });
    res.status(200).json({msq: " Data Kamar Updated"})
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
};
export const deleteKamar = async (req, res) => {
  const kamar = await Kamar.findOne({
    where: {
      uuid:req.params.id
    }
  });
  if (!kamar) return res.status(404).json({msg: " Data Kamar Tidak ditemukan"});
  try {
    await Kamar.destroy({
      where:{
        id: kamar.id
      }
    });
    res.status(200).json({msg: "Delete Data Successfuly"});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
};

