import os
import boto3, os
from config import AWS_ACCESS_KEY, AWS_SECRET_KEY 
from config import BUCKET_NAME,BUCKET_REGION

# s3에 connection 하는 과정 
def s3_connection():
    s3 = boto3.client('s3', region_name = BUCKET_REGION, aws_access_key_id = AWS_ACCESS_KEY,aws_secret_access_key = AWS_SECRET_KEY)
    return s3

def s3_put_object(s3, bucket, filepath, filename):
    '''
    s3 bucket에 지정 파일 업로드
    :param s3: 연결된 s3 객체(boto3 client)
    :param bucket: 버킷명
    :param filepath: 파일 위치
    :param filename: 저장 파일명
    :return: 성공 시 True, 실패 시 False 반환
    '''
    try:
        s3.upload_file(filepath, bucket, filename)
    except Exception as e:
        print(e)
        return False
    return True

def s3_get_image_url(s3, filename : str) -> str:
    """
    s3 : 연결된 s3 객체(boto3 client)
    filename : s3에 저장된 파일 명
    """
    return f'https://{BUCKET_NAME}.s3.{BUCKET_REGION}.amazonaws.com/{filename}' 
    
