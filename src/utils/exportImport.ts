import { encryptData, decryptData } from './crypto'
import { saveAs } from 'file-saver'

// функция экспорта задач в файл
export function exportToFile(data: object, password: string) {
  const encrypted = encryptData(data, password)
  const blob = new Blob([encrypted], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'todo-export.txt')
}

// функция импорта задач из файла
export function importFromFile(file: File, password: string): Promise<object | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const encryptedText = reader.result as string
        const data = decryptData(encryptedText, password)
        resolve(data)
      } catch (error) {
        reject(null)
      }
    }

    reader.onerror = () => reject(null)

    reader.readAsText(file)
  })
}
