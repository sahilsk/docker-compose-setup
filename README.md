How-to guide
---

Pre-requisite
---

- docker
- docker-compose: Install from [here](https://docs.docker.com/compose/install/)

How to start
---

    $ cd </path/to/composetest/dir>
    $ docker-compose up

To run all containers in the background ie. detached

    $ docker-compose up -d


Each service specific instructions are in there respective README file. Refer them for further information on their working.


Test
---

From this directory, execute following commands:

    sleep 10; python test.py --domain "localhost" --port 443 --cert-path ./nginx/ssl/certs/ca.crt

> `sleep 10` : It's added as pm2 start takes few seconds to spin `n-` instance of the app. Check `process.yml` file for full configuration option.

Troubleshooting
---

- check logs of the problematic container in the console. If running in detached mode then use `docker logs ` command.


Contact
---

- sonu.kumar.meena (: