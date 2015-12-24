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
		newKnob = baseKnob.cloneNode();
		knobs.push(newKnob);

		slider.appendChild(newKnob);
	}

	knobs[0].classList.add(ACTIVE_CLASS);

	slides.slideContainer.appendChild(slider);

	this.hooks = {
		slideChange: function (slideIndex) {
			util.each(knobs, function (knob, knobIndex) {
				if (slideIndex === knobIndex) {
					knob.classList.add(ACTIVE_CLASS);
				} else {
					knob.classList.remove(ACTIVE_CLASS);
				}
			});
		}
	}
}
