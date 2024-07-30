from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import TOKEN
import aiohttp

class Data(BaseModel):
    last_name: str
    first_name: str
    patronimic: str
    date_of_brith: str
    email: str
    phone_number: str

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return FileResponse("index.html")

@app.post("/userdata/")
async def user_data(data: Data):
    async with aiohttp.ClientSession() as sess: 
        await sess.post(f"https://api.telegram.org/bot{TOKEN}/sendMessage", data={"chat_id": 1149708469, "text": data, "parse_mode": "Markdown"})
    return {"it's okay?": True, "data": data}