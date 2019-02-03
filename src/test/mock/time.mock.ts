import { MOCK_TS } from '@src/test/mock/mock.cnst'
import * as timemachine from 'timemachine'

export function mockTime (ts: number = MOCK_TS): void {
  timemachine.config({
    timestamp: ts * 1000,
  })
}

export function mockTimeReset (): void {
  timemachine.reset()
}
