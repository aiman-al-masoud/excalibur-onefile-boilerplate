/**
 * Used to import multimedia resources as es6 modules.
 * 
 * Something about "declaration files":
 * https://stackoverflow.com/questions/21247278/about-d-ts-in-typescript
 */


/**
 * Eg: this is saying:
 * 1. Declare 'a' module called: 'any file ending in .mp3'
 * 2. Let his module export a value that isn't type-checked (any)
 */
declare module "*.mp3"{
  const value: string;
  export default value;
}

declare module "*.png"{
  const value: string;
  export default value;
}

declare module "*.jpg"{
  const value: string;
  export default value;
}



/**
 *  Wildcard makes it work for any filename and any format.
 *  I guess you'd like to leave this out for production.
 */
// declare module "*" {
//     const value: any;
//     export default value;
// }