import * as util from '../util';

/**
 * Plugin to change the URL when a slide changes.
 *
 * @param {Slides} slides The Slides object.
 * @param {object} opts Configuration.
 * @constructor
 */
export default function HashPlugin(slides, opts = { word: 'slide' }) {
	const match = new RegExp(`${opts.word}\\-(\\d+)`).exec(location.hash);
	if (match) {
		slides.goTo(parseInt(match[1]));
	}

	this.hooks = {
		slideChange: function (slideIndex) {
			location.hash = `#${opts.word}-${slideIndex}`;
		}
	}
}
