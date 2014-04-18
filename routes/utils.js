var exists = function (value) {
	if(value === undefined)
		return false;
	if(value === null)
		return false;
	return true;
};
module.exports.exists = exists;

module.exports.existsAndNonEmpty = function (value){
	if(!exists(value))
		return false;
	if(value === '')
		return false;
	return true;
};