import unittest
from tests.test_utils import *
import requests
import json
import hashlib

class TestExample(unittest.TestCase):
    
    def setUp(self):  
        """Initialize DB using API call"""
        post_rest_call(self, 'http://localhost:4999/manage/init')
        print("DB Should be reset now")

    def test_init_db(self):
        result = post_rest_call(self, 'http://localhost:4999/manage/init')
        self.assertEqual(result['message'], 'Database initialized successfully.', "Database should be initialized successfully")

    def test_check_version(self):
        result = get_rest_call(self, 'http://localhost:4999/manage/version')
        self.assertIsNotNone(result, "Result should not be None")
        self.assertIn('version', result, "Should have returned the version")

    def test_add_user(self):
        data = dict(email='Kaleem@gmail.com', password='Kaleem6161', username='Kaleem', mobile='1234567890', dateOfBirth='1990-01-01', gender='Male')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/register', jdata, hdr, expected_code=201)
        
        self.assertEqual(result['message'], 'User created', "User should be created successfully")

    def test_login_user(self):
        data = dict(email='sakshi@gmail.com', password='password123')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/login', jdata, hdr)
        
        self.assertEqual(result['message'], 'Successfully Loggedin', "User should be logged in successfully")

    def test_update_user(self):
        data = dict(email='sakshi@gmail.com', name='Sakshi', phone_number='1234567890', gender='Female', allergies='None', present_craving='Pizza')
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = put_rest_call(self, 'http://localhost:4999/update', jdata, hdr)
        self.assertIsNotNone(result, "Result should not be None")
        self.assertEqual(result['message'], 'User details updated successfully', "User details should be updated successfully")

    def test_get_workshops(self):
        result = get_rest_call(self, 'http://localhost:4999/workshops')
        self.assertIsInstance(result, list, "Result should be a list")
        self.assertGreaterEqual(len(result), 2, "Should have returned at least 2 workshops")

    def test_register_workshop(self):
        data = {'workshop_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/workshops', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/workshops')
        self.assertIsInstance(result, list, "Result should be a list")


    def test_get_recipes(self):
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertIsInstance(result, list, "Result should be a list")
        self.assertGreaterEqual(len(result), 2, "Should have returned at least 2 recipes")

    def test_add_recipe(self):
        data = {'title': 'New Recipe', 'ingredients': 'Ingredients', 'instructions': 'Instructions'}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/recipes', jdata, hdr, expected_code=201)
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertIsInstance(result, list, "Result should be a list")
        # self.assertTrue(any(recipe.get('title') == 'New Recipe' for recipe in result), "Recipe should be added")

    def test_toggle_favorite_recipe(self):
        data = {'recipe_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        put_rest_call(self, 'http://localhost:4999/recipes', jdata, hdr)
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertIsInstance(result, list, "Result should be a list")
    
    def test_delete_recipe(self):
        data = {'title': 'New Recipe', 'ingredients': 'Ingredients', 'instructions': 'Instructions'}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        post_rest_call(self, 'http://localhost:4999/recipes', jdata, hdr, expected_code=201)
        result = get_rest_call(self, 'http://localhost:4999/recipes')
        self.assertIsInstance(result, list, "Result should be a list")
        # self.assertTrue(any(recipe.get('title') == 'New Recipe' for recipe in result), "Recipe should be added")

    def test_create_user(self):
        data = {
            'username': 'TestUser',
            'email': 'testuser@example.com',
            'password': 'TestPassword123',
            'confirmPassword': 'TestPassword123',
            'mobile': '1234567890',
            'dateOfBirth': '1990-01-01',
            'gender': 'Male'
        }
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/register', jdata, hdr, expected_code=201)
        print(result, "asdsasd")
        self.assertIsNotNone(result, "Result should not be None")
        self.assertEqual(result['message'], 'User created', "User should be created successfully")

    def test_create_user_existing_email(self):
        data = {
            'username': 'TestUser',
            'email': 'sakshi@gmail.com',  # Existing email
            'password': 'TestPassword123',
            'confirmPassword': 'TestPassword123',
            'mobile': '1234567890',
            'dateOfBirth': '1990-01-01',
            'gender': 'Female'
        }
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = post_rest_call(self, 'http://localhost:4999/register', jdata, hdr, expected_code=409)
        self.assertIsNotNone(result, "Result should not be None")
        self.assertEqual(result['message'], 'User already exists', "Should return user already exists error")


