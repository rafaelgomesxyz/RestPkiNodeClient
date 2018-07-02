'use strict';

class Color {

   constructor(red, green, blue, alpha) {
      alpha = alpha || 100;

      this._alpha = alpha;
      this._red = red;
      this._green = green;
      this._blue = blue;
   }

   static fromRGBString(rgbString, alpha) {
      alpha = alpha || 100;

      let index = 0;
      if (rgbString[0] === '#') {
         index += 1;
      }
      let red = parseInt(rgbString.substring(index, index + 2), 16);
      let green = parseInt(rgbString.substring(index + 2, index + 4), 16);
      let blue = parseInt(rgbString.substring(index + 4, index + 6), 16);
      return new Color(red, green, blue, alpha);
   }

   get alpha() {
      return this._alpha;
   }

   get blue() {
      return this._blue;
   }

   get green() {
      return this._green;
   }

   get red() {
      return this._red;
   }

   toModel() {
      return {
         alpha: this._alpha,
         blue: this._blue,
         green: this._green,
         red: this._red
      };
   }
}

exports.Color = Color;