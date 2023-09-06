
export type Nullable<T> = T | null;
export type PropName<V = any, N extends string = string> = {
  [K in N]: V;
}
export type UnwrapNullable<T> = T extends Nullable<infer O> ? O : T;
export type IsStringLiteralUnion<T> = string extends T ? false : true;
export type IsObject<T> = T extends object ? true : false;
export type IsNullable<T> = T extends Nullable<any> ? true : false;
export type IsArray<T> = T extends Array<any> ? true : false;
export type IsAny<T> = 0 extends 1 & T ? true : false;
export type FirstElement<T extends readonly any[]> = T extends readonly [infer First, ...any[]] ? First : never;
export type SecondElement<T extends readonly any[]> = T extends readonly [any, infer Second, ...any[]] ? Second : never;
export type ThirdElement<T extends readonly any[]> = T extends readonly [any, any, infer Third, ...any[]] ? Third : never;
export type FourthElement<T extends readonly any[]> = T extends readonly [any, any, any, infer Fourth, ...any[]] ? Fourth : never;
export type FifthElement<T extends readonly any[]> = T extends readonly [any, any, any, any, infer Fifth, ...any[]] ? Fifth : never;
export type LastElement<T extends readonly any[]> = T extends readonly [...any[], infer Last] ? Last : never;
export type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : never;
export type IsEmptyArray<T extends readonly any[]> = T extends readonly [] ? true : false;
export type IsKeyof<P, O> = P extends keyof O ? true : false;
export type ExtractNestedKeys<T, Excludes = 'children', UWT = UnwrapNullable<T>> =
  IsAny<UWT> extends true ? never :
  IsArray<UWT> extends true ? never :
  UWT extends {
    [key: string]: string | number | object | undefined;
  } ? never :
  UWT extends object
  ? {
    [K in keyof UWT]: K extends Excludes ? K :
    K | ExtractNestedKeys<UWT[K], Excludes>;
  }[keyof UWT]
  : never
/**
 * 字符串常量联合类型会被 |string 变为string类型，不支持any类型
 */
export type ExtractNestedValues<T, Excludes = 'children', UWT = UnwrapNullable<T>> =
  IsAny<UWT> extends true ? never :
  IsArray<UWT> extends true ? never :
  UWT extends {
    [key: string]: string | number | object | undefined;
  } ? never :
  UWT extends object
  ? {
    [K in keyof UWT]:
    K extends Excludes ? never :
    IsAny<UWT[K]> extends true ? never :
    UWT[K] | ExtractNestedValues<UWT[K], Excludes>;
  }[keyof UWT]
  : never

export type NestedPropType<KS extends readonly any[], O> =
  IsObject<O> extends true ?
  FirstElement<KS> extends keyof O ?
  IsEmptyArray<Tail<KS>> extends true ? O[FirstElement<KS>]
  : O[FirstElement<KS>] extends Nullable<infer NO> ? NestedPropType<Tail<KS>, NO>
  : NestedPropType<Tail<KS>, O[FirstElement<KS>]>
  : never
  : O;

export interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

export interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

export type Union<U = any, T = any> = {
  [key in keyof (U & T)]: (U & T)[key];
};

export type PropsWithCls<P = unknown> = P & {
  className?: string | undefined;
};

export type PropsWithChildrenCls<P = unknown> = P & {
  children?: React.ReactNode | undefined;
  className?: string | undefined;
};