FROM python:3.8
# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1

WORKDIR /backend
RUN pip install --upgrade pip

RUN FLASK_ENV=development
ENV FLASK_APP=app:app
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
# RUN pip3 install --upgrade pip && pip3 install --no-cache-dir Flask flask_prometheus_metrics
COPY . ./

# CMD ["bash", "-c", "python manage.py db migrate"]

COPY wait-for-it.sh /backend/wait-for-it.sh
RUN chmod +x /backend/wait-for-it.sh
RUN sed $'s/\r$//' ./wait-for-it.sh > ./wait-for-it.Unix.sh
#CMD [ "sed", "$'s/\r$//'", "./install.sh", ">", "./install.Unix.sh"]
CMD [ "wait-for-it.sh", "db:3306", "--", "gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
