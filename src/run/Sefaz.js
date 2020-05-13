import axios from 'axios'

const api = axios.create({
  baseURL: 'http://api.iconexlog.com.br/libera/receita/'
})

export default class Sefaz {
  static async reSend (unit) {
    await api.get(unit)
  }
}
