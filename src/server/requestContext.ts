/**
 * To be used in services instead of Express.Request.
 * To decouple business logic from Express.
 * To allow to safely log this object or pass over the wire (e.g in MQ).
 * Because Express.Request is dangerous to console.log() or serialize in other way.
 */
export class RequestContext {
  adminToken?: string
}
