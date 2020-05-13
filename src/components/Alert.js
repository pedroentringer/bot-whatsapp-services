import Shell from './Shell'
const shell = new Shell()

export default class Alert {
  static showAlert (title, message) {
    const { platform } = process
    if (platform === 'darwin') this.showAlertDarwin(title, message)
    if (platform === 'win32') this.showAlertWin(title, message)
  }

  static showAlertDarwin (title, message) {
    shell.executeCommand(`osascript -e 'display notification "${message}" with title "${title}"'`)
  }

  static showAlertWin (title, message) {
    shell.executeCommand(`msg %username% "${title} ${message}"`)
  }
}
