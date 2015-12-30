import * as util from './util';

/**
 * Set up a new slides object.
 *
 * @param {HTMLElement} slideContainer Element containing .slide elements.
 * @param {number} [initial=0] Initial slide to go to. Defaults to the start.
 * @constructor
 */
function Slides(slideContainer, initial = 0) {
	this.slideContainer = slideContainer;
	this.slides = util.$$('.slide', slideContainer);

	this.plugins = [];

	this.goTo(initial);
}

/**
 * Go to slide of specified number (or do nothing if slide doesn't exist).
 *
 * @param {number} newIndex
 */
Slides.prototype.goTo = function goToSlide(newIndex) {
	if (newIndex < 0 || newIndex >= this.slides.length) {
		return;
	}

	util.each(this.slides, function (slide, index) {
		slide.style.display = (index === newIndex) ? 'block' : 'none';
	});

	// Set slides background to background of slide
	let style = getComputedStyle(this.slides[newIndex]);
	this.slideContainer.style.backgroundColor = style.backgroundColor;

	this.index = newIndex;

	this._callHook('slideChange', newIndex);
};

/**
 * Go to the nth slide of specified type.
 *
 * @param {string} type The type of slide to go to.
 * @param {number} headingIndex The number of that type of slide to go to.
 */
Slides.prototype.goToType = function goToSlideType(type, headingIndex) {
	let headings = -1;
	let index = Array.from(this.slides).findIndex((slide) => {
		if (slide.classList.contains(`slide--${type}`)) {
			return (headingIndex === ++headings);
		}
	});

	this.goTo(index);
};

/**
 * Go forwards a number of slides (default 1)
 * @param {number} [diff=1] Number of slides to go.
 */
Slides.prototype.forward = function forwardSlide(diff = 1) {
	this.goTo(this.index + diff);
};

/**
 * Go back a number of slides (default 1)
 * @param {number} [diff=1] Number of slides to go.
 */
Slides.prototype.back = function backSlide(diff = 1) {
	this.goTo(this.index - diff);
};

/**
 * Add a plugin to call events on.
 *
 * @param {object} plugin
 */
Slides.prototype.addPlugin = function addSlidePlugin(plugin) {
	this.plugins.push(plugin);
};

/**
 * Call a hook with some data.
 *
 * @param {string} hook The name of the hook to call.
 * @param {*} data The data to be passed to the hook.
 * @private
 */
Slides.prototype._callHook = function callSlideHook(hook, data) {
	util.each(this.plugins, function (plugin) {
		if (plugin.hooks && typeof plugin.hooks[hook] === 'function') {
			plugin.hooks[hook](data);
		}
	});
};

export default Slides;
