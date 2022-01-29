const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const Product=require('./models/product')
mongoose.connect('mongodb://localhost:27017/farmStand', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(
    () => { console.log("MONGO CONNECTION OPEN!!")})
    .catch(err => {console.log("OH NO MONGO CONNECTION ERROR!!")
   console.log(err) }
  )
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.get('/products',async(req,res)=>{
    const products=await Product.find({})
    //console.log(products)
   res.render('products/index.ejs',{products})
   //res.send('ALL PRODUCTS')
})
app.get('/products/new',(req,res)=>{
    res.render('products/new.ejs')
    //res.send('making your product!')
})
app.post('/products',(req,res)=>{
console.log(req.body)
//const newProduct=new Product(req.body);
//await newProduct.save();
//console.log(newProduct)
res.send('making your Product! ')
//res.redirect()
})
app.get('/products/:id',async(req,res)=>{
    const { id }=req.params;
    const product=await Product.findById(id)
   // console.log(product)
    //res.send('details page!!')
    res.render('products/show.ejs',{ product })
})
app.get('/products/:id/edit', async (req,res)=>{
    const { id }=req.params;
    const product=await Product.findById(id);
    res.render('products/edit',{ product })
    
})
app.put('/products/:id', async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    console.log(req.body);
    res.redirect('/products/${product._id}')
    //res.send('PUT!!!');
})

app.listen(3000,()=>{
    console.log("APP IS LISTENING ON PORT 3000!!");
})