About
---

A simple 2 nano serivce with two endpoints exposed

- `GET /` :  A simple hello world
- `POST /messages POST` : Create a hash of the message.

    Message format:
    ```
    {
        "message": "data"
    }
    ```
- `GET /messages/hash`: Get the decoded message back.


How-to guide
---

## Install dependencies

    $ yarn install

    #or

    $ npm install
    
## Run

    yarn run pm2 start process.yml --no-daemon

- **process.yml**: This file contain pm2 configuration. Currently, it's set to output log on the stdout/stderr and running 4 instances of the applcation.

Please refer online doc on pm2 [here](http://pm2.keymetrics.io/docs/usage/application-declaration/)


By default app runs on port 5000. Set environment APP_PORT to change the port

Reference
---

- **pm2**: http://pm2.keymetrics.io/
- **http.createServer**: https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
