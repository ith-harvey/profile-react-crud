const express = require('express');
const router = express.Router();
const Comment = require('../model/comments');

//retrieve all comments from the database
router.get('/',function(req, res, next) {
  //looks at our Comment Schema
    Comment.find(function(err, comments) {
      if (err)
      res.send(err);
      //responds with a json object of our database comments.
      res.json(comments)
    });
  })


//post new comment to the database
router.post('/',function(req, res, next) {
  console.log('in post');
    var newComment = new Comment({
     author : req.body.author,
     text : req.body.text
    });
    //body parser lets us use the req.body
    newComment.save(function(err) {
     if (err) {
       res.send(err);
     } else {
       res.json({ message: 'Comment successfully added!' });
     }
    });
});

//edit comment in the database
router.put('/:id',function(req, res, next) {

  Comment.findById(req.params.id, function(err, comment) {
    if (err)
      res.send(err);

    //setting the new author and text to whatever was changed. If
    //nothing was changed we will not alter the field.

    (req.body.author) ? comment.author = req.body.author : null;
    (req.body.text) ? comment.text = req.body.text : null;
    //save comment
    comment.save(function(err) {
    if (err)
      res.send(err);

      res.json({ message: 'Comment has been updated'});
    });
  });
})

//delete a comment from our database
router.delete('/:id', function (req, res, next) {
  //selects the comment by its ID, then removes it.
  Comment.remove({ _id: req.params.id }, function(err, comment) {
  if (err)
  res.send(err);
  res.json({ message: 'Comment has been deleted' })
  })
});

module.exports = router;
