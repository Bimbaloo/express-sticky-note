var express = require('express');
var router = express.Router();
var Note = require('../models/note')

/* 获取所有的 notes */

function error(res) {
  res.send({
    status: 1,
    errorMsg: '数据库异常'
  })
}

router.get('/notes', function(req, res, next) {
  var ret = {
    status: 0
  }
  Note.findAll({raw: true}).then(function(notes) {
    ret.data = notes;
    console.log(notes)
    res.send(ret);
  }).catch(function(){
    error(res);
  })
});

/*新增note*/
router.post('/notes/add', function(req, res, next){
  if (!req.body.note) {
    return res.send({status: 2, errorMsg: '内容不能为空'});
  }
  var note = req.body.note;
  Note.create({text: note}).then(function(){
    res.send({status: 0})
  }).catch(function(){
    error(res)
  })
})

/*修改note*/
router.post('/notes/edit', function(req, res, next){
  var noteId = req.body.id;
  var note = req.body.note;
  Note.update({text: note}, {where:{id: noteId}}). then(function(){
    console.log('save ok')
  }).catch(function(e){
    console.log('delete error')
  })
})

/*删除note*/
router.post('/notes/delete', function(req, res, next){
  var noteId = req.body.id
  console.log(noteId)
  var note = Note.build
  Note.destroy({where:{id:noteId}}).then(function(){
    res.send({status: 0})
  }).catch(function(e){
    console.log('delete error')
  })
})

module.exports = router;
