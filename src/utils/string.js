String.prototype.toCapital = function () {
  return this.slice(0, 1).toUpperCase() + this.slice(1)
}

String.prototype.toLower = function () {
  return this.slice(0, 1).toLowerCase() + this.slice(1)
}

export default String
