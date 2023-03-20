import { serify } from '../serify/serify.js';

import '../options/types.js';
import {Options} from "../options/types";

/**
 * create redux middleware
 *
 * @function createReduxMiddleware
 *
 * @param  {Options} [options] - options object
 *
 * @returns {function} redux middleware
 */
export const createReduxMiddleware = (options: Options) => () => (next: (action: any) => void) => (action: any) => {
  action.payload = serify(action.payload, options);
  next(action);
};
