module.exports.checkProperties = (obj) => {
  if(Object.keys(obj).length === 0 && obj.constructor === Object) return false

  for (var key in obj) {
    if (obj[key] != "") return false;
  }

  return true;
}