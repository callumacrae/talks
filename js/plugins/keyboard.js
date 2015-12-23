import * as util from '../util';

const keyCodes = {
	left: 37,
	right: 39
};

/**
 * Plugin to make the slides controllable using the keyboard.
 *
 * @param {Slides} slides The Slides object.
 * @constructor
 */
export default function KeyboardPlugin(slides) {
	util.on(document, 'keydown', function (e) {
		if (e.keyCode === keyCodes.left) {
			slides.back();
		} else if (e.keyCode === keyCodes.right) {
			slides.forward();
		}
	});
}
