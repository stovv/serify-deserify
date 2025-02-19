import { isArray, isPlainObject, isPrimitive } from 'is-what';

import { mergeOptions } from '../options/mergeOptions.js';

import '../options/types.js';
import {Options, Serified} from "../options/types";

/**
 * serify a node
 *
 * @private
 * @function serifyNode
 *
 * @param {*} [value] - node to be serified
 * @param  {Options} [options] - options object
 *
 * @returns {*} serified node
 */
const serifyNode = (value: any, options: Options) => {
  if (isPrimitive(value) || value.serifyKey === options.serifyKey) return value;

  const valueType = value.constructor?.name;
  const serifyType = options.types[valueType];

  if (serifyType) {
    if (typeof serifyType.serifier !== 'function')
      throw new Error(`invalid ${valueType} serifier`);

    const serified: Serified = {
      serifyKey: options.serifyKey,
      type: valueType,
      value: serifyNode(serifyType.serifier(value), options),
    };

    return serified;
  }

  let copy: Record<string | number, any> | Array<any> = [];
  if (isArray(value)) copy = [...value];
  if (isPlainObject(value)) copy = { ...value };

  for (const p in copy) copy[p] = serifyNode(copy[p], options);

  return copy ?? value;
};

/**
 * serify a value
 *
 * @function serify
 *
 * @param {*} [value] - value to be serified
 * @param  {Options} [options] - options object
 *
 * @returns {*} serified value
 */
export const serify = (value: any, options: Options) =>
  serifyNode(value, mergeOptions(options));
