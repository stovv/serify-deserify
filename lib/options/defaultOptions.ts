import './types.js';
import {Options} from "./types";

/**
 * return default serify-deserify options
 *
 * @private
 * @function defaultOptions
 *
 * @returns {Options} default options
 */
export const defaultOptions: Options = (() => ({
  serifyKey: null,
  types: {
    BigInt: {
      serifier: (unserified: bigint) => unserified.toString(),
      deserifier: (serified: string) => BigInt(serified),
    },
    Date: {
      serifier: (unserified: Date) => unserified.getTime(),
      deserifier: (serified: string) => new Date(serified),
    },
    Map: {
      serifier: (unserified: Map<any, any>) => [...unserified.entries()],
      deserifier: (serified: IterableIterator<[any, any]>) => new Map(serified),
    },
    Set: {
      serifier: (unserified: Set<any>) => [...unserified.values()],
      deserifier: (serified: any[]) => new Set(serified),
    },
  },
}))();
