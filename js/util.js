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
