// ////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// ////    This namespace is for testing typesafety in datastructures with deeply nested arrays
// ////        and objects (that alternate back and forth)
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// import { getImRecordClass, getImType } from "__METATYPING";     //DO NOT EDIT

// export namespace TESTING_NAMESPACE {

//     export interface IDog {
//         dogName: string;
//         dobj0: {
//             dobj1: {
//                 dobj2: {
//                     dobj3: {
//                         dobj4: string;
//                     }
//                 }
//             }
//         }
//     }

//     const dog: IDog = {
//         dogName: "rex",
//         dobj0: {
//             dobj1: {
//                 dobj2: {
//                     dobj3: {
//                         dobj4: "rexius"
//                     }
//                 }
//             }
//         }
//     }

//     const dogs: IDog[] = [dog, dog, dog];

//     export interface Interface {
//         /* Define properties of this POJO */
//         nar0: IDog[];
//         nob0: {
//             nar1: IDog[]
//             nob1: {
//                 nar2: IDog[];
//                 nob2: {
//                     nar3: IDog[];
//                     nob3: {
//                         nar4: IDog[];
//                         nob4: {
//                             nar5: IDog[];
//                             nob5: {
//                                 nob6: boolean
//                             }
//                         }
//                     }
//                 }
//             }
//         };
//     }


//     export const Default: Interface = {
//         /* Optional demo object to use for wireframes, etc. */
//         nar0: dogs,
//         nob0: {
//             nar1: dogs,
//             nob1: {
//                 nar2: dogs,
//                 nob2: {
//                     nar3: dogs,
//                     nob3: {
//                         nar4: dogs,
//                         nob4: {
//                             nar5: dogs,
//                             nob5: {
//                                 nob6: true
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     //Get class to construct deeply-nested-immutable records seeded by this namespace's Default POJO
//     export const ImRecordClass = getImRecordClass(Default);

//     //Get the typescript types to apply to instances of this namespace's ImRecordClass
//     export type ImType = getImType<Interface>;
//     export type ImTypes = getImType<Interface[]>;

// }

// /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////



// //////////////////////////////
// // Typescript Playground:
// //////////////////////////////

// //Get instance of deeply nested immutable record using this namespace template
// let imExample: TESTING_NAMESPACE.ImType = new TESTING_NAMESPACE.ImRecordClass(TESTING_NAMESPACE.Default);

// //1 ARG TESTS

// let a1 = imExample.getIn(["nob0"]);

// let b1 = a1.getIn(["nar1"]);

// let c1 = b1.getIn([0]);

// let d1 = imExample.update("nob0", c => {
//     return a1;
// });

// // let d1 = imExample.updateIn(["nob0"], c => c).get("nob0");

// // d1.

// //2 ARGS TESTS

// let b2 = imExample.getIn(["nar0", 0]);

// // let c2 = imExample.getIn(["nar0", "nob1"]);

// let e2 = imExample.getIn(["nob0", "nar1"]);

// let d2 = imExample.updateIn(["nob0", "nar1"], c => {

//     e2.get(0);
//     let x = c.getIn([0, "dogName"]);
//     // x.
//     // c.get("dogName");
//     // c.
//     return e2;
// })//.get("nob0");

// let f2 = imExample.getIn(["nob0", "nob1"]);
// let f3 = imExample.get("nob0").get("nob1");

// f3.nob2;
// // f2.
// //3 ARG TESTS:

// let a2 = imExample.getIn(["nob0", "nob1", 0]);  //



// //5 ARGS TEST

// let a5 = imExample.getIn(["nob0", "nob1", "nob2", "nob3", "nob4"]);

// let b5 = imExample.get("nob0").get("nar1").get(0).get("dogName");

// let bbb5 = imExample.getIn(["nob0", "nar1", 0, "dobj0", "dobj1"]);

// let c5: getImType<TESTING_NAMESPACE.IDog[]> = <getImType<TESTING_NAMESPACE.IDog[]>>imExample.getIn(["nar0"]);



// // c5[0].dobj0.

// let d5 = c5.getIn([0, "dobj0", "dobj1", "dobj2", "dobj3"])

// //6 ARGS

// let a6 = imExample.getIn(["nob0", "nob1", "nob2", "nob3", "nob4", "toString"]);

// //  imExample.nar0[0].dobj0.dobj1.dobj2
// let b6 = imExample.getIn(["nar0", 0, "dobj0", "dobj1", "nob4"]);

// let B6 = imExample.getIn(["nob0", "nar1", 0, "dobj0", "dobj1", "dobj2"]);

// // B6.

// let c6 = imExample.getIn(["nob0", "nob1", "nob2", "nob3", "nar4", 0]);

// imExample.nob0.nob1.nob2.nob3.nar4[0].dobj0

