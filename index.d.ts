import { IntlShape } from 'react-intl';
import { MessageDescriptor } from 'react-intl';
import { default as moment_2 } from 'moment';
import { PrimitiveType } from 'react-intl';
import { default as React_2 } from 'react';

export declare function addClass(element: HTMLElement, className: string): void;

export declare function convertListToTree<Item extends object, IDN extends string = 'id', PIDN extends string = 'pId', ID extends number | string = number, T extends TreeList<Item, IDN, PIDN, ID> = TreeList<Item, IDN, PIDN, ID>>(list: T[], topId: ID, idName?: IDN, pIdName?: PIDN): TreeNode<T>[];

export declare const dateUtil: typeof moment_2;

export declare function deepCompareObj(prevProps: any, nextProps: any): boolean;

export declare function deepMergeObjectByKeys(keys: readonly any[], value: any, obj: Recordable): {
    [x: string]: any;
};

export declare function deepSetObjectByKeys(keys: readonly any[], value: any, obj: Recordable): Recordable;

export declare type ExtractNestedKeys<T, Excludes = 'children', UWT = UnwrapNullable<T>> = IsAny<UWT> extends true ? never : IsArray<UWT> extends true ? never : UWT extends {
    [key: string]: string | number | object | undefined;
} ? never : UWT extends object ? {
    [K in keyof UWT]: K extends Excludes ? K : K | ExtractNestedKeys<UWT[K], Excludes>;
}[keyof UWT] : never;

/**
 * 字符串常量联合类型会被 |string 变为string类型，不支持any类型
 */
export declare type ExtractNestedValues<T, Excludes = 'children', UWT = UnwrapNullable<T>> = IsAny<UWT> extends true ? never : IsArray<UWT> extends true ? never : UWT extends {
    [key: string]: string | number | object | undefined;
} ? never : UWT extends object ? {
    [K in keyof UWT]: K extends Excludes ? never : IsAny<UWT[K]> extends true ? never : UWT[K] | ExtractNestedValues<UWT[K], Excludes>;
}[keyof UWT] : never;

export declare type FifthElement<T extends readonly any[]> = T extends readonly [any, any, any, any, infer Fifth, ...any[]] ? Fifth : never;

export declare type FirstElement<T extends readonly any[]> = T extends readonly [infer First, ...any[]] ? First : never;

export declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
}

export declare function formatBaseById<ID = string>(id: ID, values?: MessageValues): React_2.ReactNode;

export declare function formatBaseMessage<ID = string>({ id, values }: MessageProps<ID>): React_2.ReactNode;

export declare function formatToDate(date?: moment_2.MomentInput, format?: string): string;

export declare function formatToDateTime(date?: moment_2.MomentInput, format?: string): string;

declare type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;

export declare type FourthElement<T extends readonly any[]> = T extends readonly [any, any, any, infer Fourth, ...any[]] ? Fourth : never;

export declare function getBoundingClientRect(element: Element): DOMRect | number;

/**
 *
 * @param el 获取内容高度
 * @returns
 */
export declare function getHeight(el: HTMLElement): number;

export declare function getPopupContainer(node?: HTMLElement): HTMLElement;

/**
 * Get the left and top offset of the current element
 * left: the distance between the leftmost element and the left side of the document
 * top: the distance from the top of the element to the top of the document
 * right: the distance from the far right of the element to the right of the document
 * bottom: the distance from the bottom of the element to the bottom of the document
 * rightIncludeBody: the distance between the leftmost element and the right side of the document
 * bottomIncludeBody: the distance from the bottom of the element to the bottom of the document
 *
 * @description:
 */
export declare function getViewportOffset(element: Element): ViewportOffsetResult;

export declare type IsAny<T> = 0 extends 1 & T ? true : false;

export declare type IsArray<T> = T extends Array<any> ? true : false;

export declare type IsEmptyArray<T extends readonly any[]> = T extends readonly [] ? true : false;

export declare type IsKeyof<P, O> = P extends keyof O ? true : false;

export declare type IsNullable<T> = T extends Nullable<any> ? true : false;

export declare type IsObject<T> = T extends object ? true : false;

export declare type IsStringLiteralUnion<T> = string extends T ? false : true;

export declare function isSubList(sub?: Value[], list?: Value[]): boolean;

export declare type LastElement<T extends readonly any[]> = T extends readonly [...any[], infer Last] ? Last : never;

export declare type LocaleFormatMessageProps<ID = string> = (descriptor: MessageProps<ID>, values?: MessageValues) => string;

export declare interface MessageProps<ID = string> extends Omit<MessageDescriptor, 'id'> {
    id: ID;
    values?: MessageValues;
}

export declare type MessageValues = Record<string, React_2.ReactNode | PrimitiveType | FormatXMLElementFn<React_2.ReactNode, React_2.ReactNode>>;

export declare type NestedPropType<KS extends readonly any[], O> = IsObject<O> extends true ? FirstElement<KS> extends keyof O ? IsEmptyArray<Tail<KS>> extends true ? O[FirstElement<KS>] : O[FirstElement<KS>] extends Nullable<infer NO> ? NestedPropType<Tail<KS>, NO> : NestedPropType<Tail<KS>, O[FirstElement<KS>]> : never : O;

export declare type Nullable<T> = T | null;

export declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
}

export declare type PropName<V = any, N extends string = string> = {
    [K in N]: V;
};

export declare type PropsWithChildrenCls<P = unknown> = P & {
    children?: React.ReactNode | undefined;
    className?: string | undefined;
};

export declare type PropsWithCls<P = unknown> = P & {
    className?: string | undefined;
};

export declare type Recordable<T = any> = Record<string, T>;

export declare function removeClass(element: HTMLElement, className: string): void;

export declare type SecondElement<T extends readonly any[]> = T extends readonly [any, infer Second, ...any[]] ? Second : never;

export declare type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : never;

export declare type ThirdElement<T extends readonly any[]> = T extends readonly [any, any, infer Third, ...any[]] ? Third : never;

export declare type TreeList<T, IDN extends string = 'id', PIDN extends string = 'pId', ID extends string | number = number> = {
    [Key in IDN | PIDN]: ID;
} & T;

export declare type TreeNode<T> = {
    children?: TreeNode<T>[];
} & T;

export declare type Union<U = any, T = any> = {
    [key in keyof (U & T)]: (U & T)[key];
};

export declare type UnwrapNullable<T> = T extends Nullable<infer O> ? O : T;

export declare const useBaseLocale: <ID = string>() => Omit<IntlShape, "formatMessage"> & {
    formatMessage: LocaleFormatMessageProps<ID>;
    formatById: (id: ID, values?: MessageValues) => string;
};

export declare function uuid(): string;

export declare type Value = string | number | object | Recordable;

export declare interface ViewportOffsetResult {
    left: number;
    top: number;
    right: number;
    bottom: number;
    rightIncludeBody: number;
    bottomIncludeBody: number;
}

export { }
