In order to access the necessary environment variables, please create the following 2 .env files. These are essential when configuring your settings:

1. .env.development and run PGDATABASE=nc_news in this file

2. .env.test and run PGDATABASE=nc_news_test in this file

Then run the npm command npm install dotenv --save

You can now require this in wherever you need to use these environment variables you have just created
