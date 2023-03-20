import { defaultOptions } from './defaultOptions.js';

import './types.js';
import {Options} from "./types";

/**
 * merge custom options with default options
 *
 * @private
 * @function mergeOptions
 *
 * @param {Options} [options] - custom options
 *
 * @returns {Options} merged options
 */
export const mergeOptions = (options: Options = {serifyKey: null, types: {}}) => ({
  serifyKey: options.serifyKey ?? defaultOptions.serifyKey,
  types: { ...defaultOptions.types, ...options.types },
});
