# Chat with Server Sent Events

This App shows how to realize a chat by subscribing to events on a server using

- Server Sent Events (SSE) with Node / Express.js
- The EventSource class of JavaScript in the browser

Demo: [https://chat-sse-ui.vercel.app](https://chat-sse-ui.vercel.app/) (once opened => right click on the tab > "Duplicate" and start chatting with yourself :))

## Deployment Notes

In the demo the Frontend is deployed to VERCEL and the backend / API to HEROKU.

Why that?

At the time of writing (Oct 2021) Vercel does not support natively push messages from a server. 

But Heroku does.

Wonder how to deploy one folder in your repo to vercel and the other folder to Heroku?

First let's link our Repository to Heroku with:

`heroku login`

`heroku create:apps <YourApiName>` (example: `heroku create:apps my-chat-api`)

Heroku will now add a remote GIT connection, which you can see with:

`git remote -v`

Important: Now our MAIN folder is linked to Heroku. So when we deploy we would deploy both folders, the client and the API folder.

We do not want that.

We could create a sub-repository in the api folder instead, but that brings a lot of complications.

Instead we can now tell Heroku to push a subdirectory (!) only on deploy.

Within your main repo folder you can do this with:

`git subtree push --prefix api heroku main`

You can also view a short article on Heroku subfolder deploy here: https://janessagarrow.com/blog/how-to-deploy-a-subdirectory-to-heroku/

Et voila: Now Heroku should just push and deploy the api folder and make it available on an URL.

But you can still push both subfolders as usual to you Github repository using ...

`git push origin main`

Check it out, buddy! Enjoy :)
