
export function useDesign(scope: string, prefixCls = 'evefyou') {
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  }
}
