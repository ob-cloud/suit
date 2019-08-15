String.prototype.toCapital = () => {
  return this.slice(0, 1).toUpperCase() + this.slice(1)
}

String.prototype.toLower = () => {
  return this.slice(0, 1).toLowerCase() + this.slice(1)
}
