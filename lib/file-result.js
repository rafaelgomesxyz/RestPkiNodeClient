'use strict';
const fs = require('fs');
const { Readable } = require('stream');

const { FileModel } = require('./file-model');

class FileResult {

   constructor(client, file) {
      this._client = client;
      this._file = new FileModel(file);
   }

   async openRead() {
      if (this._file.getContent() != null) {
         let readable = new Readable();
         readable._read = () => {}; // _read is required but you can noop it
         readable.push(this._file.getContent());
         readable.push(null);
         return readable;
      } else {
         let content = await this._clientF.getRestClient().getStream(this._file.getUrl());
         return content;
      }
   }

   async getContent() {
      try {
         const content = await this.openRead();
         var data = [];
         content.on('data', function (chunk) {
            data.push(chunk);
         });
         content.on('end', function () {
            data = Buffer.concat(data);
            resolve(data);
         });
         content.on('error', function (e) {
            reject(e.message);
         });
         content.end();
      }
      catch (err) {
         return reject(err);
      }
   }

   async writeToFile(path) {
      if (this._file) {
         let content = await this.getContent();
         await fs.writeFile(path, new Buffer(content, 'base64'));
      }
   }

   getFile(){
      return this._file;
   }
   setFile(file){
      this._file = file;
   }

   get file(){
      return this.getFile();
   }
   set file(file){
      return this.setFile(file);
   }
}

exports.FileResult = FileResult;