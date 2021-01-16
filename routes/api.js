const express = require('express');
const router = express.Router();
const room = require('../db/models/room');

router.get('/', async (req,res) => {
    try{
        const roomList = await room.find({});
        res.json(roomList);
    }
    catch{
        res.json({msg:"Something went wrong.", success:false});
    }
})

module.exports = router;