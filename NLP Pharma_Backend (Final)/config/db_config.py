import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",              # your database host
        user="root",         # your MySQL username
        password="",
        database="pharma_bot"         # your database name
    )
