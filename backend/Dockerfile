FROM python:3.8
# This prevents Python from writing out pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# This keeps Python from buffering stdin/stdout
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
RUN pip install --upgrade pip
# RUN pip install CMake
# RUN pip install dlib
RUN FLASK_ENV=development
ENV FLASK_APP=app:app
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
# RUN pip3 install --upgrade pip && pip3 install --no-cache-dir Flask flask_prometheus_metrics
COPY . ./

# CMD ["bash", "-c", "python manage.py db migrate"]

