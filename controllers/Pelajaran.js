import Pelajaran from "../models/PelajaranModel.js";
import Ustadz from "../models/UstadzModel.js";
import Kelas from "../models/KelasModel.js";
import { Op } from "sequelize";

export const getPelajaran = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Pelajaran.count({
        where:{
            [Op.or]:[
              {jenisPelajaran:{
                [Op.like]: '%'+search+'%'
            }},
            {namaKitab:{
                [Op.like]: '%'+search+'&'
            }}],
        }
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Pelajaran.findAll({
      attributes: ["uuid", "jenisPelajaran", "namaKitab", "ustadzId"],
      include: [
        {
          model: Ustadz,
          attributes: ["namaUstadz"],
        },
        {
          model: Kelas,
          attributes: ["namaKelas"],
        },
      ],
        where:{
            [Op.or]:[{jenisPelajaran:{
                [Op.like]: '%'+search+'%'
            }},{namaKitab:{
                [Op.like]: '%'+search+'&'
            // }},{namaUstadz:{
            //     [Op.like]: '%'+search+'&'
            }}],

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
  };
//   try {
//     const response = await Pelajaran.findAll({
//       attributes: ["uuid", "jenisPelajaran", "namaKitab", "ustadzId"],
//       include: [
//         {
//           model: Ustadz,
//           attributes: ["namaUstadz"],
//         },
//         {
//           model: Kelas,
//           attributes: ["namaKelas"],
//         },
//       ],
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getPelajaranById = async (req, res) => {
  try {
    const response = await Pelajaran.findOne({
      attributes: ["uuid", "jenisPelajaran", "namaKitab", "ustadzId", "kelasId"],
      where: {
        uuid: req.params.id,
      },
      include: [
        {
          model: Ustadz,
          attributes: ["namaUstadz"],
        },
        {
          model: Kelas,
          attributes: ["namaKelas"],
          // as: "kelas", // Menambahkan as: "kelas" sebagai alias relasi dengan model Kelas
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPelajaran = async (req, res) => {
  const { jenisPelajaran, namaKitab, ustadzId, kelasId } = req.body;

  try {
    // Cek keberadaan kelasId
    const kelas = await Kelas.findByPk(kelasId);
    if (!kelas) {
      return res.status(400).json({ error: "Invalid kelasId" });
    }

    // Buat data pelajaran
    const pelajaran = await Pelajaran.create({
      jenisPelajaran,
      namaKitab,
      ustadzId,
      kelasId,
    });

    res.status(201).json({ message: "Pelajaran created successfully", pelajaran });
  } catch (error) {
    console.error("Error creating pelajaran:", error);
    res.status(500).json({ error: "Error creating pelajaran" });
  }
};

export const updatePelajaran = async (req, res) => {
  const pelajaran = await Pelajaran.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pelajaran) return res.status(404).json({ msg: "Data pelajaran tidak ditemukan" });

  const { jenisPelajaran, namaKitab, ustadzId, kelasId } = req.body;

  try {
    await Pelajaran.update(
      {
        jenisPelajaran: jenisPelajaran,
        namaKitab: namaKitab,
        ustadzId: ustadzId,
        kelasId: kelasId,
      },
      {
        where: {
          uuid: pelajaran.uuid,
        },
      }
    );
    res.status(200).json({ msg: "Data pelajaran updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePelajaran = async (req, res) => {
  const pelajaran = await Pelajaran.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!pelajaran) return res.status(404).json({ msg: "Data pelajaran tidak ditemukan" });

  try {
    await Pelajaran.destroy({
      where: {
        uuid: pelajaran.uuid,
      },
    });
    res.status(200).json({ msg: "Data pelajaran deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
