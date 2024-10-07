from fastapi import FastAPI, Form, HTTPException   #
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

from Task import Tasks #frontend to api connection requires this


app= FastAPI()
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Mysql321!",
    database="todoapp"
)

origins=[
    "http://localhost:4200",
    "http://localhost:4200/edit/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {"message":"Hello World"}

@app.get("/get_tasks")
def get_tasks():
    cursor=conn.cursor(dictionary=True)    #Instantiating mySQl curosr; Dictionary=True will give Json results
    cursor.execute("Select * from ToDo")
    records = cursor.fetchall()
    return records


@app.get("/get_task/{id}")
def get_task(id):
    cursor=conn.cursor(dictionary=True)    #Instantiating mySQl curosr; Dictionary=True will give Json results
    cursor.execute("Select * from ToDo WHERE id=(%s) limit 1",(id,))
    records = cursor.fetchall()
    return records



@app.post("/add_task")
def add_task(task: str = Form(...)):
    try:
        cursor=conn.cursor()
        cursor.execute("insert into ToDo (task) values (%s)",(task,))
        conn.commit()
        return {"message": "Added Successfully!" }
    except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))


@app.delete("/delete_task/{id}")
def delete_task(id: int):
    try:

        cursor = conn.cursor()
        query = "delete from Todo where id=%(id)s"
        cursor.execute(query, {'id':id})
        conn.commit()
        return "Deleted Successfully!"
    
    except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))

'''
@app.patch("/update_task/{id}")
def update_task(id:int, task: Tasks):
    try:

        cursor = conn.cursor()
       # query = "UPDATE Todo SET Task=%(Task)s, isCompleted=%(isCompleted)s, Date=%(Date)s where id=%(id)s"
       # cursor.execute(query, {'id':id, 'Task':task.Task, 'isCompleted': task.isCompleted, 'Date': task.date})
        query="Select * from ToDo WHERE id=%(id)s limit 1"
        cursor.execute(query, {'id':id})


        conn.commit()
        return "Updated Successfully!"
    except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))







@app.delete("/delete_task")
def delete_task(id: str = Form(...)):
    try:

        cursor = conn.cursor()
        cursor.execute("delete from Todo where id=%s", (id,))
        conn.commit()
        return "Deleted Successfully"
    except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))

'''