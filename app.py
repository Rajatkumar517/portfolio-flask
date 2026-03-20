from flask import Flask, render_template, request
import sqlite3
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "publicdata.db")

conn= sqlite3.connect(db_path)
cur = conn.cursor()

cur.execute("select count(*) from sqlite_master where type='table' and name='users' ")

if cur.fetchone()[0]==1:
    print("Table Already Exists")
else:
    conn.execute("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)")
    print("Create Table")
conn.close()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/todoApp")
def todo():
    return render_template("todo.html")

@app.route("/TicTacToe")
def tictac():
    return render_template("tic.html")

@app.route("/resizeImage")
def resize_Image():
    return render_template("resize.html")
    
@app.route("/contact", methods=['POST'])
def contact():
        
        try:
            name = request.form.get("name").strip()
            email = request.form.get("email").strip()
            message = request.form.get("message").strip()

            if not name or not email or not message:
                return render_template("success.html", msg="Invalid Data")

            if len(message) > 500:
                return render_template("success.html", msg="Message to Long")

            with sqlite3.connect(db_path) as conn:
                cur = conn.cursor()

                cur.execute("INSERT INTO users (name, email, message) VALUES (?, ?, ?)", (name, email, message)) 
                conn.commit()
                msg = "Your Message Successfully Send"
        except Exception as e:
            print(e)
            msg = "Couldn't Send Data"
            
        return render_template("success.html", msg=msg)
    
@app.route("/users_message")
def admin():
    key = request.args.get("key")

    if key!="chitta@0101":
        return "Access Denied"

    with sqlite3.connect(db_path) as conn:
        cur=conn.cursor()

        cur.execute("SELECT name, email, message, created_at FROM users ORDER BY created_at DESC")
        data = cur.fetchall()

    return render_template("admin.html", data=data)
    
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
