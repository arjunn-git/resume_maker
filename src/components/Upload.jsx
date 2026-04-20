import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function Upload({onUpload}){
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles)=>{
    const file = acceptedFiles[0]
    if(!file) return

    setLoading(true)
    setPreview(URL.createObjectURL(file))

    try {
      let text = ''

      if (file.type === 'application/pdf') {
        const pdfjsLib = await import('pdfjs-dist/build/pdf')
        if (pdfjsLib.GlobalWorkerOptions) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
        }
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
        const numPages = pdf.numPages
        const pageTexts = []

        for (let i = 1; i <= numPages; i += 1) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const pageText = content.items.map(item => item.str).join(' ')
          pageTexts.push(pageText)
        }

        text = pageTexts.join('\n')
      } else {
        text = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result || '')
          reader.onerror = () => reject(reader.error)
          reader.readAsText(file)
        })
      }

      onUpload({ file, name: file.name, preview: URL.createObjectURL(file), text })
      setLoading(false)
    } catch (e) {
      console.error('Resume load error:', e)

      // Fallback: set plain file name and keep app alive
      onUpload({ file, name: file.name, preview: URL.createObjectURL(file), text: file.name || '' })
      setLoading(false)
    }
  }, [onUpload])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop, 
    accept:{'application/pdf':[], 'text/plain':[]},
    multiple: false
  })

  return (
    <section className="p-6 border-2 border-dashed rounded-lg bg-white dark:bg-gray-800 shadow">
      <div 
        {...getRootProps()} 
        className={`cursor-pointer p-8 text-center transition ${
          isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-4xl mb-2">📄</div>
        {isDragActive ? (
          <p className="text-blue-600 dark:text-blue-400 font-medium">Drop your resume here...</p>
        ) : (
          <div>
            <p className="text-gray-900 dark:text-gray-100 font-medium">Drag & drop your resume here</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">or click to select (PDF or TXT)</p>
          </div>
        )}
      </div>
      
      {loading && (
        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm">
          Processing your resume...
        </div>
      )}
      
      {preview && !loading && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Preview:</p>
          <iframe title="preview" src={preview} className="w-full h-64 border rounded dark:border-gray-600" />
        </div>
      )}
    </section>
  )
}
