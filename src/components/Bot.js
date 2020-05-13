import { parseString } from '@pedroentringer/parser-command-line'
import Shell from './Shell'

const shell = new Shell()

export default class Bot {
  constructor (client) {
    this.client = client
    this.contact = '5527981670051@c.us'
  }

  isAdmin (contact) {
    if (!this.client) throw new Error('Client is not ready!')

    if (contact !== this.contact) throw new Error('Client is not ready!')
  }

  async parseMessage ({ body, from }) {
    this.isAdmin(from)

    const { bin, commands, flags } = parseString(body)

    const availlableBins = ['restart', 'run', 'commands']

    if (availlableBins.find(availlableBin => availlableBin === bin)) {
      try {
        if (bin === 'commands') await this.showCommands(from)
        if (bin === 'restart') await shell.restart({ commands, flags })
        if (bin === 'run') await shell.run({ commands, flags })

        if (bin !== 'commands') await this.client.sendMessage(from, '✅ Command successfully executed')
      } catch (err) {
        await this.client.sendMessage(from, `⚠️ ${err.message}`)
      }
    } else {
      await this.client.sendMessage(from, '🙁 This is not a valid command.')
    }
  }

  async showCommands (from) {
    await this.client.sendMessage(from, '🚀 List of commands')
    await this.client.sendMessage(from, '*run [{programs}]*\nUsed to run some system services.\nAvailable: cte, sefaz, ibge and ie')
    await this.client.sendMessage(from, '*restart [{programs}]*\nUsed to restart some system services.\nAvailable: cte and email')
    await this.client.sendMessage(from, '*commands*\nUsed to list all accepted commands.')
  }
}
