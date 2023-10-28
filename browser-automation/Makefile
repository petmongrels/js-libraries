deps:
	yarn install

test: compile
	yarn test

compile:
	npx babel src --out-dir dist --extensions '.js'

kill-chrome-drivers-only:
	-pkill -f chromedriver

show-chrome-drivers:
	ps -ef | grep chromedriver

kill-chrome-drivers: kill-chrome-drivers-only show-chrome-drivers

open-new-chrome-for-debug:
	-mkdir chromeUserDir
	/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9227 --user-data-dir=chromeUserDir
