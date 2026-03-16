from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from data import products, CATEGORIES

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
        {"request": request, "product": product, "products": products}
    )

@app.get("/kategori/{slug}")
def category_page(request: Request, slug: str):
    if slug not in CATEGORIES:
        return templates.TemplateResponse("404.html", {"request": request}, status_code=404)
    
    category = {**CATEGORIES[slug], "slug": slug}
    category_products = [p for p in products if p.get("category") == slug]
    other_categories = [
        {**v, "slug": k}
        for k, v in CATEGORIES.items()
        if k != slug
    ][:4]

    return templates.TemplateResponse(
        "category.html",
        {
            "request": request,
            "category": category,
            "products": category_products,
            "other_categories": other_categories
        }
    )

@app.get("/projeler")
def projects(request: Request):
    return templates.TemplateResponse(
        "projeler.html",
        {"request": request}
    )

@app.get("/iletisim")
def iletisim(request: Request):
    return templates.TemplateResponse(
        "iletisim.html",
        {"request": request}
    )
