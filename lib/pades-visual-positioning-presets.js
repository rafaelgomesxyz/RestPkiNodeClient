'use strict';

let cachedPresets = [];

class PadesVisualPositioningPresets {

   static getFootnote(client, pageNumber, rows) {
      pageNumber = pageNumber || null;
      rows = rows || null;

      let urlSegment = 'Footnote';
      if (pageNumber) {
         urlSegment += `?pageNumber=${pageNumber}`;
      }

      if (rows) {
         urlSegment += pageNumber ? '&' : '?';
         urlSegment += `rows=${rows}`;
      }

      return PadesVisualPositioningPresets.getPreset(client, urlSegment);
   }

   static getNewPage(client) {
      return PadesVisualPositioningPresets.getPreset(client, 'NewPage');
   }

   static getPreset(client, urlSegment) {

      return new Promise((resolve, reject) => {

         if (urlSegment in cachedPresets) {
            resolve(cachedPresets[urlSegment]);
         }

         client.get(`Api/PadesVisualPositioningPresets/${urlSegment}`)
         .then((preset) => {

            cachedPresets[urlSegment] = preset;
            resolve(preset);

         })
         .catch((err) => reject(err));
      });
   }
}

exports.PadesVisualPositioningPresets = PadesVisualPositioningPresets;