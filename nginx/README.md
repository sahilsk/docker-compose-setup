App Gateway (Reverse Proxy)
---

Wrapper nginx dockerfile with self signed certificate support and client certificate based authencation.

Files included in this folder

- **mysite.template** : Edit this to create site configuration for your need
- **proxy-params.conf**: If nginx is used as reverse proxy, then to obtain client data(eg. IP address), these extra headers will be used.
- **ssl** : contains ssl security parameters along with self-signed certificates. Ideally, they should be stored in secure places like encrypted s3 or azure kv vault.


How to generate self-signed certificates with different domain?
---

- https://gist.github.com/sahilsk/ee95674b57021e25fcf3f0ef2738ff30

Currently "localhost" domain is used while generating certificate. So, no other domain will work



Reference
---

- [upstream conf](https://nginx.org/en/docs/http/ngx_http_upstream_module.html)
