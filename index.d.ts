import { KeyItem } from 'react-evefyou-hooks';
import { default as moment_2 } from 'moment';
import { default as React_2 } from 'react';
import { Recordable as Recordable_2 } from 'react-evefyou-hooks';

export declare function addClass(element: HTMLElement, className: string): void;

export declare const dateUtil: typeof moment_2;

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

export declare function formatToDate(date?: moment_2.MomentInput, format?: string): string;

export declare function formatToDateTime(date?: moment_2.MomentInput, format?: string): string;

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

export declare type LastElement<T extends readonly any[]> = T extends readonly [...any[], infer Last] ? Last : never;

export declare type NestedPropType<KS extends readonly any[], O> = IsObject<O> extends true ? FirstElement<KS> extends keyof O ? IsEmptyArray<Tail<KS>> extends true ? O[FirstElement<KS>] : O[FirstElement<KS>] extends Nullable<infer NO> ? NestedPropType<Tail<KS>, NO> : NestedPropType<Tail<KS>, O[FirstElement<KS>]> : never : O;

export declare type Nullable<T> = T | null;

export declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
}

export declare type PropName<V = any, N extends string = string> = {
    [K in N]: V;
};

export declare type Recordable<T = any> = Record<string, T>;

export declare function removeClass(element: HTMLElement, className: string): void;

export declare type SecondElement<T extends readonly any[]> = T extends readonly [any, infer Second, ...any[]] ? Second : never;

export declare interface TabItem extends KeyItem<string> {
    label: React_2.ReactNode;
    children: React_2.ReactNode;
    closeIcon: React_2.ReactNode;
}

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

export declare function useDesign(scope: string, prefixCls?: string): {
    prefixCls: string;
    prefixVar: string;
};

export declare function useNativeProps<T extends Recordable_2>(props: T, options?: UseNativePropsOptions): T;

declare interface UseNativePropsOptions {
    excludeListeners?: boolean;
    excludeKeys?: string[];
    excludeDefaultKeys?: boolean;
}

export declare function useTabs(): {
    getTabItem: (key: string, locale: string, title?: string, children?: React_2.ReactNode) => TabItem;
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
