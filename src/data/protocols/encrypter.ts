export interface Encrypter {
  encrypt: (valur: string) => Promise<string>
}
