from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from data import products

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {"request": request, "products": products}
    )

@app.get("/product/{product_id}")
def product_detail(request: Request, product_id: int):
    product = next((p for p in products if p["id"] == product_id), None)
    return templates.TemplateResponse(
        "product.html",
        {"request": request, "product": product}
    )
