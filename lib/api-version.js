'use strict';

class ApiVersion{

    constructor(v){
        if((!v) && (/([0-9.])$/.test(v))){
            throw new Error(`Invalid version.`);
        }

        this._versionStr = v;
        this._versionArr = v.split('.').map(n => Number(n));
    }

    isLessThanOrEqualTo(otherVersion) {

        compResult = compareElementsBasedOnThisInstance(otherVersion);
        return compResult <= 0;
    }

    isLessThan(otherVersion) {

        compResult = compareElementsBasedOnThisInstance(otherVersion);
        return compResult == -1;
    }

    isEqualTo(otherVersion) {

        compResult = compareElementsBasedOnThisInstance(otherVersion);
        return compResult == 0;
    }

    isGreaterThan(otherVersion) {

        compResult = compareElementsBasedOnThisInstance(otherVersion);
        return compResult == 1;
    }

    isGreaterThanOrEqualTo(otherVersion) {

        compResult = compareElementsBasedOnThisInstance(otherVersion);
        return compResult >= 0;
    }

    compareElementsBasedOnThisInstance(otherVersion) {
        try {
            for (i = 0; i < this._versionArr.length; i++) {
                if (i >= otherVersion.getVersionArr().length) {
                    return 1;
                }
                if (versionArr[i] < otherVersion.getVersionArr()[i]) {
                    return -1;
                } else if (versionArr[i] > otherVersion.getVersionArr()[i]) {
                    return 1;
                }
            }
            if (versionArr.length < otherVersion.getVersionArr().length) {
                return -1;
            } else {
                return 0;
            }
        } catch (err) {
            throw new Error('Invalid object provided as parameter');
        }
    }

    getVersionArr(){
        return this._versionArr;
    }

    getVersionStr(){
        return this._versionStr;
    }

    get versionArr(){
        return this.getVersionArr();
    }

    get versionStr(){
        return this.getVersionStr();
    }
}

exports.ApiVersion = ApiVersion;