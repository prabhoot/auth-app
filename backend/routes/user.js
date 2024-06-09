const express = require('express');
const router = express.Router();

const { login, signup, logout } = require('../controllers/Auth');
const { auth } = require('../middlewares/auth');

router.post('/auth/login', login);
router.post('/auth/signup', signup);
router.post('/auth/logout',logout);

router.get('/test', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Protected route for test',
  });
});

// router.get("/employ",auth,isEmploy,(req,res)=>{
//     res.json({
//         success:true,
//         message:"Welcome to Protected route for employees"
//     })
// });
// router.get("/admin",auth,isAdmin,(req,res)=>{
//     res.json({
//         success:true,
//         message:"Welcome to Protected route for admin"
//     })
// });

module.exports = router;
