import { isUndefined, mapValues, omitBy } from 'lodash-es'

interface RemoveEmptyValuesOptions {
  checkNull?: boolean
  checkEmptyArray?: boolean
  checkEmptyObject?: boolean
  checkEmptyString?: boolean
}

function isEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length === 0
}

function isEmptyObject(value: any): boolean {
  return value
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.keys(value).length === 0
}

function isEmptyString(value: any): boolean {
  return typeof value === 'string'
    && value.trim() === ''
}

export default function removeEmptyValues(target: any, options: RemoveEmptyValuesOptions = {}): any {
  const {
    checkNull = true,
    checkEmptyArray = true,
    checkEmptyObject = true,
    checkEmptyString = true,
  } = options

  const isEmpty = (value: any) => {
    return isUndefined(value)
      || (checkNull && value === null)
      || (checkEmptyArray && isEmptyArray(value))
      || (checkEmptyObject && isEmptyObject(value))
      || (checkEmptyString && isEmptyString(value))
  }

  if (Array.isArray(target)) {
    return target
      .map(item => removeEmptyValues(item, options))
      .filter(item => !isEmpty(item))
  }
  else if (target !== null && typeof target === 'object') {
    return omitBy(
      mapValues(target, value => removeEmptyValues(value, options)),
      value => isEmpty(value),
    )
  }
  return target
}
