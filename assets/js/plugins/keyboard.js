import * as util from '../util';

const keyCodes = {
	left: 37,
	right: 39,

	// Lazer pointer!
	pageUp: 33,
	pageDown: 34,

	semicolon: 186,
	comma: 188,
	fullstop: 190
};

// 0-9
for (let i = 48; i <= 57; i++) {
	keyCodes[String.fromCharCode(i)] = i;
}

// A-Z
for (let i = 65; i <= 90; i++) {
	keyCodes[String.fromCharCode(i)] = i;
}

const chars = {
	';': keyCodes.semicolon,
	',': keyCodes.comma,
	'.': keyCodes.fullstop
};

const keyboardOrder = '1234567890QWERTYUIOPASDFGHJKL;ZXCVBNM,.'
		.split('')
		.map((letter) => chars[letter] || keyCodes[letter]);

/**
 * Plugin to make the slides controllable using the keyboard.
 *
 * @param {Slides} slides The Slides object.
 * @param {object} [options] Some configuration. See defaults.
 * @constructor
 */
export default function KeyboardPlugin(slides, options) {
	options = Object.assign({
		numberControls: true
	}, options);

	util.on(document, 'keydown', function (e) {
		if (e.metaKey) {
			return;
		}

		if (e.keyCode === keyCodes.left || e.keyCode === keyCodes.pageUp) {
			slides.back();
		} else if (e.keyCode === keyCodes.right || e.keyCode === keyCodes.pageDown) {
			slides.forward();
		}

		if (options.numberControls) {
			let keyboardPosition = keyboardOrder.indexOf(e.keyCode);
			if (keyboardPosition !== -1) {
				if (e.shiftKey) {
					slides.goToType('title', keyboardPosition);
				} else {
					slides.goTo(keyboardPosition);
				}
			}
		}
	});
}
