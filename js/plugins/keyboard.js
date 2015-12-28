import * as util from '../util';

const keyCodes = {
	left: 37,
	right: 39,

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
 * @constructor
 */
export default function KeyboardPlugin(slides) {
	util.on(document, 'keydown', function (e) {
		if (e.keyCode === keyCodes.left) {
			slides.back();
		} else if (e.keyCode === keyCodes.right) {
			slides.forward();
		}

		let keyboardPosition = keyboardOrder.indexOf(e.keyCode);
		if (keyboardPosition !== -1) {
			if (e.shiftKey) {
				slides.goToType('title', keyboardPosition);
			} else {
				slides.goTo(keyboardPosition);
			}
		}
	});
}
