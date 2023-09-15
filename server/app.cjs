// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
const {products} = require('../mocks/products.json')
const app = express()
app.disable('x-powered-by')
app.get('/',(req, res)=>{
    res.json({message : 'Hola mundo'})
})
app.get('/items',(req , res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-methods', 'GET')
    const {search} = req.query

    if(search){
        const filteredProduct = products.filter(product=> 
            product.brand.toLowerCase().includes(search.toLowerCase()) || 
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
            )
        res.json(filteredProduct)
    }
    res.json(products)
})
app.get('/items/:id' , (req , res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-methods', 'GET')
    const {id} = req.params
    const product = products.filter(product=> product.id ==id) 
    if(product) return res.json(product)
    res.status(404).json({Message : 'Producto no encontrado'})
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT ?? 1234

app.listen(PORT , ()=>{
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})