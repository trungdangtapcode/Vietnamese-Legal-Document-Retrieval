import fastapi
import uvicorn
from fastapi.templating import Jinja2Templates
from fastapi.responses import Response
from fastapi import Request
from utils import api_search
from fastapi.staticfiles import StaticFiles
from enum import Enum

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
    text_boxes = api_search.textcid_search(text, k)
    if text_boxes is None:
        return Response(content="Error", status_code=500)
    for idx in range(len(text_boxes)):
        text_boxes[idx][0] = text_boxes[idx][0].replace("\n", "<br>")
    return templates.TemplateResponse("text_boxes.html", 
        {"request": request,
        "text_boxes": text_boxes
        })

@app.get("/viewmore")
async def search(request: Request, cid: int):
    return templates.TemplateResponse("viewmore.html", 
        {"request": request,
        "cid": cid
        })


class allow_cid_value(int, Enum):
    previous = -1
    current = 0
    next = 1
@app.get("/cid")
async def cid(request: Request, cid: int, x: allow_cid_value):
    textbox = api_search.get_textcid(cid, x)
    textbox[0] = textbox[0].replace("\n", "<br>")
    if (textbox is None):
        return Response(content="Error", status_code=500)
    return templates.TemplateResponse("text_boxes.html", 
        {"request": request,
        "text_boxes": [textbox]
        })

@app.get("/update")
async def update(url_api_server: str|None = None):
    if url_api_server:
        global URL_API_SEARCH
        URL_API_SEARCH = url_api_server
        api_search.URL_SERVER = URL_API_SEARCH
    return {"message": "Update!"}
