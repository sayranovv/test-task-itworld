import CryptoJS from 'crypto-js'

export function encryptData(data: object, password: string): string {
  const jsonString = JSON.stringify(data)
  const encrypted = CryptoJS.AES.encrypt(jsonString, password).toString()
  return encrypted
}

export function decryptData(encryptedText: string, password: string): object | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, password)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decrypted)
  } catch {
    return null
  }
}
