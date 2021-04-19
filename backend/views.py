#response = requests.request("POST", url, headers=headers, params=querystring)
#url = "http://192.168.1.59:8080/v1/AUTH_gv0/mycontainer/mytestfile"

#response = requests.request("GET", url)

import os, json
from flask import Flask, request, render_template, Response
import requests
from flask_cors import CORS
from connection import io_ctx
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/files/upload/bucket/<string:bucketName>/file/<string:fileName>', methods=['POST'])
def upload_file(bucketName,fileName):
        import pdb;
        pdb.set_trace()       
        client=io_ctx()       
        content=BytesIO(request.data)        
        found = client.bucket_exists(bucketName)
        if found !=True :
             client.make_bucket(bucketName)        
        
        result = client.put_object(bucketName, fileName, content, length=-1, part_size=10*1024*1024,)
        #result = client.put_object(bucketName, "mop/"+fileName, content, length=-1, part_size=10*1024*1024,)      
        print("result of upload ----->", result)      
        return 'File Uploaded Successful'


@app.route('/files', methods=['GET'])
def get_all_objects():
        # url = "http://192.168.1.59:8080/v1/AUTH_gv0/mycontainer/"
        # response = requests.request("GET", url)
        # print("response", response)
        client=io_ctx()
        objects = client.list_objects("api-upload")
        print("1")
        #print(dir(objects))
        fileNames=[]
        for obj in objects:
            #print(dir(obj))
            fileNames.append(obj.object_name)
            #fileNames.append(obj.key)
        #fileNamess=[fileNames.append(i.key) for i in object_iterator]
        print(fileNames)
        #print(object_iterator.__next__())
        #print(object_iterator.__next__().stat())
        #temp=object_iterator.__next__()
        #xitr=ioctx.get_xattrs("1.jpg")
        #print("iterator - value ------",xitr.__next__())
        #print("get attr=== ",ioctx.get_xattr("1.jpg","name"))
        #print("estras attras==>", xtra)
        #print("temp =====>",temp.name())
        #print("rados -->",rados_object.filename)
        #while True:
        #       rados_object=object_iterator.__next__()
        #       print("","Object contents = {}".format(rados_object.read()))
        return json.dumps(fileNames)
@app.route('/files/<string:bucketName>', methods=['GET'])
def get_all_objects_in_bucket(bucketName):
       
        client=io_ctx()
        objects = client.list_objects(bucketName)
        print("1")
        #print(dir(objects))
        fileNames=[]
        for obj in objects:
            #print(dir(obj))
            fileNames.append(obj.object_name)
            #fileNames.append(obj.key)
      
        print(fileNames)
        
        return json.dumps(fileNames)



@app.route('/files/download/<string:name>', methods=['GET'])
def get_one_objects(name):
        #url = "http://192.168.1.59:8080/v1/AUTH_gv0/mycontainer/{}".format(id)
        #print("url", url)
        #response = requests.request("GET", url)
        #print("response", response)
        #print("response content -->", response.content)
        #return response.contp://localhost:8080/object/mytestfile1
        client=io_ctx()
        object=client.get_object("api-upload", name)
        #print("flask -> ",Flask)
        resp = Response(object)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        print("response ->", resp)
        return resp


@app.route('/files/<string:name>', methods=['DELETE'])
def delete_object(name):
 ioctx=io_ctx()
 ioctx.remove_object(name)
 return 'Deleted '+name




@app.route('/files/<string:bucket>/<string:object_path>', methods=['GET'])
def get_presigned_put_url(bucket:str,object_path:str):
        client=io_ctx()
        found = client.bucket_exists(bucket)
        if found !=True :
             client.make_bucket(bucket)   
        url=client.presigned_put_object(
                bucket_name=bucket,
                object_name=object_path,
                )
        return url

@app.route('/files/bucket/<string:bucket>/file/<string:object_path>/download', methods=['GET'])
def get_presigned_get_url(bucket:str,object_path:str):
        client=io_ctx()        
        # client.make_bucket(bucket)
        url=client.presigned_get_object(
                bucket_name=bucket,
                # object_name="mop/"+object_path,
                object_name=object_path,
                )
        return url


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081, debug=True)


#SET FLASK_ENV=development
#python test.py
#flask run