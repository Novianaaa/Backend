import { Op } from "sequelize";
import Jadwal from "../models/JadwalModel.js";
import Kelas from "../models/KelasModel.js";
import Pelajaran from "../models/PelajaranModel.js";
import Ustadz from "../models/UstadzModel.js";

export const getJadwal = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Jadwal.count({
        where:{
            [Op.or]:[{hari:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Jadwal.findAll({
      attributes: ["uuid", "hari", "kelasId", "pelajaranId", "ustadzId"],
            include: [
                {model: Kelas,
                attributes: ["namaKelas"],
            },
            {
                model: Pelajaran,
                attributes: ["namaKitab", "ustadzId"],
                include: [
                    {
                        model:Ustadz,
                        attributes:["namaUstadz"]
                    }
                ]
            },
            ],
        where:{
            [Op.or]:[{hari:{
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
    //     const response =  await Jadwal.findAll({
    //         attributes: ["uuid", "hari", "kelasId", "pelajaranId", "ustadzId"],
    //         include: [
    //             {model: Kelas,
    //             attributes: ["namaKelas"],
    //         },
    //         {
    //             model: Pelajaran,
    //             attributes: ["namaKitab", "ustadzId"],
    //             include: [
    //                 {
    //                     model:Ustadz,
    //                     attributes:["namaUstadz"]
    //                 }
    //             ]
    //         },
    //         ],
    //     });
    //     res.status(200).json(response);
    // } catch (error) {
    //     res.status(500).json({ msg: error.message });  
    // }
};
export const getJadwalById = async (req, res) => {
    try {
        const response = await Jadwal.findOne({
          attributes: ["uuid", "hari", "kelasId", "pelajaranId", "ustadzId"],            where: {
                uuid: req.params.id,
            },
            include: [
                {model: Kelas,
                attributes: ["namaKelas"],
            },
            {
                model: Pelajaran,
                attributes: ["namaKitab", "ustadzId"],
                include: [
                    {
                        model:Ustadz,
                        attributes:["namaUstadz"]
                    }
                ]
            },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
export const createJadwal = async (req, res) => {
    const { hari, kelasId, pelajaranId } = req.body;

    try {
        const jadwal = await Jadwal.create({
            hari,
            kelasId,
            pelajaranId
        });
        res.status(201).json({ message: "Jadwal created successfully", jadwal });
    } catch (error) {
        console.error("Error creating Jadwal:", error);
        res.status(500).json({ error: "Error creating Jadwal" });    
    }
};

export const updateJadwal = async (req, res) => {
    const jadwal = await Jadwal.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jadwal) return res.status(404).json({ msg: "Data Jadwal tidak ditemukan" });
  
    const { hari, kelasId, pelajaranId } = req.body;
  
    try {
      await Jadwal.update(
        {
          hari : hari,
          kelasId: kelasId,
          pelajaranId: pelajaranId
        },
        {
          where: {
            uuid: jadwal.uuid,
          },
        }
      );
      res.status(200).json({ msg: "Data Jadwal updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  export const deleteJadwal = async (req, res) => {
    const jadwal = await Jadwal.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!jadwal) return res.status(404).json({ msg: "Data jadwal tidak ditemukan" });
  
    try {
      await Jadwal.destroy({
        where: {
          uuid: jadwal.uuid,
        },
      });
      res.status(200).json({ msg: "Data jadwal deleted" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };