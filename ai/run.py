# from tasks import calc
 
# # delay와 apply_async
# task_1 = calc.add.delay( 1, 2 )
# task_2 = calc.add.apply_async( args=[3, 4], ignore_result=True )
# task_3 = calc.add.apply_async( args=[5, 6], kwargs={} )
 
# print( "# 1. Task ID 확인" )
# print( "task_1 is {}".format( task_1.id ) )
# print( "task_2 is {}".format( task_2.id ) )
# print( "task_3 is {}".format( task_3.id ) )
 
# print( "\n# 2. Task 상태" )
# print( "task_1 is ready? {}".format( task_1.ready() ) )
# print( "task_2 is ready? {}".format( task_2.ready() ) )
# print( "task_3 is ready? {}".format( task_3.ready() ) )
 
# print( "\n# 3. 실행결과 확인" )
# print( "task_1 is {}".format( task_1.get() ) )
# print( "task_2 is {}".format( task_2.get() ) )
# print( "task_3 is {}".format( task_3.get() ) )
 
# print( "\n# 4. Task 상태" )
# print( "task_1 is ready? {}".format( task_1.ready() ) )
# print( "task_2 is ready? {}".format( task_2.ready() ) )
# print( "task_3 is ready? {}".format( task_3.ready() ) )