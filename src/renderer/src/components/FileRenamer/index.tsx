import { createRef, useEffect, useState } from 'react'
import { container, dndArea, filesArea } from './style.css'
import { FileInfo } from '@renderer/env'

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
    </div>
  )
}
