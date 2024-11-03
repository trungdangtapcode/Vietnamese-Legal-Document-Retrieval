import fastapi
import uvicorn
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi import Request
from utils import api_search
from fastapi.staticfiles import StaticFiles

app = fastapi.FastAPI()
URL_API_SEARCH = 'https://0bee-35-227-86-192.ngrok-free.app/'

api_search.URL_SERVER = URL_API_SEARCH

app.mount("/stuf",StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def index():
    return {"message": "Hello, World!"}

@app.get("/home")
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/search")
async def search(request: Request, text: str, k: int):
    texts = api_search.text_seach(text, k)
    cids = api_search.cid_seach(text, k)
    if (texts is None) or (cids is None):
        return Response(content="Error", status_code=500)
    text_boxes = [(text, cid) for text, cid in zip(texts, cids)]
    return templates.TemplateResponse("text_boxes.html", 
        {"request": request,
        "text_boxes": text_boxes
        })

@app.get("/update")
async def update(url_api_server: str|None = None):
    if url_api_server:
        global URL_API_SEARCH
        URL_API_SEARCH = url_api_server
        api_search.URL_SERVER = URL_API_SEARCH
    return {"message": "Update!"}
