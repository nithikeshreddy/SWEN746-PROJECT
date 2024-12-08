from flask import Flask
import coverage
from flask_restful import Api
from flask_cors import CORS
from api.Resource_Classes import *
from api.management import rebuild_tables  # Assuming rebuild_tables is defined here

def main(coverage_tracer_obj: coverage.Coverage = None):
    app = Flask(__name__)  # Create Flask instance
    CORS(app)  # Enable CORS for cross-origin requests
    api = Api(app)  # Set up the API router

    # Coverage tracking logic (optional, for testing)
    if coverage_tracer_obj is not None:
        @app.route("/stop")
        def stop():
            coverage_tracer_obj.get_data().write()
            return ""

    # Register API Resources for your routes
    api.add_resource(Init, '/manage/init')  # Management API to initialize DB
    api.add_resource(Version, '/manage/version')  # Check DB version
    api.add_resource(AddUser, '/register')  # Register new user
    api.add_resource(LoginUser, '/login/')  # Login user (authentication)'
    api.add_resource(UpdateUser, '/update/')  # Update user details
    api.add_resource(Workshop, '/workshops/')  # Add this line to register the Workshop resource
    api.add_resource(RecipeSharing, '/recipes/')  # Add this line to register the RecipeSharing resource

    # New endpoints based on your app's core features
    #api.add_resource(RentSpace, '/Rent_Space')  # Renting a cooking space
    #api.add_resource(Chat, '/Chat/<string:room_id>')  # Chat feature between users in a cooking space

    # Start the Flask app
    app.run(debug=True, port=4999)

if __name__ == '__main__':
    print("Loading DB and initializing tables...")
    rebuild_tables()  # Rebuild the DB tables on app startup
    print("Starting Flask server...")
    main()  # Start the Flask app
