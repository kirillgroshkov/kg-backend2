import { timeUtil } from '@src/datetime/time.util'
import { securityService } from '@src/srv/security.service'

export interface CreatedUpdated {
  created: number
  updated: number
}

export interface CreatedUpdatedId extends CreatedUpdated {
  id: string
}

export function createdUpdatedFields (existingObject?: CreatedUpdated): CreatedUpdated {
  const now = timeUtil.nowUnixtime()
  return {
    created: (existingObject && existingObject.created) || now,
    updated: now,
  }
}

export function createdUpdatedIdFields (existingObject?: CreatedUpdatedId): CreatedUpdatedId {
  const now = timeUtil.nowUnixtime()
  return {
    created: (existingObject && existingObject.created) || now,
    id: (existingObject && existingObject.id) || securityService.generateStringId(),
    updated: now,
  }
}
