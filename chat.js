var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 8080;

var users = [];

app.get('/',function(req,res){
	//request : son cabeceras y datos que nos envia el navegador.
	//response : son todo lo que enviamos desde el servidor.
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    socket.on('login', function(data) {
        console.log('a user ' + data.userId + ' connected');
        //saving userId to array with socket ID
        // users[socket.id] = data.userId;
        users.push(data.userId);
        io.emit('login', users);
    });

    socket.on('disconnect', function(){
        users.splice(users.indexOf(socket.id), 1);
        console.log('user ' + users[socket.id] + ' disconnected');
        io.emit('disconnect', users);
    });
	
	
    socket.on('actualizarEstrellas', function(datos){
        io.emit('actualizarEstrellas',datos);
    });
    socket.on('marcar', function(datos){
        io.emit('marcar',datos);
    });
    socket.on('iniciarPartida', function(datos){
        io.emit('iniciarPartida',datos);
    });
    socket.on('listaTurnos', function(datos){
        io.emit('listaTurnos',datos);
    });
    socket.on("enviaReto",function(datos){
        io.emit("enviaReto",datos);
    });
    socket.on("aceptaReto",function(datos){
        io.emit("aceptaReto",datos);
    });
    socket.on("terminaJuego",function(datos){
        io.emit("terminaJuego",datos);
    });
    socket.on("categoriaItems",function(datos){
        io.emit("categoriaItems",datos);
    });
    socket.on("abandonarPartida",function(datos){
        io.emit("abandonarPartida",datos);
    });
    socket.on("actualizaEstadisticas",function(datos){
        io.emit("actualizaEstadisticas",datos);
    });
    socket.on("turnoPorFinDeTiempo",function(datos){
        io.emit("turnoPorFinDeTiempo",datos);
    });
    socket.on("usuarioDisponible",function(datos){
        io.emit("usuarioDisponible",datos);
    });
});

http.listen(PORT,function(){
	console.log('el servidor esta escuchando el puerto %s',PORT);
});
