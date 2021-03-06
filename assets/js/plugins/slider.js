import * as util from '../util';

const ACTIVE_CLASS = 'slider__knob--active';

/**
 * Plugin to display clickable progress indicator.
 *
 * @param {Slides} slides The Slides object.
 * @constructor
 */
export default function SliderPlugin(slides) {
	const slider = document.createElement('div');
	slider.className = 'slider';

	const baseKnob = document.createElement('div');
	baseKnob.className = 'slider__knob';

	let newKnob;
	const knobs = [];

	for (let i = 0; i < slides.slides.length; i++) {
		let slide = slides.slides[i];

		newKnob = baseKnob.cloneNode();
		newKnob.dataset.index = i;

		let bgColor = getComputedStyle(slide).backgroundColor;
		if (!util.isWhite(bgColor)) {
			newKnob.style.backgroundColor = bgColor;
		}

		newKnob.setAttribute('title', util.getSlideHeading(slide));

		knobs.push(newKnob);
		slider.appendChild(newKnob);
	}

	knobs[0].classList.add(ACTIVE_CLASS);

	slides.slideContainer.appendChild(slider);

	util.on(slider, 'click', function (e) {
		slides.goTo(Number(e.target.dataset.index))
	});

	this.hooks = {
		slideChange: function (slideIndex) {
			util.each(knobs, function (knob, knobIndex) {
				knob.classList.toggle(ACTIVE_CLASS, slideIndex === knobIndex);
			});
		}
	}
}
