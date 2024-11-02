import { contextBridge as electronContextBridge, webUtils } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import path from 'path'
import { FileInfo } from './types'

// Custom APIs for renderer
const api = {
  showFilePaths: (files: File[]): FileInfo[] => {
    return files.map((file) => {
      const fullpath = webUtils.getPathForFile(file)
      return { fullpath, dirname: path.dirname(fullpath), basename: path.basename(fullpath) }
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    electronContextBridge.exposeInMainWorld('electron', electronAPI)
    electronContextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
