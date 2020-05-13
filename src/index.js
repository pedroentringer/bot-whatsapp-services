import { Client } from 'whatsapp-web.js'

import Bot from './components/Bot'
import Alert from './components/Alert'
import Session from '../components/Session'

const client = new Client({
  puppeteer: {
    headless: !!Session.get()
  },
  session: Session.get()
})

const bot = new Bot(client)

client.on('ready', () => Alert.showAlert('[BOT] Pedro Entringer', 'Client is ready!'))

client.on('authenticated', (session) => Session.save(session))

client.on('message', message => bot.parseMessage(message))

client.initialize()
