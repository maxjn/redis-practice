require('dotenv').config()

const express = require('express')


const reposRoutes = require('./routes/reposRoutes')


const app = express()


// Routes

app.use('/repos',reposRoutes)


const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listening on Port ${port}`)
})
