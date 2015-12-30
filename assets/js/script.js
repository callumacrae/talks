'use strict';

import * as util from './util';
import Slides from './slides';
import KeyboardPlugin from './plugins/keyboard';
import SliderPlugin from './plugins/slider';
import HashPlugin from './plugins/hash';

import 'prismjs';

const slides = new Slides(util.$('.slides'));

const keyboard = new KeyboardPlugin(slides);
slides.addPlugin(keyboard);

const slider = new SliderPlugin(slides);
slides.addPlugin(slider);

const hash = new HashPlugin(slides);
slides.addPlugin(hash);

/**
 * @todo:
 *
 * MarkDown plugin
 */