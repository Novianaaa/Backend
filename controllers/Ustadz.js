import { Op } from "sequelize";
import Ustadz from "../models/UstadzModel.js";

export const getUstadz = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Ustadz.count({
      where: {
        [Op.or]: [
          {
            namaUstadz: {
              [Op.like]: '%' + search + '%'
            }
          },
          {
            alamatUstadz: {
              [Op.like]: '%' + search + '&'
            }
          }
        
        ]
      }
    });
  
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Ustadz.findAll({
      where: {
        [Op.or]: [
          {
            namaUstadz: {
              [Op.like]: '%' + search + '%'
            }
          },
          {
            alamatUstadz: {
              [Op.like]: '%' + search + '&'
            }
          }
        ]
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
  };
export const getUstadzById =async (req, res) => {
    try {
        const response = await Ustadz.findOne({
            attributes:['uuid',
            'namaUstadz',
            'alamatUstadz',
            'noTeleponUstadz', 
            'pendidikanUstadz', 
            'pekerjaanUstadz'],
            where : {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createUstadz =async (req, res) => {
    const {namaUstadz,
        alamatUstadz,
        noTeleponUstadz,
        pendidikanUstadz,
        pekerjaanUstadz
    } = req.body;
    try {
        await Ustadz.create({
            namaUstadz: namaUstadz,
            alamatUstadz: alamatUstadz,
            noTeleponUstadz: noTeleponUstadz,
            pendidikanUstadz: pendidikanUstadz,
            pekerjaanUstadz: pekerjaanUstadz
        });
        res.status(201).json({msg: "Create Data Ustadz Succesfully"});
    } catch (error) {
        res.status(400).json({msq: error.message});
    }
}
export const updateUstadz =async(req, res) => {
    const ustadz = await Ustadz.findOne({
        where: {
            uuid:req.params.id
        }
    });
    const {namaUstadz,
        alamatUstadz,
        noTeleponUstadz,
        pendidikanUstadz,
        pekerjaanUstadz
    } = req.body;
    try {
        await Ustadz.update({
            namaUstadz: namaUstadz,
            alamatUstadz: alamatUstadz,
            noTeleponUstadz: noTeleponUstadz,
            pendidikanUstadz: pendidikanUstadz,
            pekerjaanUstadz:pekerjaanUstadz
        }, {
            where:{
                id: ustadz.id
            }
        });
        res.status(200).json({msg: "Data Ustadz Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
export const deleteUstadz =async (req, res) => {
    const ustadz = await Ustadz.findOne({
        where: {
           uuid:req.params.id 
        }
    });
    if(!ustadz)return res.status(404).json({msg: "Data Ustadz tidak ditemukan"});
    try {
        await Ustadz.destroy({
            where:{
                id:ustadz.id
            }
        });
        res.status(200).json({msg: "Data Ustadz Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}