var Readable = require('stream').Readable;

class ReadableStreamClone extends Readable {
	constructor(readableStream) {
		super();
		readableStream.on('data', (chunk) => {
			this.push(chunk);
		});
		readableStream.on('end', () => {
			this.push(null);
		});
		readableStream.on('error', (err) => {
			this.emit('error', err);
		});
		this._read = () => {
		}; // _read is required but you can noop it
	}
}

class StreamUtils {
	static streamToBuffer(stream) {
		return new Promise((resolve, reject) => {
			let buffer = [];
			stream.on('data', (chunk) => {
				buffer.push(chunk);
			});
			stream.on('end', () => {
				resolve(Buffer.concat(buffer));
			});
			stream.on('error', (err) => {
				reject(err);
			});
		});
	}
}

exports.StreamUtils = StreamUtils;
exports.ReadableStreamClone = ReadableStreamClone;