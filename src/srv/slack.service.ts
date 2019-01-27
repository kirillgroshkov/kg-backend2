import { gotService } from '@naturalcycles/nodejs-lib'
import { timeUtil } from '@src/datetime/time.util'
import { log } from '@src/services'

export interface SlackMessage {
  username?: string
  channel?: string
  icon_url?: string
  icon_emoji?: string
  text: string
}

export interface SlackServiceCfg {
  /**
   * Undefined means slack is disabled.
   */
  webhookUrl?: string
}

export class SlackService {
  constructor (private cfg: SlackServiceCfg) {}

  private get defaults (): SlackMessage {
    return {
      username: 'kg-backend',
      channel: '#log',
      icon_emoji: ':spider_web:',
      text: 'no text',
    }
  }

  async send (text: string, channel = 'log'): Promise<void> {
    await this.sendMsg({
      text,
      channel: '#' + channel,
    })
  }

  async sendMsg (_msg: SlackMessage): Promise<void> {
    const { webhookUrl } = this.cfg

    if (!webhookUrl) {
      log('SLACK:\n' + _msg.text)
      return
    }

    const body = {
      ...this.defaults,
      ..._msg,
    }

    this.decorateMsg(body)

    await gotService
      .post(webhookUrl, {
        body,
      })
      .catch(ignored => {}) // ignore, cause slack is weirdly returning non-json text "ok" response
  }

  // mutates
  private decorateMsg (msg: SlackMessage): void {
    const tokens: string[] = []

    tokens.push(timeUtil.nowPretty())
    tokens.push(msg.text)

    msg.text = tokens.join('\n')
  }
}
