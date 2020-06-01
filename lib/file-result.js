'use strict';
const fs = require('fs');
const { Readable } = require('stream');

const { FileModel } = require('./file-model');
const { StreamUtils } = require('./stream-utils');

class FileResult {

   constructor(client, file) {
      this._client = client;
      this._file = new FileModel(file);
   }

   async openRead() {
      if (this._file.getContent()) {
         let readable = new Readable();
         readable._read = () => {}; // _read is required but you can noop it
         readable.push(this._file.getContent());
         readable.push(null);
         return readable;
      } else {
         if(this._file.getUrl()){
            let content = await this._client.getRestClient().getStream(this._file.getUrl());
            return content;
         } else {
            throw new Error('Cannot open stream of empty file');
         }
      }
   }

   async getContent() {
      if(this._file.getContent()){
         return new Buffer(this._file.getContent(), 'base64');
      }
      try {
         let content = await this.openRead();
         return await StreamUtils.streamToBufferAsync(content);
      }
      catch (err) {
         throw new Error('Error reading stream');
      }
   }

   async writeToFileAsync(path) {
      if (this._file) {
         let content = await this.getContent();
         fs.writeFileSync(path, new Buffer(content, 'base64'));
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