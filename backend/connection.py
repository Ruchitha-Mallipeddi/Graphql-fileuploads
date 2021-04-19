from minio import Minio
from minio.error import S3Error
def io_ctx():
        try:
                client = Minio("10.238.128.24:9000",access_key="ucmadmin",secret_key="ucmadmin", secure=False)
        except TypeError as e:
                print('Argument validation error: {}'.format(e))
                raise e
        print("Created cluster handle.")
        return client

io_ctx()