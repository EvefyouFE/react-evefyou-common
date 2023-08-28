/*
 * @Author: EvefyouFE
 * @Date: 2023-08-16 12:49:50
 * @FilePath: \react-evefyou-components\components\_common\hooks\useDesign.ts
 * @Description: 
 * Everyone is coming to the world i live in, as i am going to the world lives for you. 人人皆往我世界，我为世界中人人。
 * Copyright (c) 2023 by EvefyouFE/evef, All Rights Reserved. 
 */
export function useDesign(scope: string, prefixCls = 'evefyou') {
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls,
  }
}
