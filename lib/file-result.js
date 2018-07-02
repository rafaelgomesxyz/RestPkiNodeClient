'use strict';
const fs = require('fs');

class FileResult {

   constructor(client, file) {
      this._client = client;
      this._file = file;
   }

   get content() {
      if (this._file) {
         return new Buffer(this._file, 'base64');
      }
      return null;
   }

   get contentBase64() {
      if (this._file) {
         return this._file;
      }
      return null;
   }

   writeToFile(path) {
      return new Promise((resolve, reject) => {
         if (this._file) {
            fs.writeFile(path, new Buffer(this._file, 'base64'), (err) => {

               if (err) {
                  reject(err);
               } else {
                  resolve();
               }

            });
         }
         resolve();
      });
   }

   writeToFileSync(path) {
      if (this._file) {
         fs.writeFileSync(path, new Buffer(this._file, 'base64'));
      }
   }
}

exports.FileResult = FileResult;