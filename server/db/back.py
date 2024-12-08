from .swen610_db_utils import *
from  datetime import datetime
def rebuild_tables():
    exec_sql_file('./schema.sql')
    #exec_commit(users_sql)


def login(email, password):
    user = exec_get_one('SELECT * FROM users WHERE email = %s',(email,))
    if(user):
        if(user[4] == password):
            return {'message':'Successfully Loggedin'}, 200
        else:
            return {'message':'Wrong password'}, 401
def create_user(data):    
    user = exec_get_one('SELECT * FROM users WHERE email = %s',(data["email"],))
    if(user):
        if(user):
            return {'message':'User already exists'}, 409
        else:
            return {'message':'Wrong password'}, 401
    else:
        exec_commit("INSERT INTO users (name, email, phone_number, password, gender) VALUES (%s, %s, %s, %s, %s)",(data["username"],data["email"],data['phone_number'],data['password'], data['gender']))

