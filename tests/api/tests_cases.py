import unittest
from  import *
import requests
import json
import hashlib

class TestExample(unittest.TestCase):
    
    def setUp(self):  
        """Initialize DB using API call"""
        post_rest_call(self, 'http://localhost:4999/manage/init')
        print("DB Should be reset now")

    def test_check_Categories(self):
        result = get_rest_call(self, 'http://localhost:4999/Categories')
        self.assertEqual(6, len(result), "Should have returned a length of '6'")

    def test_check_FoodItems(self):
        result = get_rest_call(self, 'http://localhost:4999/Food_items/Proteins')
        self.assertEqual(1, len(result), "Should have returned a length of '1'")
    
    def test_New_FoodItem(self):
        data = dict(category='Proteins', itemName='New_item', calories=1, totalFat=1, saturatedFat=1, transFat=1, protein=1, carbohydrate=1)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/Change', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/Food_items/Proteins')
        self.assertEqual(2, len(result), "Should have returned a length of '2'")
    
    def test_Delete_FoodItem(self):
        hdr = {'category': 'Proteins', 'itemName': 'New_item'}
        delete_rest_call(self, 'http://localhost:4999/Delete', hdr)
        result = get_rest_call(self, 'http://localhost:4999/Food_items/Proteins')
        self.assertEqual(1, len(result), "Should have returned a length of '1'")
    
    def test_Update_FoodItem(self):
        data = dict(category='Proteins', itemName='Steak', calories=10, totalFat=1, saturatedFat=1, transFat=1, protein=1, carbohydrate=1)
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/Update', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/Food_items/Proteins')
        self.assertEqual(1, len(result), "Should have returned a length of '1'")
    
    def test_Add_Category(self):
        data = dict(add_category='New_Category')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/Add_Category', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/Categories')
        self.assertEqual(7, len(result), "Should have returned a length of '7'")

    def test_Delete_Category(self):
        hdr = {'delete_category': 'New_Category'}
        delete_rest_call(self, 'http://localhost:4999/Delete_Category', hdr)
        result = get_rest_call(self, 'http://localhost:4999/Categories')
        self.assertEqual(6, len(result), "Should have returned a length of '6'")
    
    def test_add_user(self):
        data = dict(email='Kaleem@gmail.com', password='Kaleem6161', username='Kaleem', mobile='1234567890', dateOfBirth='1990-01-01', gender='Male')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/register', jdata, hdr)
        self.assertEqual(201, result.status_code, "Should have returned a status code of '201'")
    
    def test_login_user(self):
        data = dict(email='Sakshi@gmail.com', password='Sakshi')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/login', jdata, hdr)
        self.assertEqual(200, result.status_code, "Should have returned a status code of '200'")
        self.assertEqual(True, result.json['message'] == 'Successfully Loggedin', "Should have returned a success message")

    def test_check_Version(self):
        result = get_rest_call(self, 'http://localhost:4999/manage/version')
        self.assertEqual(200, result.status_code, "Should have returned a status code of '200'")
        self.assertIn('version', result.json, "Should have returned the version")

    def test_add_existing_user(self):
        data = dict(email='n23@gmail.com', password='n236161', username='Nithikesh', mobile='1234567890', dateOfBirth='1990-01-01', gender='Male')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/register', jdata, hdr)
        self.assertEqual(201, result.status_code, "Should have returned a status code of '201'")
    
    
    def test_get_Workshops(self):
        result = get_rest_call(self, 'http://localhost:4999/workshops')
        self.assertGreaterEqual(len(result.json), 2, "Should have returned at least 2 workshops")

    def test_register_Workshop(self):
        data = {'workshop_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/workshops', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/workshops')
        self.assertTrue(any(workshop['workshop_id'] == 1 and workshop['registered'] for workshop in result.json), "Workshop should be registered")

    def test_unregister_Workshop(self):
        data = {'workshop_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        delete_rest_call(self, 'http://localhost:4999/workshops', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/workshops')
        self.assertFalse(any(workshop['workshop_id'] == 1 and workshop['registered'] for workshop in result.json), "Workshop should be unregistered")

    def test_get_Recipes(self):
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertGreaterEqual(len(result.json), 2, "Should have returned at least 2 recipes")

    def test_add_Recipe(self):
        data = {'title': 'New Recipe', 'ingredients': 'Ingredients', 'instructions': 'Instructions'}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/recipes', jdata, hdr)
        self.assertEqual(201, result.status_code, "Should have returned a status code of '201'")
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertTrue(any(recipe['title'] == 'New Recipe' for recipe in result.json), "Recipe should be added")


    def test_toggle_Favorite_Recipe(self):
        data = {'recipe_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        put_rest_call(self, 'http://localhost:4999/recipes', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertTrue(any(recipe['recipe_id'] == 1 and recipe['favorite'] for recipe in result.json), "Recipe favorite status should be toggled")

    def test_delete_Recipe(self):
        data = {'title': 'New Recipe', 'ingredients': 'Ingredients', 'instructions': 'Instructions'}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/recipes', jdata, hdr)
        self.assertEqual(201, result.status_code, "Should have returned a status code of '201'")
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertTrue(any(recipe['title'] == 'New Recipe' for recipe in result.json), "Recipe should be added")


    def test_get_Cravings(self):
        result = get_rest_call(self, 'http://localhost:4999/cravings')
        self.assertGreaterEqual(len(result.json), 2, "Should have returned at least 2 cravings")

    def test_add_Craving(self):
        data = {'user_id': 1, 'food_item_id': 1, 'craving_description': 'New craving description'}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/cravings', jdata, hdr)
        self.assertEqual(201, result.status_code, "Should have returned a status code of '201'")
        result = get_rest_call(self, 'http://localhost:4999/cravings')
        self.assertTrue(any(craving['craving_description'] == 'New craving description' for craving in result.json), "Craving should be added")
    
    def test_delete_Craving(self):
        data = {'craving_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = delete_rest_call(self, 'http://localhost:4999/cravings', jdata, hdr)
        self.assertEqual(200, result.status_code, "Should have returned a status code of '200'")
        result = get_rest_call(self, 'http://localhost:4999/cravings')
        self.assertFalse(any(craving['craving_id'] == 1 for craving in result.json), "Craving should be deleted")