from fastapi import FastAPI, HTTPException
from database import get_connection
import psycopg2.extras

app = FastAPI()

# 
@app.get("/")
def home():
    return {"message": "Backend running "}

# 
@app.get("/cases")
def get_cases():
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("SELECT * FROM cases ORDER BY case_id;")
            rows = cur.fetchall()
        return {"data": [dict(r) for r in rows]}
    finally:
        conn.close()

# 
@app.get("/cases/{case_id}")
def get_case(case_id: str):
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute("SELECT * FROM cases WHERE case_id = %s;", (case_id,))
            row = cur.fetchone()
        if row is None:
            raise HTTPException(status_code=404, detail="Case not found")
        return dict(row)
    finally:
        conn.close()

# 
@app.get("/cases/category/{category}")
def get_by_category(category: str):
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM cases WHERE LOWER(category) = LOWER(%s) ORDER BY case_id;",
                (category,)
            )
            rows = cur.fetchall()
        return {"data": [dict(r) for r in rows]}
    finally:
        conn.close()

# 
@app.get("/unsafe-areas")
def unsafe_areas():
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                "SELECT * FROM cases WHERE category IN ('Snatching', 'Burglary', 'Vehicle Theft') ORDER BY case_id;"
            )
            rows = cur.fetchall()
        return {"unsafe_locations": [dict(r) for r in rows]}
    finally:
        conn.close()