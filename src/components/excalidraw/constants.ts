/** 线条风格 */
export enum RoughnessEnum {
  /** 直线 */
  architect,
  /** 艺术 */
  artist,
  /** 漫画家 */
  cartoonist
}
/** 边角风格 */
export enum RoundnessEnum {
  /** 直角 */
  sharp = 'sharp',
  /** 圆角 */
  round = 'round',
}
/** 字体风格 */
export enum FontFamilyEnum {
  /** 艺术 */
  'hand-drawn' = 1,
  /** 普通 */
  normal,
  /** 代码 */
  code
}

const suffix = 'excalidraw'
/** IndexDB数据库名 */
export const FILES_STORE = 'files-store'
/** 模式 */
export const EXCALIDRAW_THEME = `${suffix}_theme`
/** 背景色 */
export const EXCALIDRAW_BACKGROUND = `${suffix}_background`
/** localStorage存储所有的element */
export const EXCALIDRAW_ELEMENTS = `${suffix}_elements`
/** localStorage存储所有的模板 */
export const LIBRARY_ELEMENTS = `${suffix}_library_elements`
/** 官方帮助文档class */
export const HELP_DOCUMENT_CLASS = 'HelpDialog__btn'
/** 官方文档地址 */
export const HELP_DOCUMENT_LINK = 'https://github.com/excalidraw/excalidraw#documentation'
/** 帮助文档地址 */
export const DOCUMENT_LINK = 'https://doc.qmpoa.com/doc/archive?doc_id=b607ba543ad05417b8507ee86c54fcb73967'
/** 默认样式 */
export const DEFAULT_STATE = {
  currentItemRoughness: RoughnessEnum.architect,
  currentItemRoundness: RoundnessEnum.sharp,
  currentItemFontFamily: FontFamilyEnum.normal
}
