String.prototype.toCapital = ():string => {
  return this.slice(0, 1).toUpperCase() + this.slice(1)
}

String.prototype.toLower = ():string => {
  return this.slice(0, 1).toLowerCase() + this.slice(1)
}

export default String
