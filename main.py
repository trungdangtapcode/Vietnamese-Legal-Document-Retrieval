import fastapi
import uvicorn
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi import Request
from utils import api_search

app = fastapi.FastAPI()
URL_API_SEARCH = 'https://825b-35-227-86-192.ngrok-free.app/'
api_search.URL_SERVER = URL_API_SEARCH

templates = Jinja2Templates(directory="templates")

@app.get("/")
async def index():
    return {"message": "Hello, World!"}

@app.get("/home")
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/test")
async def test():
    return api_search.text_seach("cơn bão",10)

@app.get("/update")
async def update(url_api_server: str|None = None):
    if url_api_server:
        global URL_API_SEARCH
        URL_API_SEARCH = url_api_server
    return {"message": "Update!"}
