// /**
//  *
//  *
//  *
//  */

// type x = string | number | null;
// type blah = 'a' | 'b';
// interface Z {
//     a: string;
//     b: number;
//     c: null;
// }
// type y = Omit<Z, blah>;

// // const a: y = "xxx";
// // const b: y = 3;
// type z = x extends string ? never : x;

// // type a = string | number | null;
// // type b = string | undefined;
// type a = 'a' |  'b' |  'c' |  'd' |  'e' |  'f' | 'g'
// type b = 'g' | 'h' | 'i'
// type aIb = a & b
// type aUb = a | b
// //

// type c = a extends b ? never : a;// : b;

// type Not<T, u> = T extends u ? never : T;

// type xx = Not<a, b>
