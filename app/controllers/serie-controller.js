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
   Serie.create(req.body, (err, result) => {
     if(err) return res.json(err);
      return res.json(result);
   });
}

exports.edit = (req, res) => {
  Serie.update(req.serie, req.body,(err, result) => {
    if(err) return res.json(err);
     return res.json(result);
  } )
}

exports.remove = (req, res) => {
  Serie.remove({_id: req.serie._id}, (err, result) => {
      if(err) return res.json(err);
      return res.json(result);
  })
}
