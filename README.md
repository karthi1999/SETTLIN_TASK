<!-- Initial Setup -->
There are three packages over there need to install all three by entering into the folder.

<!-- Postgres connection -->
Create the database with the below config.

const pool = new Pool({
  user: "root",
  password: "root@123",
  host: "localhost",
  port: "5432",
  database: "whizlabs_task"
})

<!-- Create connection -->
After config need to create connection with the exist database "whizlabs_task" 

<!-- Create schema -->
Need to create schema called whizlabs

<!-- Create table -->
Table declaration has shared, use that to create table 

<!--First create account schema -->
Because i have implemented forgien key with account and employee table path: "server/schema/account.schema.sql" and path: "sever/schema/employee.schema.sql"


<!-- Redis Connection --> 
Use the below config for redis, if the system doesn't contain please install it from browser

it will automatically run in defalut port no need to do anything with this

const redis = new Redis({
  host: "localhost",
  port: 6379 // default port
})

<!-- Setup completed -->

Open new terminal and run command line on parent folder

redis-cli 

<!--next-->

Now need to run command line on parent folder

npm run start


Now you can intract with browser