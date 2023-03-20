import { isArray, isPlainObject, isPrimitive } from 'is-what';

import { mergeOptions } from '../options/mergeOptions.js';

import '../options/types.js';
import {Options} from "../options/types";

/**
 * deserify a node
 *
 * @private
 * @function deserifyNode
 *
 * @param {*} [value] - node to be deserified
 * @param  {Options} [options] - options object
 *
 * @returns {*} deserified node
 */
const deserifyNode = (value: any, options: Options = {serifyKey: null, types: {}}): any => {
  if (isPrimitive(value)) return value;

  if (isPlainObject(value) && value.serifyKey === options.serifyKey) {
    // eslint-disable-next-line no-prototype-builtins
    if (!value.hasOwnProperty('type') || !value.hasOwnProperty('value'))
      throw new Error(`invalid serified object: ${JSON.stringify(value)}`);

    const serifyType = options.types[value.type];
    if (!serifyType)
      throw new Error(`${value.type} is not a supported serify type`);

    if (typeof serifyType.deserifier !== 'function')
      throw new Error(`invalid ${value.type} deserifier`);

    return serifyType.deserifier(deserifyNode(value.value, options));
  }

  let copy: Record<string|number, any> | Array<any> = {};
  if (isArray(value)) copy = [...value];
  if (isPlainObject(value)) copy = { ...value };
  for (const p in copy) copy[p] = deserifyNode(copy[p], options);

  return copy ?? value;
};

/**
 * deserify a value
 *
 * @function deserify
 *
 * @param {*} [value] - value to be deserified
 * @param  {Options} [options] - options object
 *
 * @returns {*} deserified value
 */
export const deserify = (value: any, options: Options) =>
  deserifyNode(value, mergeOptions(options));
