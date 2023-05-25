const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const {PORT} = require('./config/server-config');
const SetupAndStartServer = async ()=>{

const db = require('./models/index')
const ApiRoutes = require('./routes/index');

    app.listen(PORT,()=>{
        
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))

            
        
        app.use('/api',ApiRoutes);

        console.log(`Server is running on PORT ${PORT}`)

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }
    })
}

SetupAndStartServer(); 