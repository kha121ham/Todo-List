const express = require('express');
const app = express();
const PORT = process.env.Port || 5000 ;
const connectDb = require('./config/connectDb');

//Connect Database
connectDb();

//Init Middleware
app.use(express.json({extended:false}))

//Define routes
app.use('/api/user' , require('./routes/api/user'));
app.use('/api/profile' , require('./routes/api/profile'));
app.use('/api/todo' , require('./routes/api/todo'));
app.use('/api/auth' , require('./routes/api/auth'));

app.get('/',(req,res)=>res.send('API Running'))
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`) );
