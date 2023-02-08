# W5_Test

install node packages  command : npm i
data base connection string in env file  DB_URL=” ”
create tables in postgresSQL  command : npm run migrate
add dummy data into tables  command : npm run seed.
run server   command : npm start
APIs end points :
	signup users    :  “http://localhost:4000/signup”
		payload:    username  :  ””
					password  :  ”” 
		
	Signin users    :  “http://localhost:4000/signup”
				
		payload:    username  :  ””
					password  :  ”” 

	userslist       :  “http://localhost:4000/userlist”
				
		payload:    cookie

	logout          :  “http://localhost:4000/logout”
					
		payload:    cookie