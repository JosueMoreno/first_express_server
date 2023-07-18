const { io } = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Nirvana'));
bands.addBand(new Band('Rolling Stones'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Guns & Roses'));

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

/*     client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload['nombre']);
        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    }); */
    
    /* client.on('msg', ( payload ) => {
        console.log('%s', payload['message']);
        io.emit( 'event', { msg: 'Mensaje recibido de flutter' } );
    }); */

    client.on('emitir-mensaje', ( payload ) => {
        //console.log('%s', payload['message']);
        io.emit( 'msg', payload);
    });

    client.on('add-vote-band', (band_id) => {
        bands.voteBand(band_id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload['name']));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload['id']);
        io.emit('active-bands', bands.getBands());
    });
});