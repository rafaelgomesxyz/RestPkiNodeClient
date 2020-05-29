const { Readable } = require('stream');
const { ReadableStreamClone } = require('./stream-clone');

main();

function main(){
    let stream = new Readable();
    stream._read = () => {}; // _read is required but you can noop it
    stream.push('Teste de streams para visualizar como elas funcionam');
    stream.push(null);
    // let s = printData(stream);
    let v = new ReadableStreamClone(stream);
    stream = new ReadableStreamClone(stream);

    v.on('data', (chunck) => {
        console.log(chunck.toString());
    });
    v.on('end', () => {
        console.log('AcabouV');
    });
    v.on('error', () => {
        console.log('ErroV');
    });
    setTimeout(()=>{
        let v = new ReadableStreamClone(stream);
        stream = new ReadableStreamClone(stream);
        v.on('data', (chunck) => {
            console.log(chunck.toString());
        });
        v.on('end', () => {
            console.log('AcabouS');
        });
        v.on('error', () => {
            console.log('ErroS');
        });
    }, 10000);
}

function printData(stream){
    let s = new Readable();
    stream.on('data', (chunck) => {
        s.push(chunck);
        console.log(chunck);
    });
    stream.on('end', () => {
        s.push(null);
        console.log('Acabou');
    });
    stream.on('error', () => {
        console.log('Erro');
    });
    return s;
}