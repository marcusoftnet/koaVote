var should = require("should");

describe("Configuration", function () {

  var validateConfig = function (config) {
	should.exists(config.mode);
	config.mode.should.not.be.emtpy;

	should.exists(config.mongoUrl);
	config.mongoUrl.should.not.be.emtpy;

	should.exists(config.port);
	config.port.should.not.be.emtpy;

	should.exists(config.user);
	config.user.should.not.be.emtpy;
	should.exists(config.user.name);
	config.user.name.should.not.be.emtpy;
	should.exists(config.user.pass);
	config.user.pass.should.not.be.emtpy;
  };

  describe("Local configuration", function () {
	var config = {};
	before(function (done) {
	  config = require("../config")("local");
	  done();
	});

	it("loads local configuration default", function (done) {
	  var localConfig = require("../config")();
	  localConfig.mode.should.equal("local");
	  done();
	});
	it("loads config by parameter", function (done) {
	  config = require("../config")("local");
	  config.mode.should.equal("local");
	  done();
	});
	it("loads local configuration for unknown configurations", function (done) {
	  var config = require("../config")("unknown");
	  config.mode.should.equal("local");
	  done();
	});
	it("has all the valid properties", function (done) {
	  validateConfig(config);
	  done();
	});
  });

  describe("Staging configuration", function () {
	var config = require("../config")('staging');

	it("loads config by parameter", function (done) {
	  config.mode.should.equal("staging");
	  done();
	});
	it("has all the valid properties", function (done) {
	  validateConfig(config);
	  done();
	});
  });

  describe("Productions configuration", function () {
	var config = require("../config")('prod');

	it("loads config by parameter", function (done) {
	  config.mode.should.equal("prod");
	  done();
	});
	it("has all the valid properties", function (done) {
	  validateConfig(config);
	  done();
	});
  });
});