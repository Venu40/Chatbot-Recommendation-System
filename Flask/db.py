from flask import Flask
from flask_pymongo import pymongo
from app import app
CONNECTION_STRING = "mongodb+srv://megadrive037:VenuDevulapally@cluster0.hmnc1se.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('flask')
user_collection = pymongo.collection.Collection(db, 'user_collection')