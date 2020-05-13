import { exec } from 'child_process'

import Sefaz from '../run/Sefaz'

export default class Shell {
  async restart ({ commands, flags }) {
    try {
      for (const command of commands) {
        /**
         * Restart CT-e service
         */
        if (command === 'cte') {
          this.executeCommands([
            'taskkill /f /im cmd.exe /fi "windowtitle eq CTE"',
            'taskkill /f /im apagt_cte_nfe.exe',
            'start "" "C:\\Users\\pedro.iconex\\Desktop\\CTE.bat"'
          ])
        }

        /**
         * Restart Email Integration service
         */
        if (command === 'email') {
          await this.executeCommands([
            'net stop apiintegracaoemailxml.exe',
            'net start apiintegracaoemailxml.exe',
            'net stop apiintegracaoemailedi.exe',
            'net start apiintegracaoemailedi.exe'
          ])
        }
      }
    } catch (err) {
      return err
    }
  }

  async run ({ commands, flags }) {
    try {
      for (const command of commands) {
        /**
         * Run IBGE
         */
        if (command === 'cte') {
          this.executeCommand('start "" "C:\\Users\\pedro.iconex\\Desktop\\CTE.bat"')
        }

        /**
         * ReSend to SEFAZ
         */
        if (command === 'sefaz') {
          await Sefaz.reSend(flags.unit)
        }

        /**
         * Run IBGE
         */
        if (command === 'ibge') {
          await this.executeCommand('node "D:\\API_NODE\\util\\ajustes\\corrigeIBGE.js"')
        }

        /**
         * Run IE
         */
        if (command === 'ie') {
          await this.executeCommand('node "D:\\API_NODE\\util\\ajustes\\corrigeIE.js"')
        }
      }
    } catch (err) {
      return err
    }
  }

  async executeCommands (commands) {
    for (const command of commands) {
      await this.executeCommand(command)
    }
  }

  executeCommand (command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error)
        if (stderr) reject(stderr)
        resolve('Success')
      })
    })
  }
}
