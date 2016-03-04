It is really simple to run everything locally.

#Run the Parse Server
You will need node, npm, and a mongodb service running in the background.

1. Clone the ankihubparse repo.
2. CD into that repo and run npm install.
3. Set up Environmental variables.
  - set SERVER_URL to 'http://localhost:1337'
  - set APP_ID to 'myAppId'
4. Run npm start.

#Run the AnkiHubPage

1. Clone the ankihub repo.
2. CD into that repo and run npm install. This will take some time.
3. Run npm start.

You can now query parse directly by sending request to http://localhost:1337
or query parse through the server middleman by sending request to whatever
url the ankihub gives you when run.
