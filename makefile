BIN = ./node_modules/.bin

define release
	VERSION=`node -pe "require('./package.json').version"` && \
	NEXT_VERSION=`node -pe "require('semver').inc(\"$$VERSION\", '$(1)')"` && \
	node -e "\
		var j = require('./package.json');\
		j.version = \"$$NEXT_VERSION\";\
		var s = JSON.stringify(j, null, 2);\
		require('fs').writeFileSync('./package.json', s);" && \
	git commit -m "release $$NEXT_VERSION" -- package.json && \
	git tag "$$NEXT_VERSION" -m "release $$NEXT_VERSION"
endef

.PHONY: test

createMinorRelease:
	@$(call release,minor)

test:
	npm test

pushGithub:
	git push --tags origin HEAD:master

pushHeroku:
	git push heroku master

launch:
	open http://koavote.herokuapp.com

deploy: test createMinorRelease pushGithub pushHeroku launch