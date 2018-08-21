/**
 * Global Type Definitions
 * Whenever you "import" sth as a module, ts-lint will complain if there are no types for that module
 * So you need to add one explcitily here if @types/MODULENAME doesn't exist in npm
 */

declare module "*.css" {
    const styles: any;
    export = styles;
}

declare module "*.scss" {
    const styles: any;
    export = styles;
}

declare module "*.sass" {
    const styles: any;
    export = styles;
}

declare module "*.less" {
    const styles: any;
    export = styles;
}

declare module "*.html" {
    const htmlText: any;
    export = htmlText;
}

declare module "*.txt" {
    const txtText: any;
    export = txtText;
}

declare module "*.csv";

declare module "*.jpg";

declare module "*.json";

declare module "*.svg";

declare module "open-browser-webpack-plugin";

// declare var marvellous: any;

//Advanced type expressions:

// type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

// type Omit<T, K extends keyof T> = { [P in Diff<keyof T, K>]: T[P] }; //

// type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type Not<T, u> = T extends u ? never : T;
