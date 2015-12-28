export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => context.querySelectorAll(selector);

export function each(subject, cb, context) {
	for (let i = 0, l = subject.length; i < l; i++) {
		cb.call(context, subject[i], i, subject);
	}
}

export function on(element, event, cb) {
	element.addEventListener(event, cb);
}

export function getSlideHeading(slide) {
	for (let element of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
		let heading = $(element, slide);
		if (heading) {
			return heading.textContent;
		}
	}

	let image = $('img', slide);
	if (image) {
		return image.getAttribute('alt');
	}
}

export function parseColor(str) {
	// This handles both rgb( and rgba(
	if (str.indexOf('rgb') === 0) {
		let values = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)/.exec(str);

		if (!Array.isArray(values)) {
			return null;
		}

		return values
			.map((value) => parseInt(value, 10))
			.filter((value) => typeof value === 'number' && !isNaN(value));
	}
}

export function isWhite(color) {
	if (typeof color === 'string') {
		return isWhite(parseColor(color));
	}

	return color.slice(0, 3).every((num) => num < 5);
}
