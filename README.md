# human-resources-app

## Installation

Clone the code from git
```
git clone https://github.com/dorinzaharia/human-resources-app.git
```
Install dependecies
```
cd human-resources-app
npm i
cd client
npm i
```
## Usage

In project root directory create .env file for environment variables
```
echo '
  PORT="Server port"
  DB_USERNAME="MongoDB username"
  DB_PASSWORD="MongoDB password"
  DB_CLUSTER="MongoDB cluster"
  DB_NAME="MongoDB DB name"
  SECRET_KEY="Secret key for bcrypt"
  BCRYPT_SALT="Salt for bcrypt"
' > .env
```
Create a folder in ther root directory to store images
```
mkdir uploads/
```
In client directory create .env file for server uri
```
cd client/
echo '
  REACT_APP_SERVER=http://host:PORT
' > .env
```
Start the client server
```
npm start
```
In another terminal start backend server /human-resources-app
```
pwd
..../human-resources-app
npm start
```
