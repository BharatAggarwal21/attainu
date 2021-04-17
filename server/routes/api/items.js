const express = require('express');
const router = express.Router();
const auth=require('../../middleware/auth');
const Item = require('../../models/Item');
router.get('/',async(req,res)=>{
   
    Item.find().then(items => res.json(items)).catch(err=>res.json(err));
});
router.get('/edit/:id',async(req,res)=>{
  
  const item=await Item.findById(req.params.id);
  if(!item)
    res.status(400);
  else  
    res.json(item);
});
router.post('/edit/:id', auth,async(req, res)=>{
  const newItem = new Item({
    title: req.body.title,
    content:req.body.content,
    author:req.body.id
  }); 
  console.log("xyz"+req.params.id);
  ///Item.updateOne(req.params.id, newItem,{upsert:false})
    ///.then(res=>{res.json("success")})
    //.catch(err=>res.json(err));
});
router.post('/add', auth , async (req, res) => {
    const newItem = new Item({
      title: req.body.state.title,
      content:req.body.state.content,
      author:req.user.id
    });    
    
    try {
      const item = await newItem.save();
      if (!item) throw Error('Something went wrong saving the item');
  
      res.status(200).json(item);
    } catch (e) {
      res.status(405).json({ msg: e.message });
    }
  });

router.delete('/edit/:id',auth,async(req,res)=>{
    Item.findByIdAndDelete(req.params.id)
    .then(item => res.json({success:true}))
    .catch(err => res.status(404).json({success:false}));
});
module.exports = router;