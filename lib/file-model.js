'use strict';
class FileModel {
    constructor(){
        this._mimeType = null;
        this._content = null;
        this._blobToken = null;
        this._url = null;
    }

    getMimeType(){
        return this._mimeType;
    }
    getContent(){
        return this._content;
    }
    getBlobToken(){
        return this._blobToken;
    }
    getUrl(){
        return this._url;
    }

    setMimeType(value){
        this._mimeType = value;
    }
    setContent(value){
        this._content = value;
    }
    setBlobToken(value){
        this._blobToken = value;
    }
    setUrl(value){
        this._url = value;
    }

    get mimeType(){
        return this.getMimeType()
    }
    set mimeType(value){
        this.setMimeType(value)
    }

    get content(){
        return this.getContent()
    }
    set content(value){
        this.setContent(value)
    }

    get blobToken(){
        return this.getBlobToken()
    }
    set blobToken(value){
        this.setBlobToken(value)
    }

    get url(){
        return this.getUrl()
    }
    set url(value){
        this.setUrl(value)
    }

}
exports.FileModel = FileModel;