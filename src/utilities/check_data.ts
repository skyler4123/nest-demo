export class CheckData {
  static isObject(x) {
    return typeof x === 'object' && !Array.isArray(x) && x !== null
  }
  static isEmptyObject(object: Object) {
    if (this.isObject(object)) {
      return Object.keys(object).length === 0
    } else {
      return false
    }
  }
  static isString(x) {
    return (typeof x === 'string' || x instanceof String)
  }
  static isDefined = (x) => {
    return typeof x !== 'undefined'  
  }
  static isUndefined = (x) => {
    return typeof x === 'undefined'  
  }
  static getKeyEndWith = (object, string) => {
    return Object.keys(object).filter((key) => key.endsWith(string))
  }
  static isArrayHasNull = (array) => {
    return array.includes(null)
  }
  static isArraytNull = (array) => {
    return array.every((element) => element === null)
  }
  static isObjectHasNull = (object) => {
    return this.isArrayHasNull(Object.values(object))
  }
  static isObjectNull = (object) => {
    return this.isArraytNull(Object.values(object))
  }
  static isArray = (x) => {
    return Array.isArray(x)
  }
}