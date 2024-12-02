'use client'

import React, { useState, useRef, forwardRef, useCallback } from 'react'

import { uploadFiles } from '@/app/actions'

type Props = object

type File = {
  name: string
  size: number
  type: string
  url: string
}

export default forwardRef<HTMLDialogElement, Props>(function UploadPopup(props, ref) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const changeHandler = useCallback(() => {
    const newFiles: File[] = []
    for (const f of fileInputRef.current!.files!) {
      if (files.find(ef => ef.name === f.name) === undefined) {
        newFiles.push({ name: f.name, size: f.size, type: f.type, url: URL.createObjectURL(f) })
      }
    }
    setFiles([...files, ...newFiles])
  }, [files])

  return (
    <dialog ref={ref} className='sm:max-w-lg bg-white rounded-xl'>
      <form method='dialog' className='grid w-full p-10 gap-2'>
        <h2 className='text-center text-3xl font-bold text-gray-900'>Upload media</h2>
        <button type='button' className='mt-3' onClick={() => fileInputRef.current?.click()}>Select files</button>
        <input type='file' className='hidden' multiple ref={fileInputRef} onChange={changeHandler} />
        <button type='submit' onClick={uploadFiles}
          className='w-full flex justify-center bg-blue-500 text-gray-100 p-2 rounded-full tracking-wide
            font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300'>
          Upload {files.length} files
        </button>
      </form>
    </dialog>
  )
})
