import hashlib
import uvicorn
from fastapi import FastAPI, Body, Depends, HTTPException
import mysql.connector

from app.model import Tasks, UserAccount, UserLogin
from app.auth.jwt_handler import signJWT
from app.auth.jwt_bearer import jwtBearer
from fastapi.middleware.cors import CORSMiddleware
from decouple import config


app=FastAPI()

origins= ["http://localhost:65087", "http://localhost:65087/login"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

posts = [
    {
        "id":1, 
    "title":"Penguin",
    "content":"A group of acquatic flightless animals"
    },
    {
        "id":2, 
    "title":"Koala",
    "content":"..."
    },
    {
    "id":1, 
    "title":"Tiger",
    "content":"...Tiger..."
    },
    
]

users=[]

# Connect to the database
conn = mysql.connector.connect(
   host=config("host"),
    user=config("user"),
    password=config("password"),
    database=config("database")
)
# Create a cursor object
cursor = conn.cursor()


@app.get("/", tags=["Greeting"])
def greet():
    return {"msg":"Helloo World!"}

'''
@app.get("/posts", tags=["posts"])
def getPosts():
    return {"data": posts}

@app.get("/posts/{id}", tags=["posts"])
def getPostbyID(id: int):
    if id > len(posts):
        return { "error":"Posts with the ID does not exist!"}
    for p in posts:
        if p["id"] == id:
            return {"data": p}

@app.post("/posts", dependencies=[Depends(jwtBearer())], tags=["posts"])
def addPost(post: PostSchema):
    post.id = len(posts) + 1
    posts.append(post.dict())
    return {"data":"Post Added!"}

@app.post("/user/signup", tags=["user"])
def user_signup(user: UserSchema = Body(default=None)):             
# Body imported from fastapi
    users.append(user)
    return signJWT(user.email)

def check_user(data: UserLogin):
    for u in users:
        if u.email == data.email and u.password == data.password:
            return True
        else:
            return False
'''

@app.post("/user/login", tags=["user"])
def user_login(user: UserLogin = Body(default=None)):             
# Body imported from fastapi
    if check_user(user):
        return signJWT(user.email)
    else:
        return {"error": "Invalid Login!"}


def check_user(data: UserAccount = Body(default=None)):
    select_query = "SELECT * FROM users WHERE email = %s"
    values = (data.email,)
    cursor.execute(select_query, values)
    result = cursor.fetchone()
    if result:
        return True
    else:
        return False
    
@app.post("/user/register", tags=["user"])
def register_user(user: UserAccount = Body(default=None)):       
    # Hash the password
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()

    insert_query = """
    INSERT INTO users(name, password, email)
    VALUES (%s, %s, %s)
    """
    values = (user.name, hashed_password, user.email)
    data= {"email": user.email, "password": user.password }
    try:
        if check_user(user):
            return {"error":"User already registered."}
        else:
            cursor.execute(insert_query, values)
            conn.commit()

    except mysql.connector.Error as err:
        raise HTTPException(status_code=400, detail=f"Error: {err}")

    return signJWT(user.email)


#--------------------------------------------
# Adding Task APIs;   Pending: Add API Routing to separate Login and Task APIs


@app.get("/get_tasks", tags=["Tasks"])
def get_tasks():
    cursor=conn.cursor(dictionary=True)    #Instantiating mySQl curosr; Dictionary=True will give Json results
    cursor.execute("Select * from ToDo")
    records = cursor.fetchall()
    return records


@app.get("/get_task/{id}",tags=["Tasks"])
def get_task(id):
    cursor=conn.cursor(dictionary=True)    #Instantiating mySQl curosr; Dictionary=True will give Json results
    cursor.execute("Select * from ToDo WHERE id=(%s) limit 1",(id,))
    records = cursor.fetchall()
    return records

@app.post("/add_task", tags=["Tasks"])
def add_task(task: Tasks):
    try:
        cursor=conn.cursor()
        cursor.execute("insert into ToDo (task) values (%s)",(task.Task,))
        conn.commit()
        return {"message": "Added Successfully!" }
    except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))
 

@app.delete("/delete_task/{id}", tags=["Tasks"])
def delete_task(id: int):
    try:

        cursor = conn.cursor()
        query = "delete from Todo where id=%(id)s"
        cursor.execute(query, {'id':id})
        conn.commit()
        return "Deleted Successfully!"
    
    except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))


@app.patch("/update_task/{id}", tags=["Tasks"])
def update_task(id: int, task: Tasks):
     try:

        cursor = conn.cursor()    
        update_query = """
        UPDATE Todo SET Task= %s, isCompleted = %s
        WHERE id = %s
        """
        values = (task.Task, task.isCompleted, id)
        cursor.execute(update_query, values)
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "Task updated successfully"}
     except mysql.connector.Error as error:
        raise HTTPException(status_code=422, detail=str(error))











