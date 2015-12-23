import * as util from './util';
import Slides from './slides';
import KeyboardPlugin from './plugins/keyboard';

const slides = new Slides(util.$('.slides'));

const keyboard = new KeyboardPlugin(slides);
slides.addPlugin(keyboard);

// @todo slider control along bottom: 3px?
