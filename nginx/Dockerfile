FROM nginx

#Copy SSL parameters
COPY ssl/ssl-params.conf /etc/nginx/snippets/ssl-params.conf

#Copy proxy parameters
COPY proxy-params.conf /etc/nginx/snippets/proxy-params.conf

#Copy SSL Certificates
COPY ssl/certs/domain.crt /etc/nginx/certs/domain.crt
COPY ssl/certs/domain.key /etc/nginx/certs/domain.key
COPY ssl/certs/ca.crt /etc/nginx/certs/ca.crt

RUN chmod 400 /etc/nginx/certs/*  
