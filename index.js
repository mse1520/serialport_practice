const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const requestScaleData = [0x51, 0x0d, 0x0a];
const requestScaleZero = [0x5A, 0x0d, 0x0a];
const CRLF = [0x0d, 0x0a];

const port = new SerialPort('COM3', {
    baudRate: 9600,
    dataBits: 7,
    parity: 'even',
    stopBits: 1,
    autoOpen: false
});

const parser = new Readline({ delimiter: CRLF });
port.pipe(parser);

parser.on('data', data => {
    console.log(data);
});

port.open(error => {
    if (error) return console.log('open error: ', error.message);
    console.log('port open!!');
});

port.write(requestScaleData, error => error ? console.log('port write: ', error.message) : console.log('send message!!'));

setTimeout(() => {
    port.close(error => error ? console.log('port close: ', error.message) : console.log('port close!!'));
}, 2000);