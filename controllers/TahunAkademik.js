import TahunAkademik from "../models/TahunAkademikModel.js";

export const getTahunAkademik = async (req, res) => {
    try {
        const response = await TahunAkademik.findAll({
            attributes:['tahunAjar', 'semester']
        });
            res.status(200).json(response);
        } catch (error){
            res.status(500).json({msg: error.message});
        }
}
export const getTahunAkademikById = async (req, res) => {
    try {
        const response = await TahunAkademik.findOne({
          attributes: ["uuid", "namaKamar", "semester"],
          where: {
            uuid: req.params.id,
          },
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
};
export const createTahunAkademik = async (req, res) => {
    const { tahunAjar, semester } = req.body;
    try {
      await tahunAjar.create({
        tahunAjar: tahunAjar,
        semester: semester,
      });
      res.status(201).json({msg: "Create Data Tahun Akademik Succesfuly"})
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
export const updateTahunAkademik = async (req, res) => {
    const tahunAkademik = await TahunAkademik.findOne({
        where: {
          uuid:req.params.id
        }
      });
      if (!tahunAkademik) return res.status(404).json({msg: " Data Kamar Tidak ditemukan"});
      const {tahunAjar, semester} = req.body
      try {
        await TahunAkademik.update({
          tahunAjar: tahunAjar,
          semester: semester,
        }, {
          where:{
            id: tahunAkademik.id
          }
        });
        res.status(200).json({msq: " Data Tahun Akademik Updated"})
      } catch (error) {
        res.status(400).json({msg: error.message});
      }
    };
export const deleteTahunAkademik = async (req, res) => {
    const tahunAkademik = await TahunAkademik.findOne({
        where: {
          uuid:req.params.id
        }
      });
      if (!tahunAkademik) return res.status(404).json({msg: " Data Kamar Tidak ditemukan"});
      try {
        await TahunAkademik.destroy({
          where:{
            id: tahunAkademik.id
          }
        });
        res.status(200).json({msg: "Delete Data Successfuly"});
      } catch (error) {
        res.status(400).json({msg: error.message});
      } 
};