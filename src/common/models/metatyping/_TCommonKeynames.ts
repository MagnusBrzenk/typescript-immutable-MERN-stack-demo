/**
 * These are common keys of JS objects, arrays, etc. that get invoked by the `keyof` operator when
 * typing nested immutable payloads using generics and conditionals. We collect them here in one place
 * so that they can be conveniently removed via the Exclude<T,K> operators
 *
 * Note: if you do not exclude these keynames then they will swamp your intellisense messaging making it very tricky to debug type complaints
 * Also note that the keywords that show up in intellisense will depend on what sorts of objects you have deeply nested within your state POJO.
 * If your intellisense messaging gets full of noisy unions of keywords/types other than the keys/indices of your deeply nested POJOs/arrays then
 * add them here in order to remove them from your intellisense. See also `models/_README.md` for more description of why these keywords show up in
 * intellisense type complaints in the first place (it's to do with typescript widening on conditionals).
 */
export type TCommonKeynames =
    | "concat"
    | "slice"
    | "indexOf"
    | "lastIndexOf"
    | "includes"
    | "length"
    | "charAt"
    | "charCodeAt"
    | "localeCompare"
    | "match"
    | "replace"
    | "trimRight"
    | "trim"
    | "search"
    | "split"
    | "substring"
    | "toLowerCase"
    | "toLocaleLowerCase"
    | "substr"
    | "toUpperCase"
    | "toLocaleUpperCase"
    | "codePointAt"
    | "endsWith"
    | "repeat"
    | "startsWith"
    | "anchor"
    | "big"
    | "blink"
    | "bold"
    | "fixed"
    | "normalize"
    | "fontcolor"
    | "fontsize"
    | "italics"
    | "link"
    | "small"
    | "strike"
    | "sub"
    | "sup"
    | "trimLeft"
    | "toString"
    | "valueOf"
    | "toLocaleString"
    | "toJSON"
    | "toDateString"
    | "toTimeString"
    | "toLocaleDateString"
    | "toLocaleTimeString"
    | "getTime"
    | "getFullYear"
    | "getUTCFullYear"
    | "getMonth"
    | "getUTCMonth"
    | "getDate"
    | "getUTCDate"
    | "getDay"
    | "getUTCDay"
    | "getHours"
    | "getUTCHours"
    | "getMinutes"
    | "getUTCMinutes"
    | "getSeconds"
    | "getUTCSeconds"
    | "getMilliseconds"
    | "getUTCMilliseconds"
    | "getTimezoneOffset"
    | "setTime"
    | "setMilliseconds"
    | "setUTCMilliseconds"
    | "setSeconds"
    | "setUTCSeconds"
    | "setMinutes"
    | "setUTCMinutes"
    | "setHours"
    | "setUTCHours"
    | "setDate"
    | "setUTCDate"
    | "setMonth"
    | "setUTCMonth"
    | "setFullYear"
    | "setUTCFullYear"
    | "toUTCString"
    | "toISOString"
    | "toFixed"
    | "toExponential"
    | "toPrecision"
    | (() => string)
    | ((pos: number) => string)
    | ((index: number) => number)
    | ((...strings: string[]) => string)
    | ((searchString: string, position?: number | undefined) => number)
    // | {
    //       (that: string): number;
    //       (that: string, locales?: string | string[] | undefined, options?: CollatorOptions | undefined): number;
    //   }
    | {
          (regexp: string | RegExp): RegExpMatchArray | null;
          (matcher: { [Symbol.match](string: string): RegExpMatchArray | null }): RegExpMatchArray | null;
      }
    | {
          (searchValue: string | RegExp, replaceValue: string): string;
          (searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
          (
              searchValue: { [Symbol.replace](string: string, replaceValue: string): string },
              replaceValue: string
          ): string;
          (
              searchValue: {
                  [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
              },
              replacer: (substring: string, ...args: any[]) => string
          ): string;
      }
    | { (regexp: string | RegExp): number; (searcher: { [Symbol.search](string: string): number }): number }
    | {
          (separator: string | RegExp, limit?: number | undefined): string[];
          (
              splitter: { [Symbol.split](string: string, limit?: number | undefined): string[] },
              limit?: number | undefined
          ): string[];
      }
    | ((pos: number) => number | undefined)
    | ((searchString: string, position?: number | undefined) => boolean)
    | "concat"
    | "filter"
    | "size"
    | "delete"
    | "remove"
    | "clear"
    | "deleteIn"
    | "removeIn"
    | "mergeIn"
    | "mergeDeepIn"
    | "withMutations"
    | "asMutable"
    | "wasAltered"
    | "asImmutable"
    | "merge"
    | "map"
    | "flatMap"
    | "toJSON"
    | "toArray"
    | "toSeq"
    | "equals"
    | "hashCode"
    | "has"
    | "includes"
    | "contains"
    | "first"
    | "last"
    | "hasIn"
    | "toObject"
    | "toMap"
    | "toOrderedMap"
    | "toSet"
    | "toOrderedSet"
    | "toList"
    | "toStack"
    | "toKeyedSeq"
    | "toIndexedSeq"
    | "toSetSeq"
    | "keys"
    | "values"
    | "entries"
    | "keySeq"
    | "valueSeq"
    | "entrySeq"
    | "filterNot"
    | "reverse"
    | "sort"
    | "sortBy"
    | "groupBy"
    | "forEach"
    | "slice"
    | "rest"
    | "butLast"
    | "skip"
    | "skipLast"
    | "skipWhile"
    | "skipUntil"
    | "take"
    | "takeLast"
    | "takeWhile"
    | "takeUntil"
    | "flatten"
    | "reduce"
    | "reduceRight"
    | "every"
    | "some"
    | "join"
    | "isEmpty"
    | "count"
    | "countBy"
    | "find"
    | "findLast"
    | "findEntry"
    | "findLastEntry"
    | "findKey"
    | "findLastKey"
    | "keyOf"
    | "lastKeyOf"
    | "max"
    | "maxBy"
    | "min"
    | "minBy"
    | "isSubset"
    | "isSuperset"
    | "deleteAll"
    | "removeAll"
    | "mergeWith"
    | "mergeDeep"
    | "mergeDeepWith"
    | "mapKeys"
    | "mapEntries"
    | "flip";
