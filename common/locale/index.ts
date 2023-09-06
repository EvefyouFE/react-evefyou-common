/*
 * @Author: EvefyouFE/evef
 * @Date: 2023-08-26 00:05:57
 * @FilePath: \react-evefyou-pro\pro\locale\index.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
import React, { useMemo } from 'react';
import { FormattedMessage, IntlShape, MessageDescriptor, PrimitiveType, useIntl } from 'react-intl';

type FormatXMLElementFn<T, R = string | T | (string | T)[]> = (parts: Array<string | T>) => R;
export type MessageValues = Record<string, React.ReactNode | PrimitiveType | FormatXMLElementFn<React.ReactNode, React.ReactNode>>;
export interface MessageProps<ID = string> extends Omit<MessageDescriptor, 'id'> {
  id: ID;
  values?: MessageValues;
}
export type LocaleFormatMessageProps<ID = string> = (descriptor: MessageProps<ID>, values?: MessageValues) => string;

export const useBaseLocale = <ID = string>(): Omit<IntlShape, 'formatMessage'> & {
  formatMessage: LocaleFormatMessageProps<ID>
  formatById: (id: ID, values?: MessageValues) => string
} => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  return useMemo(() => {
    const formatMessage = _formatMessage as LocaleFormatMessageProps<ID>;
    const formatById = (id: ID, values?: MessageValues) => formatMessage({ id }, values);
    return {
      ...rest,
      formatMessage,
      formatById
    }
  }, []);
};
export function formatBaseMessage<ID = string>({ id, values }: MessageProps<ID>): React.ReactNode {
  const _id = id as string | undefined
  return React.createElement(FormattedMessage, {
    id: _id,
    values,
    key: _id
  })
}

export function formatBaseById<ID = string>(id: ID, values?: MessageValues): React.ReactNode {
  return formatBaseMessage({ id, values })
}

