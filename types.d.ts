import Console from 'node:console'

type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
export type Dump = { [K in keyof Console]: ReplaceReturnType<Console[K], string> };
