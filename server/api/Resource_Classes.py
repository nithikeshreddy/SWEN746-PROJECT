from flask_restful import Resource, reqparse, request
from db import DB_Calls
from db.swen610_db_utils import exec_get_one
class AddUser(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        name = data['username']
        phone_number = data['mobile']
        dob = str(data['dateOfBirth'])
        gender = data['gender']
        # Add a user along with their food preferences (if needed)
        return DB_Calls.create_user({"email":email, "password":password,"username":name, "phone_number":phone_number,"dob":dob,"gender":gender})

class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        # Perform login
        return DB_Calls.login(email, password)

class UpdateUser(Resource):
    def put(self):
        data = request.get_json()
        email = data['email']
        name = data['name']
        phone_number = data['phone_number']
        gender = data['gender']
        allergies = data.get('allergies', '')
        present_craving = data.get('present_craving', '')

        # Update the user details
        DB_Calls.update_user(email, name, phone_number, gender, allergies, present_craving)
        return {'message': 'User details updated successfully','result':{"email":email, "name":name, "phone_number":phone_number,"gender":gender, "allergies":allergies, "present_craving":present_craving}}, 200


class Init(Resource):
    def post(self):
        """
        Initializes the database by rebuilding the tables.
        This function is called when a POST request is made to /manage/init.
        """
        try:
            # Call the rebuild_tables function to recreate tables
            DB_Calls.rebuild_tables()
            return {"message": "Database initialized successfully."}, 200
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500

class Version(Resource):
    def get(self):
        """
        Endpoint to get the current version of the database.
        This function is called when a GET request is made to /manage/version.
        """
        try:
            version = exec_get_one('SELECT VERSION()')  # Assuming this function returns the version
            return {"version": version}, 200
        except Exception as e:
            return {"message": f"An error occurred: {str(e)}"}, 500

class Workshop(Resource):
    def get(self):
        # Retrieve all workshops
        return DB_Calls.get_all_workshops()

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('workshop_id', type=int, required=True, help='Workshop ID is required')
        args = parser.parse_args()
        workshop_id = args['workshop_id']
        DB_Calls.register_workshop(workshop_id)
        return {'message': 'Workshop registered successfully'}, 200

    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('workshop_id', type=int, required=True, help='Workshop ID is required')
        args = parser.parse_args()
        workshop_id = args['workshop_id']
        DB_Calls.unregister_workshop(workshop_id)
        return {'message': 'Workshop unregistered successfully'}, 200

class RecipeSharing(Resource):
    def get(self):
        # Retrieve all recipes
        return DB_Calls.get_all_recipes()

    def post(self):
        data = request.get_json()
        title = data['title']
        ingredients = data['ingredients']
        instructions = data['instructions']
        # Add a new recipe
        DB_Calls.add_recipe(title, ingredients, instructions)
        return {'message': 'Recipe added successfully'}, 201

    def put(self):
        data = request.get_json()
        recipe_id = data['recipe_id']
        # Toggle favorite status of a recipe
        DB_Calls.toggle_favorite_recipe(recipe_id)
        return {'message': 'Recipe favorite status updated successfully'}, 200

class Cravings(Resource):
    def get(self):
        # Retrieve all cravings
        return DB_Calls.get_all_cravings()

    def post(self):
        data = request.get_json()
        user_id = data['user_id']
        food_item_id = data['food_item_id']
        craving_description = data['craving_description']
        # Add a new craving
        DB_Calls.add_craving(user_id, food_item_id, craving_description)
        return {'message': 'Craving added successfully'}, 201

    def delete(self):
        data = request.get_json()
        craving_id = data['craving_id']
        # Delete a craving
        DB_Calls.delete_craving(craving_id)
        return {'message': 'Craving deleted successfully'}, 200
