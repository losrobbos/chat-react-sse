# Chat with Server Sent Events

This App show how to realize a chat by subscribing to events on a server using

- Server Sent Events (SSE) with Node / Express.js
- The EventSource class of JavaScript in the browser

Demo: [https://chat-sse-ui.vercel.app](https://chat-sse-ui.vercel.app/)

## Deployment Notes for 

In the demo the Frontend is deployed to Vercel and the backend / API to Heroku.

At the time of writing (Oct 2021) Vercel does not support natively push messages from a server, but Heroku does.

Wonder how to deploy one folder in your Repo to vercel and the other folder to Heroku?

To create a Heroku deploy project do:

`heroku login`
`heroku create:apps <YourApiName>` (example: `heroku create:apps my-chat-api`)

Heroku will now add a remote GIT connection, which you can see with:

`git remote -v`

Important: Now our MAIN folder is linked to Heroku. So when we deploy we would deploy both folder, the client and the API folder.

We do not want that.

We could create a sub-repository in the api folder instead, that that brings a lot of complications.

Instead we can now tell Heroku to push a subdirectory (!) on deploy.

Within your main repo folder do:

`git subtree push --prefix api heroku main`

Et voila: Now Heroku should just push and deploy the api folder and make it available on an URL.

Enjoy!