from .swen610_db_utils import *
from datetime import datetime

def rebuild_tables():
    exec_sql_file('./schema.sql')
    #exec_commit(users_sql)

def login(email, password):
    user = exec_get_one('SELECT * FROM users WHERE email = %s', (email,))
    if user:
        user_dict = {
            'user_id': user[0],
            'name': user[1],
            'email': user[2],
            'phone_number': user[3],
            'gender': user[5],
            'created_at': user[6],
            'updated_at': user[7]
        }
    
    if user:
        if user[4] == password:
            return {'message': 'Successfully Loggedin', 'result': user_dict}, 200
        else:
            return {'message': 'Wrong password'}, 401

def create_user(data):
    user = exec_get_one('SELECT * FROM users WHERE email = %s', (data["email"],))
    if user:
        return {'message': 'User already exists'}, 409
    else:
        exec_commit("INSERT INTO users (name, email, phone_number, password, gender) VALUES (%s, %s, %s, %s, %s)",
                    (data["username"], data["email"], data['phone_number'], data['password'], data['gender']))
        return {'message': 'User created'}, 201

def update_user(email, name, phone_number, gender, allergies, present_craving):
    exec_commit("UPDATE users SET name = %s, phone_number = %s, gender = %s, allergies = %s, present_craving = %s WHERE email = %s",
                (name, phone_number, gender, allergies, present_craving, email))
    

def get_all_categories():
    return exec_get_all('SELECT * FROM categories')

def get_food_items(category_name):
    category = exec_get_one('SELECT category_id FROM categories WHERE category_name = %s', (category_name,))
    if category:
        return exec_get_all('SELECT * FROM food_items WHERE category_id = %s', (category[0],))
    return []

def add_food_item(item_name, category_name, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate):
    category = exec_get_one('SELECT category_id FROM categories WHERE category_name = %s', (category_name,))
    if category:
        exec_commit('INSERT INTO food_items (item_name, category_id, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', 
                    (item_name, category[0], calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate))

def update_food_item(item_name, category_name, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate):
    category = exec_get_one('SELECT category_id FROM categories WHERE category_name = %s', (category_name,))
    if category:
        exec_commit('UPDATE food_items SET calories = %s, total_fat = %s, saturated_fat = %s, trans_fat = %s, protein = %s, carbohydrate = %s WHERE item_name = %s AND category_id = %s', 
                    (calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate, item_name, category[0]))

def delete_food_item(item_name):
    exec_commit('DELETE FROM food_items WHERE item_name = %s', (item_name,))

def add_category(category_name):
    exec_commit('INSERT INTO categories (category_name) VALUES (%s)', (category_name,))

def delete_category_item(category_name):
    exec_commit('DELETE FROM categories WHERE category_name = %s', (category_name,))

def add_user_food_interests(email, food_interests):
    user = exec_get_one('SELECT user_id FROM users WHERE email = %s', (email,))
    if user:
        for food_item in food_interests:
            item = exec_get_one('SELECT item_id FROM food_items WHERE item_name = %s', (food_item,))
            if item:
                exec_commit('INSERT INTO cravings (user_id, food_item_id, craving_description) VALUES (%s, %s, %s)', 
                            (user[0], item[0], f'{email} likes {food_item}'))

def find_matching_users_by_food_interest(email):
    user = exec_get_one('SELECT user_id FROM users WHERE email = %s', (email,))
    if user:
        return exec_get_all('SELECT DISTINCT u.email FROM users u JOIN cravings c ON u.user_id = c.user_id WHERE c.food_item_id IN (SELECT food_item_id FROM cravings WHERE user_id = %s)', (user[0],))
    return []

def get_all_workshops():
    return exec_get_all('SELECT * FROM workshops')

def register_workshop(workshop_id):
    exec_commit('UPDATE workshops SET registered = TRUE WHERE workshop_id = %s', (workshop_id,))

def unregister_workshop(workshop_id):
    exec_commit('UPDATE workshops SET registered = FALSE WHERE workshop_id = %s', (workshop_id,))

def get_all_recipes():
    return exec_get_all('SELECT * FROM recipes')

def add_recipe(title, ingredients, instructions):
    exec_commit('INSERT INTO recipes (title, ingredients, instructions) VALUES (%s, %s, %s)', 
                (title, ingredients, instructions))

def toggle_favorite_recipe(recipe_id):
    exec_commit('UPDATE recipes SET favorite = NOT favorite WHERE recipe_id = %s', (recipe_id,))

def get_all_cravings():
    return exec_get_all('SELECT * FROM cravings')

def add_craving(user_id, food_item_id, craving_description):
    exec_commit('INSERT INTO cravings (user_id, food_item_id, craving_description) VALUES (%s, %s, %s)', 
                (user_id, food_item_id, craving_description))

def delete_craving(craving_id):
    exec_commit('DELETE FROM cravings WHERE craving_id = %s', (craving_id,))


