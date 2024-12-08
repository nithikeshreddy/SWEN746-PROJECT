-- Drop existing tables if they exist\DROP TABLE IF EXISTS food_items, categories, users, cravings;
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS categories CASCADE;

DROP TABLE IF EXISTS workshops CASCADE;

DROP TABLE IF EXISTS recipes CASCADE;

DROP TABLE IF EXISTS food_items CASCADE;

-- Create a table to store user information
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    allergies TEXT,
    present_craving TEXT
);

-- Insert sample data into the users table
INSERT INTO users (name, email, phone_number, password,  gender, allergies, present_craving) VALUES
('Sakshi', 'sakshi@gmail.com', '1234567890', 'password123', 'Female', 'Nuts', 'Pizza'),
('John Doe', 'john.doe@gmail.com', '9876543210', 'securepassword', 'Male', 'None', 'Burgers'),
('Sandeep', 'sandeepnaik9900@gmail.com','8885450415', 'sandeep', 'Male','None', 'Biryani');

-- Create a table to store food categories
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

-- Insert sample data into the categories table
INSERT INTO categories (category_name) VALUES
('Proteins'),
('Fruits'),
('Vegetables'),
('Dairy'),
('Grains'),
('Beverages');

-- Create a table to store food items
CREATE TABLE food_items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL UNIQUE,
    category_id INT REFERENCES categories(category_id) ON DELETE CASCADE,
    calories INT NOT NULL,
    total_fat INT NOT NULL,
    saturated_fat INT NOT NULL,
    trans_fat INT NOT NULL,
    protein INT NOT NULL,
    carbohydrate INT NOT NULL
);

-- Insert sample data into the food_items table
INSERT INTO food_items (item_name, category_id, calories, total_fat, saturated_fat, trans_fat, protein, carbohydrate) VALUES
('Steak', 1, 300, 15, 5, 0, 30, 0),
('Orange', 2, 300, 1, 0, 0, 2, 70),
('Spinach', 3, 50, 0, 0, 0, 5, 8),
('Milk', 4, 300, 8, 5, 0, 8, 12),
('Bread', 5, 200, 2, 0, 0, 6, 40);

-- Create a table to store cravings

-- Insert sample data into the cravings table

-- Create a table to store workshop details
CREATE TABLE workshops (
    workshop_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    time VARCHAR(255) NOT NULL,
    tools TEXT NOT NULL,
    registered BOOLEAN DEFAULT FALSE
);

-- Insert sample data into the workshops table
INSERT INTO workshops (title, description, location, time, tools) VALUES
('Sushi Making Workshop', 'Learn the art of sushi making from a professional chef.', 'Room A, Culinary Building', '10:00 AM - 12:00 PM, Dec 10th', 'Sushi mat, Knife, Ingredients (provided)'),
('Italian Pasta Cooking', 'Master the techniques of authentic Italian pasta making.', 'Room B, Culinary Building', '2:00 PM - 4:00 PM, Dec 12th', 'Rolling pin, Pasta cutter, Ingredients (provided)');

-- Create a table to store recipes
CREATE TABLE recipes (
    recipe_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    favorite BOOLEAN DEFAULT FALSE
);

-- Insert sample data into the recipes table
INSERT INTO recipes (title, ingredients, instructions) VALUES
('Spaghetti Carbonara', 'Spaghetti, Eggs, Parmesan Cheese, Pancetta, Black Pepper', 'Boil spaghetti. Cook pancetta. Mix eggs and cheese. Combine all with spaghetti.'),
('Chicken Curry', 'Chicken, Curry Powder, Coconut Milk, Onion, Garlic, Ginger', 'Cook onion, garlic, and ginger. Add chicken and curry powder. Add coconut milk and simmer.');
