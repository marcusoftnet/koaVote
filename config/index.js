var mongoProdUri = process.env.MONGOHQ_URL || 'localhost:27017/koaVote_Prod';
var adminUser = {
	name : process.env.BASIC_USER || 'marcus',
	pass : process.env.BASIC_USER || 'koavote'
};

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'localhost:27017/koaVote_Dev',
		user : adminUser
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongoUrl: 'localhost:27017/koaVote_Test',
		user : adminUser
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri,
		user : adminUser
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};