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

	static async getPreset(client, urlSegment) {
		if (urlSegment in cachedPresets) {
			return cachedPresets[urlSegment];
		}
		try {
			let preset = await client.getRestClient().get(`Api/PadesVisualPositioningPresets/${urlSegment}`);
			cachedPresets[urlSegment] = preset;
			return preset;

		} catch (err) {
			throw err;
		}
	}
}

exports.PadesVisualPositioningPresets = PadesVisualPositioningPresets;