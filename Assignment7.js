var express = require('express');

//console.log("in server.js");
var app = express();
var CRUD=require('./CRUD.js');

app.get('/students/read',CRUD.read);
app.post('/students/create',CRUD.create);
app.put('/students/update',CRUD.update);
app.delete('/students/delete',CRUD.delete);
app.listen(3001);
console.log("server started\' on port 3001...");