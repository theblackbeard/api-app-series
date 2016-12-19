"use strict";

const Serie = require('../serie.js')
,     Season = require('../season.js')

exports.init = (req, res, next, id) => {
  Serie.findById(id, (err, serie) => {
    if(err){
      next(err);
    }else if(serie){
      req.serie = serie;
      next();
    }else{
      next(new Error('failed to load user'));
    }
  })
}


exports.index = (req, res) => {
  Serie.find({}, (err, series) => {
      if(err) console.log(err);
      if(series.length > 0) return res.json({success: true, series: series})
      else return res.json({success: false, series: 0})
  });
}

exports.show = (req, res) => {
    return res.json({success: true, serie: req.serie})
}


exports.add = (req, res) => {

    registerEpFisrt(function(result){
        console.log(result)

    })



    function registerEpFisrt(callback){
        let season = new Season(req.body);
        season.save((err, result) => {
            if(err) callback(false);
            callback(true);
        })

    }


    /*
  let season1 = new Season();
  season1.episodes = [
      {
          title: "Piloto",
          viwed: false
      }
  ]

let season2 = new Season();
  season2.episodes = [
      {
          title: "Point Zero",
          viwed: true
      }
  ]

 season1.save();
 season2.save();

 let serie = new Serie();
 serie.title = "iZombie";
 serie.media = [season1._id, season2._id];
 serie.save((err, data) => {
     if(err) console.log(err);
     console.log(data)
 });
*/

}


exports.edit = (req, res) => {
     Serie.update(req.serie, req.body, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
  });
}

exports.episode = (req, res) => {
    let result = [];
    req.serie.media.forEach((list) =>{
       console.log(list)
    })
}

exports.addE = (req, res) => {
    Season.create(req, body, (err, result) => {
         if(err) return res.json({success: false, result: err.errors})
         return res.json({success: true, result: result});
    })
}

exports.cancel = (req, res) => {
    Serie.remove(req.serie, (err, result) => {
        res.json(result);
    })

}