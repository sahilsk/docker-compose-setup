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


For production
---

- try using uwsgi app server if planning to run in production. Also, tune process/thread parameters as per server configuration.