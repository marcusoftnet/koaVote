


module.exports.existsAndNonEmpty = function (value){
  if(value === undefined)
    return false;
  if(value === null)
    return false;
  if(value === '')
    return false;
  return true;
};