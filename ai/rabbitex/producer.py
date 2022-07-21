# import sys
# import pika
 
# queue = 'heo_queue'
# message ='hello'
# #message = ' '.join(sys.argv[1:])
# print('//'+message)
 
# # Connection 생성
# connection = pika.BlockingConnection(pika.ConnectionParameters(
#                 host='localhost'
#                 , port=5672
#                 , virtual_host='/'
#                 , credentials=pika.PlainCredentials('jiwon', 'jiwon')   # username, password
#             ))
 
# # Server와 통신하기 위한 channel 생성
# channel = connection.channel()
 
# # Message Queue 생성
# channel.queue_declare(queue=queue)
 
# # Message 전송
# channel.basic_publish(
#     exchange=''             # 다른 Queue로 Routing하는 역할
#     , routing_key=queue     # Message를 적재할 Queue
#     , body=message          # 전송할 Message
# )
# print(" [x] Sent " + message )
 
# # Connection 종료
# connection.close()
