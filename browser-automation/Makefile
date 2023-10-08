deps:
	yarn install

test:
	yarn test

kill-chrome-drivers-only:
	-pkill -f chromedriver

show-chrome-drivers:
	ps -ef | grep chromedriver

kill-chrome-drivers: kill-chrome-drivers-only show-chrome-drivers
