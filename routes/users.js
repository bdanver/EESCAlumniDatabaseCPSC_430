const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
  const username = req.body.username;

  const newUser = new User({
    username
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json("User deleted."))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/edit/:id', (req,res) => {
  User.findByIdAndUpdate(req.params.id, {username: req.body.newUsername},{upsert: true}, function(err, docs){
   if (err){ 
     console.log(err) 
 } 
 else{ 
   res.sendStatus(200)
     console.log("Updated User : ", docs); 
 } 
  })
})

module.exports = router;
