import time
from celery import Celery
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

app2 = Celery('tasks',
             broker_url='amqp://doodledoodle:doodledoodle@localhost:5672/',
    result_backend='db+mysql://root:mysql3306@localhost:3306/task')



@app2.task()
def longtime_add(x, y):
    logger.info('Got Request - Starting work ')
    time.sleep(4)
    logger.info('Work Finished ')
    return x + y