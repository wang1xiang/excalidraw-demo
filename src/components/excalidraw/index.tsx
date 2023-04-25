import {
  LiveCollaborationTrigger,
  WelcomeScreen,
  useHandleLibrary,
} from '@excalidraw/excalidraw'
import './index.css'
import MobileFooter from './MobileFooter'
import BasicMainMenu from './BasicMainMenu'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ExcalidrawDataType } from './types'
import {
  AppState,
  BinaryFileData,
  BinaryFiles,
  ExcalidrawImperativeAPI,
  LibraryItems,
} from '@excalidraw/excalidraw/types/types'
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import { debounce } from 'lodash'
import { useImmer } from 'use-immer'
import { useLiveQuery } from 'dexie-react-hooks'
import { changeFiles, ls } from './utils'
import { db } from '../hooks/filesDB'
import { EXCALIDRAW_ELEMENTS, FILES_STORE, LIBRARY_ELEMENTS } from './constants'

let saveExcalidrawData: ExcalidrawDataType = {}

const OneExcalidraw = () => {
  const UIOptions = {
    canvasActions: { toggleTheme: false },
    exportOpts: { renderCustomUI: '<div>123</div>' },
    dockedSidebarBreakpoint: 200,
  }

  const allFiles = useLiveQuery(() => db[FILES_STORE].toArray(), [])
  const [initialData, setInitialData] = useImmer<ExcalidrawDataType>({
    elements: [],
    appState: { isLoading: false },
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

  const [viewModeEnabled, setViewModeEnabled] = useState(false)
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
  const debounceChange = (
    elements: ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
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
        if (!isFileInStore) {
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

    const sceneElement = elements.filter((element) => !element.isDeleted)
    ls.setItem(EXCALIDRAW_ELEMENTS, sceneElement)
  }
  const onChange = useCallback(debounceChange, [debounceChange, allFiles])
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
  return (
    <>
      <div
        style={{ width: '100%', height: '100%' }}
        ref={renderEditor}
        className="one-excalidraw"
      >
        {Excalidraw ? (
          <Excalidraw
            UIOptions={UIOptions}
            langCode="zh-CN"
            initialData={initialData}
            viewModeEnabled={viewModeEnabled}
            ref={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
            onChange={onChange}
            onLibraryChange={onLibraryChange}
            // renderTopRightUI={() => (
            //   <LiveCollaborationTrigger
            //     isCollaborating={true}
            //     onSelect={() => {
            //       window.alert('You clicked on collab button')
            //     }}
            //   />
            // )}
          >
            {/* <BasicMainMenu /> */}
            <WelcomeScreen />
            <MobileFooter />
          </Excalidraw>
        ) : null}
      </div>
    </>
  )
}

export default OneExcalidraw
