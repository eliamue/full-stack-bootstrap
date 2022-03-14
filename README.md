# SET UP HEROKU AND GET POSTGRES-HEROKU URI

## IN TERMINAL: 
### heroku create

## IN HEROKU: 

### 1. Open up auto-generated heroku app

### 2. Deploy tab 
#### Select Github deployment method, find correct github repo, and set up auto-deploys

### 3. Resources tab
#### Add-ons > Heroku Postgres > Open Heroku Postgres > Settings > View Credentials > copy the full URI

### 4. Settings tab 
#### Reveal Config Vars > set key DATABASE_URL to be the copied URI
#### Change name to newname, then follow below steps to update remote


## IN TERMINAL: 

### To change to correct heroku name
#### 1. git remote rm heroku
#### 2. heroku git:remote -a newname

### To check that it is connected to the correct DATABASE_URL
#### heroku config:get DATABASE_URL

### Commands to setup and start db
#### a. npm run setup-heroku
#### b. npm run start
#### c. npm run setup-db
