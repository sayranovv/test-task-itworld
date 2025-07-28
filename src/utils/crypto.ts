import CryptoJS from 'crypto-js'

// AES шифрование
export function encryptData(data: object, password: string): string {
  const jsonString = JSON.stringify(data)
  return CryptoJS.AES.encrypt(jsonString, password).toString()
}

// AES дешифрование
export function decryptData(encryptedText: string, password: string): object | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, password)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch {
    return null
  }
}
