broker_url = 'pyamqp://'
result_backend = 'rpc://'

task_serializer = 'json'
result_serializer = 'json'
accept_content = ['json']
timezone = 'Asia/Seoul'
enable_utc = True

# 오작동 한 작업을 전용 대기열로 라우팅하는 설정
task_routes = {
    'tasks.add': 'low-priority'
}

# 작업 속도를 제한하는 설정
task_annotations = {
    'tasks.add': {'rate_limit': '10/m' }
}