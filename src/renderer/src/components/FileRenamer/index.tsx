import { createRef, useEffect, useMemo, useState } from 'react'
import { container, dndArea, filesArea } from './style.css'
import { FileInfo } from '@renderer/env'
import { log } from 'console'

export const FileRenamer: React.FC = () => {
  const dndRef = createRef<HTMLDivElement>()
  const [files, setFiles] = useState<FileInfo[]>([])

  const preventDefault = (e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onDragOver = (e: DragEvent): void => {
    preventDefault(e)
  }

  const onDrop = (e: DragEvent): void => {
    preventDefault(e)
    setFiles(window.api.showFilePaths(Array.from(e.dataTransfer?.files ?? ([] as File[]))))
  }

  const renamedFiles: string[] = useMemo(() => {
    if (files.length === 0) return []
    return files.map((file, index) => {
      return `${index + 1}${file.ext}`
    })
  }, [files])

  useEffect(() => {
    dndRef.current?.addEventListener('dragover', onDragOver)
    dndRef.current?.addEventListener('drop', onDrop)

    return (): void => {
      dndRef.current?.removeEventListener('dragover', onDragOver)
      dndRef.current?.removeEventListener('drop', onDrop)
    }
  }, [dndRef])

  return (
    <div className={container}>
      <div className={dndArea} ref={dndRef} draggable>
        drag here
      </div>
      <div className={filesArea}>
        {files.map((file, index) => (
          <div key={index}>
            <div>{file.fullpath}</div>
            <div>dir: {file.dirname}</div>
            <div>file: {file.basename}</div>
          </div>
        ))}
      </div>
      <div className={filesArea}>
        {renamedFiles.map((file, index) => (
          <div key={index}>
            <div>renamed: {file}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
