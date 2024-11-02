import { ElectronAPI } from '@electron-toolkit/preload'
import { FileInfo } from '@renderer/env'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IAPI
  }
}

export interface IAPI {
  showFilePaths: (files: File[]) => FileInfo[]
}
