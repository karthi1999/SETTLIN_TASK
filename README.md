<!-- Initial Setup -->
There are three packages over there, need to install all three by entering into the folder.

<!-- Postgres connection -->
Here i've used postgresql for data storage, Create the database with the below config.

const pool = new Pool({
  user: "root",
  password: "root@123",
  host: "localhost",
  port: "5432",
  database: "expense_tracker"
})

<!-- Create connection -->
After config need to create connection with the exist database "expense_tracker" 

<!-- Create schema -->
Need to create schema called expense_tracker

<!-- Create table -->
Table declaration has shared, use that to create table, you can find the table structure on server/src/schema

<!--First create account schema -->
Because i have implemented forgien key with account and expense table path: "server/schema/account.schema.sql" and path: "sever/schema/expense.schema.sql", "server/schema/limit.sql"


<!-- Redis Connection --> 
Use the below config for redis, if the system doesn't contain redis, please install it from browser

it will automatically run in defalut port, no need to do anything with this

const redis = new Redis({
  host: "localhost",
  port: 6379 // default port
})

<!--next-->

Now need to run command line on parent folder

npm run start


Now you can intract with browser
