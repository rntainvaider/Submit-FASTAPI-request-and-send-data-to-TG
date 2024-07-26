from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
def root():
    return FileResponse("index.html")

@app.post("/userdata")
async def user_data(last_name: str):
    return {"last_name": last_name}