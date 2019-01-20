FROM python:3.4-alpine
ADD . /code
WORKDIR /code
RUN apk add uwsgi-python3 python3
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
#CMD [ "uwsgi", "--socket", "0.0.0.0:3031", \
#               "--uid", "uwsgi", \
#               "--plugins", "python3", \
#               "--protocol", "uwsgi", \
#               "--wsgi", "main:application" ]
