import os
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()
StaticDir: str = "Static"
# 获取 static 文件夹下的所有子文件夹
dirs = [fir.name for fir in os.scandir(StaticDir) if fir.is_dir()]
files = [fir.name for fir in os.scandir(StaticDir) if fir.is_dir()]
# 桶桶挂载
for dirName in dirs:
    app.mount(f"/{dirName}", StaticFiles(directory=f"./{StaticDir}/{dirName}"), name=dirName)


@app.get("/")
async def root():
    with open("./Static/index.html", "r", encoding="utf-8") as f:
        html = f.read()
        return HTMLResponse(content=html, status_code=200)


# app.mount("/", StaticFiles(directory=StaticDir), name=StaticDir)


@app.get("/404.html")
async def root():
    with open("./Static/404.html", "r", encoding="utf-8") as f:
        html = f.read()
        return HTMLResponse(content=html, status_code=200)


@app.get("/bg.svg", response_class=FileResponse)
def _():
    return "Static/bg.svg"


@app.get("/SoraIcon.jpg", response_class=FileResponse)
def _():
    return "Static/SoraIcon.jpg"


@app.get("/404.html")
async def _():
    with open("./Static/404.html", "r", encoding="utf-8") as f:
        html = f.read()
        return HTMLResponse(content=html, status_code=200)


@app.get("/hello/Luoyily")
async def say_hello():
    return {"message": f"Luoyily is all you need."}


uvicorn.run(app, host="0.0.0.0", port=12300)
