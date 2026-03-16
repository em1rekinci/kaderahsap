from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.exceptions import HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from typing import Optional
from data import products, CATEGORIES

app = FastAPI()

# www yönlendirme middleware
class WWWRedirectMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        host = request.headers.get("host", "")
        if host and not host.startswith("www.") and "localhost" not in host and "railway" not in host:
            url = str(request.url).replace(f"://{host}", f"://www.{host}", 1)
            return RedirectResponse(url=url, status_code=301)
        return await call_next(request)

app.add_middleware(WWWRedirectMiddleware)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# Arama için ürün listesi (kategori adını da ekleyerek)
def get_search_products():
    result = []
    for p in products:
        result.append({
            "id": p["id"],
            "name": p["name"],
            "images": p["images"],
            "category": p.get("category", ""),
            "cat_name": CATEGORIES.get(p.get("category", ""), {}).get("name", "")
        })
    return result


@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "products": products,
            "search_products": get_search_products()
        }
    )


@app.get("/urunler")
def urunler(request: Request, q: Optional[str] = None):
    filtered = products
    if q:
        q_lower = q.lower()
        filtered = [p for p in products if q_lower in p["name"].lower()]
    return templates.TemplateResponse(
        "urunler.html",
        {
            "request": request,
            "products": filtered,
            "categories": CATEGORIES,
            "search_query": q or "",
            "search_products": get_search_products()
        }
    )


@app.get("/product/{product_id}")
def product_detail(request: Request, product_id: int):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        return templates.TemplateResponse("404.html", {"request": request}, status_code=404)
    return templates.TemplateResponse(
        "product.html",
        {
            "request": request,
            "product": product,
            "products": products,
            "search_products": get_search_products()
        }
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
            "other_categories": other_categories,
            "search_products": get_search_products()
        }
    )


@app.get("/projeler")
def projects(request: Request):
    return templates.TemplateResponse(
        "projeler.html",
        {
            "request": request,
            "search_products": get_search_products()
        }
    )


@app.get("/iletisim")
def iletisim(request: Request):
    return templates.TemplateResponse(
        "iletisim.html",
        {
            "request": request,
            "search_products": get_search_products()
        }
    )


@app.exception_handler(404)
async def not_found_handler(request: Request, exc: HTTPException):
    return templates.TemplateResponse("404.html", {"request": request}, status_code=404)
