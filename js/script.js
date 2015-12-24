import * as util from './util';
import Slides from './slides';
import KeyboardPlugin from './plugins/keyboard';
import SliderPlugin from './plugins/slider';

const slides = new Slides(util.$('.slides'));

const keyboard = new KeyboardPlugin(slides);
slides.addPlugin(keyboard);

const slider = new SliderPlugin(slides);
slides.addPlugin(slider);

// @todo slider control along bottom: 3px?
