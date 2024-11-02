import fastapi
import uvicorn
from fastapi.templating import Jinja2Templates

app = fastapi.FastAPI()

@app.get("/")
def index():
    return {"message": "Hello, World!"}

templates = Jinja2Templates(directory="templates")

