import {
  ExcalidrawElement,
  AppState,
} from '@excalidraw/excalidraw/types/element/types'
import { BinaryFiles } from '@excalidraw/excalidraw/types/types'

export declare const IMAGE_MIME: readonly [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/x-icon'
]
export declare const MIME_TYPES: {
  readonly excalidraw: 'application/vnd.excalidraw+json'
  readonly excalidrawlib: 'application/vnd.excalidrawlib+json'
  readonly json: 'application/json'
  readonly svg: 'image/svg+xml'
  readonly 'excalidraw.svg': 'image/svg+xml'
  readonly png: 'image/png'
  readonly 'excalidraw.png': 'image/png'
  readonly jpg: 'image/jpeg'
  readonly gif: 'image/gif'
  readonly webp: 'image/webp'
  readonly bmp: 'image/bmp'
  readonly ico: 'image/x-icon'
  readonly binary: 'application/octet-stream'
}

export type ExcalidrawDataType = {
  elements?: ExcalidrawElement[]
  appState?: AppState
  scrollToContent?: boolean
  files?: BinaryFiles | null
}

export interface Files {
  created: number
  dataURL: string
  id: string
  lastRetrieved: number | undefined
  mimeType: (typeof IMAGE_MIME)[number] | typeof MIME_TYPES.binary
}