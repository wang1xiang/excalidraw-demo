import { BinaryFiles } from '@excalidraw/excalidraw/types/types'
import { Files } from '../types'
import ls from './localStorage'
type StringType = { [props: string]: Files }

/**
 *
 * @param arr 数组
 * @param field 需要提取的字段
 * @returns 转换后的对象
 */
const changeFiles = (arr: Files[] | undefined, field: string): BinaryFiles | null => {
  const result: BinaryFiles = {}
  if (!arr) return null
  arr?.forEach((a) => {
    // @ts-ignore
    result[a[field] as string] = a
  })
  return result
}
export { ls, changeFiles }
