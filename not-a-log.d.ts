declare module 'not-a-log' {
  import { Console } from 'console'
  type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
  type Dump = { [K in keyof Console]: ReplaceReturnType<Console[K], string> };
  var dump: Dump;
  export = dump;
}
