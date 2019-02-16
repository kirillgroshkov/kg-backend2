import { ClassType, stringSharedUtil } from '@naturalcycles/js-lib'
import { aliasTo, asClass, createContainer, InjectionMode } from 'awilix'

export const INSTANCE_NAME = 'INSTANCE_NAME'
export const INSTANCE_ALIAS = 'INSTANCE_ALIAS'

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
})

/**
 * Wrapper around container.resolve() with some bonuses:
 * 1. Allows to pass ClassType as argument, resolves type automatically.
 * 2. Auto-register .asClass(ClassType).singleton() if wasn't registered before (with first letter lowercased).
 * instanceName is taken from `static INSTANCE_NAME` property OR lowercased className.
 * Aliases are applied if `static INSTANCE_ALIAS` string array is present.
 */
export function di<T = any> (token: string | symbol | ClassType<T>): T {
  if (typeof token !== 'function') {
    return container.resolve<T>(token)
  }

  const className = token.name

  if (!container.has(className)) {
    console.log(`auto-registering class ${className}`)
    container.register(className, asClass(token).singleton())

    const instanceName =
      (token[INSTANCE_NAME] as string) || stringSharedUtil.lowercaseFirstLetter(className)
    const aliases: string[] = [instanceName, ...(token[INSTANCE_ALIAS] || [])]

    aliases.forEach(alias => {
      if (!container.has(alias)) {
        console.log(`auto-registering alias ${alias} > ${className}`)
        container.register(alias, aliasTo(className))
      }
    })
  }

  return container.resolve<T>(className)
}

export function registerClass (c: ClassType): void {
  const className = c.name
  const instanceName =
    (c[INSTANCE_NAME] as string) || stringSharedUtil.lowercaseFirstLetter(className)
  const aliases: string[] = [instanceName, ...(c[INSTANCE_ALIAS] || [])]

  // console.log(`registerClass ${className}`)
  container.register(className, asClass(c).singleton())

  aliases.forEach(alias => {
    // console.log(`registerClass alias ${alias} > ${className}`)
    container.register(alias, aliasTo(className))
  })
}
