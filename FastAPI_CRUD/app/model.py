from sqlite3 import Date
from pydantic import BaseModel, Field, EmailStr

class UserAccount(BaseModel):
    name: str= Field(default=None)
    email: EmailStr = Field(default=None)
    password: str= Field(default=None)
    class Config:
        schema = {
            "user":{ 
                "name":"abc",
                "email":"abc@gmail.com",
                "password":"123"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr = Field(default=None)
    password: str= Field(default=None)
    class Config:
        schema = {
            "user":{ 
                "email":"abc@gmail.com",
                "password":"123"
            }
        }



class Tasks(BaseModel):
    Task: str = Field(default=None)
    isCompleted: bool = Field(default=None)
    date: Date = Field(default=None)
    class Config:
        schema = {
            "task":{ 
                "Task":"do something",
                "isCompleted": False,
                "date": Date.today()

            }
        }




'''
class DBModel(BaseModel):   
    username: str
    password: str
    email: str

class PostSchema(BaseModel):
    id: int = Field(default=None)
    title: str = Field(default=None)
    content: str = Field(default=None)
    
    class Config:
        schhema={
            "post_demo":{ "title": "Soem title", "content": "some content"}
        }
'''

