const {client} = require('../../utils/db')

// Caching Middleware
const repoInfoExists = async (req,res,next)=>{
    try {

        const {username} = req.params;

        client.get(username).then((data)=>{
            if(data!==null){
                res.send(`<h1><span style="color:red;">${username}</span> Has <span style="color:red;">${data}</span> Public Repositories. </h1>`);

            }else{
                next()
            }
        }).catch((err)=>{
            if(err) throw err
        })
        
    } catch (error) {
        console.log('Error Fetching From Redis')
        
    }
}

module.exports = {repoInfoExists}