from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import TOKEN, CHAT_ID
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
    message = (
            f"Данные пользователя\n"
            f"Фамилия: {data.last_name}\n"
            f"Имя: {data.first_name}\n"
            f"Отчество: {data.patronimic}\n"
            f"Дата рождения: {data.date_of_brith}\n"
            f"Email: {data.email}\n"
            f"Номер телефона: {data.phone_number}"
                )
    async with aiohttp.ClientSession() as sess: 
        resp = await sess.post(f"https://api.telegram.org/bot{TOKEN}/sendMessage", data={"chat_id": CHAT_ID, "text": message, "parse_mode": "Markdown"})
    return {"it's okay?": True, "data": data}