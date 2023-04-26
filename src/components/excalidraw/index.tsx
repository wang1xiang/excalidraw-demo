import { useHandleLibrary } from '@excalidraw/excalidraw'
import './index.css'
import BasicMainMenu from './BasicMainMenu'
import BasicWelcome from './BasicWelcome'
import { useCallback, useEffect, useState } from 'react'
import { ExcalidrawDataType } from './types'
import {
  AppState,
  BinaryFileData,
  BinaryFiles,
  ExcalidrawImperativeAPI,
  LibraryItems,
} from '@excalidraw/excalidraw/types/types'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { useImmer } from 'use-immer'
import { useLiveQuery } from 'dexie-react-hooks'
import { changeFiles, ls, db } from './utils'
import {
  DOCUMENT_LINK,
  EXCALIDRAW_ELEMENTS,
  FILES_STORE,
  HELP_DOCUMENT_CLASS,
  LIBRARY_ELEMENTS,
  DEFAULT_STATE,
  EXCALIDRAW_THEME,
  EXCALIDRAW_BACKGROUND,
} from './constants'

let saveExcalidrawData: ExcalidrawDataType = {}

const OneExcalidraw = () => {
  const UIOptions = {}

  const allFiles = useLiveQuery(() => db[FILES_STORE].toArray(), [])
  const [initialData, setInitialData] = useImmer<ExcalidrawDataType>({
    elements: [],
    appState: {
      isLoading: false,
      theme: ls.getItem(EXCALIDRAW_THEME),
      viewBackgroundColor: ls.getItem(EXCALIDRAW_BACKGROUND),
      ...DEFAULT_STATE,
    },
    files: null,
  })
  useEffect(() => {
    window.name = 'one_excalidraw'
    const elements = ls.getItem(EXCALIDRAW_ELEMENTS)
    const files = changeFiles(allFiles, 'id')
    setInitialData((draft) => {
      draft.files = files
      draft.elements = elements
    })
  }, [setInitialData, allFiles])

  const [Excalidraw, setExcalidraw] = useState<any>(null)
  const renderEditor = useCallback((div: HTMLElement | null) => {
    if (!div) return

    import('@excalidraw/excalidraw')
      .then((res) => {
        setExcalidraw(res.Excalidraw)
      })
      .finally(() => console.log('object'))
  }, [])

  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null)
  useHandleLibrary({ excalidrawAPI })

  useEffect(() => {
    if (!excalidrawAPI) return

    const libraryElements = ls.getItem(LIBRARY_ELEMENTS)
    // 使用此功能来更新模板 libraryItems模板集合 merge 与之前的合并
    excalidrawAPI.updateLibrary({ libraryItems: libraryElements, merge: true })
    if (!allFiles?.length) return
    // 将提供的文件数据添加到缓存中存在的现有文件之上的 appState.files 缓存
    excalidrawAPI.addFiles(allFiles as BinaryFileData[])
  }, [excalidrawAPI, allFiles])

  const onChange = useCallback(
    (elements: ExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
      saveExcalidrawData = {
        elements,
        appState,
        files,
      }

      elements.forEach(async (element) => {
        if (element.type === 'image') {
          const { fileId = '', isDeleted } = element
          const file = files[fileId as string]
          if (!file) return
          const isFileInStore = allFiles?.find((f) => f.id === fileId)

          if (isFileInStore && isDeleted) await db[FILES_STORE].delete(file?.id)
          if (!isFileInStore && !isDeleted) {
            const { id, created, dataURL, lastRetrieved, mimeType } = file
            await db[FILES_STORE].add({
              id,
              created,
              dataURL,
              lastRetrieved,
              mimeType,
            })
          }
        }
      })

      const { theme, viewBackgroundColor } = appState
      ls.setItem(EXCALIDRAW_THEME, theme)
      ls.setItem(EXCALIDRAW_BACKGROUND, viewBackgroundColor)

      const sceneElement = elements.filter((element) => !element.isDeleted)
      ls.setItem(EXCALIDRAW_ELEMENTS, sceneElement)
    },
    [allFiles]
  )
  const onLibraryChange = useCallback(
    (items: LibraryItems) => ls.setItem(LIBRARY_ELEMENTS, items),
    []
  )

  useEffect(() => {
    const saveData = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      return (e.returnValue = 'Are you sure you want to exit?')
    }
    window.addEventListener('beforeunload', saveData)
    return () => {
      window.removeEventListener('beforeunload', saveData)
    }
  }, [])

  useEffect(() => {
    // 修改帮助文档地址
    const handleChangeHREF = (target: HTMLElement) =>
      target.setAttribute('href', DOCUMENT_LINK)
    const handleHelpDocument = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const parent = target?.parentElement?.parentElement
      if (target?.className === HELP_DOCUMENT_CLASS) {
        handleChangeHREF(target)
      } else if (parent?.className === HELP_DOCUMENT_CLASS) {
        handleChangeHREF(parent)
      }
    }
    window.addEventListener('click', handleHelpDocument)
    return () => {
      window.removeEventListener('click', handleHelpDocument)
    }
  }, [])
  return (
    <>
      <div
        style={{ width: '100%', height: '100%' }}
        ref={renderEditor}
        className="one-excalidraw"
      >
        {Excalidraw ? (
          <Excalidraw
            isCollaborating={true}
            UIOptions={UIOptions}
            langCode="zh-CN"
            initialData={initialData}
            ref={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
            onChange={onChange}
            onLibraryChange={onLibraryChange}
          >
            <BasicMainMenu />
            <BasicWelcome />
          </Excalidraw>
        ) : null}
      </div>
    </>
  )
}

export default OneExcalidraw
