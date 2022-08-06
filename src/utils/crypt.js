import CryptoJS from 'crypto-js'
import SecureStorage from 'secure-web-storage'

const SECRET_KEY = process.env.VUE_APP_SECRET_KEY_STORAGE

const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY)

      return key.toString()
  },

  encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY)

      data = data.toString()

      return data
  },

  decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY)

      data = data.toString(CryptoJS.enc.Utf8)

      return data
  }
})

export default secureStorage
// import secureStorage from '../../utils/crypt'
// secureStorage.setItem('codigo', 'Teste de mensagem vai la');
// console.log(secureStorage.getItem('codigo'))
// console.log(secureStorage.removeItem('codigo'))