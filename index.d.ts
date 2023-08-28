import { KeyItem } from 'react-evefyou-hooks';
import { default as moment_2 } from 'moment';
import { default as React_2 } from 'react';
import { Recordable } from 'react-evefyou-hooks';

export declare function addClass(element: HTMLElement, className: string): void;

export declare const dateUtil: typeof moment_2;

export declare function formatToDate(date?: moment_2.MomentInput, format?: string): string;

export declare function formatToDateTime(date?: moment_2.MomentInput, format?: string): string;

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

export declare function removeClass(element: HTMLElement, className: string): void;

export declare interface TabItem extends KeyItem<string> {
    label: React_2.ReactNode;
    children: React_2.ReactNode;
    closeIcon: React_2.ReactNode;
}

export declare function useDesign(scope: string, prefixCls?: string): {
    prefixCls: string;
    prefixVar: string;
};

export declare function useNativeProps<T extends Recordable>(props: T, options?: UseNativePropsOptions): T;

declare interface UseNativePropsOptions {
    excludeListeners?: boolean;
    excludeKeys?: string[];
    excludeDefaultKeys?: boolean;
}

export declare function useTabs(): {
    getTabItem: (key: string, locale: string, title?: string, children?: React_2.ReactNode) => TabItem;
};

export declare function uuid(): string;

export declare interface ViewportOffsetResult {
    left: number;
    top: number;
    right: number;
    bottom: number;
    rightIncludeBody: number;
    bottomIncludeBody: number;
}

export { }
