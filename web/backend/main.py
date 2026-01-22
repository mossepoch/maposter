"""
FastAPI Backend for Justlogo Map Poster Generator
简化版本：使用内存队列，无需 Redis
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
import uuid
import json
import os
import sys
from datetime import datetime
from concurrent.futures import ProcessPoolExecutor
import asyncio
from pathlib import Path

# 添加项目目录到路径，以便导入 create_map_poster
PROJECT_ROOT = Path(__file__).resolve().parent.parent / "project"
sys.path.append(str(PROJECT_ROOT))

# Import configuration
try:
    from web.backend.config import (
        MAX_DISTANCE, WARNING_THRESHOLD, DISTANCE_RECOMMENDATIONS,
        POSTER_SIZES, DEFAULT_POSTER_SIZE
    )
except ImportError:
    # Fallback defaults if config.py doesn't exist
    MAX_DISTANCE = 35000
    WARNING_THRESHOLD = 25000
    DISTANCE_RECOMMENDATIONS = None
    POSTER_SIZES = {"12x16": (12, 16, "12×16 inch")}
    DEFAULT_POSTER_SIZE = "12x16"

from create_map_poster import (
    create_poster,
    get_coordinates,
    load_theme,
    get_available_themes,
    ensure_run_directories,
    generate_output_filename
)

app = FastAPI(title="Justlogo API", version="1.0.0")

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境改为具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 挂载静态文件（海报输出）
POSTERS_DIR = Path(__file__).parent.parent.parent / "posters"
POSTERS_DIR.mkdir(exist_ok=True)
app.mount("/posters", StaticFiles(directory=str(POSTERS_DIR)), name="posters")

# 临时文件夹（用户生成的海报）
TEMP_POSTERS_DIR = Path(__file__).parent.parent.parent / "temp_posters"
TEMP_POSTERS_DIR.mkdir(exist_ok=True)
app.mount("/temp_posters", StaticFiles(directory=str(TEMP_POSTERS_DIR)), name="temp_posters")

# 管理员密码（从环境变量读取，默认为 "admin123"）
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")

# 内存任务存储
TASKS: Dict[str, Dict[str, Any]] = {}

# 进程池（用于异步执行地图生成）
executor = ProcessPoolExecutor(max_workers=2)


# ==================== Pydantic Models ====================

class GenerateRequest(BaseModel):
    city: str
    country: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    theme: str = "noir"
    distance: int = 12000
    network_type: str = "drive"
    format: str = "png"  # "png" or "svg"
    thumbnail: bool = False
    hide_attribution: bool = False
    poster_size: str = "A3"  # "A4", "A3", "12x16", "A2", "A1", "18x24"


class TaskResponse(BaseModel):
    task_id: str
    status: str  # "pending", "processing", "completed", "failed"
    message: Optional[str] = None


class TaskStatusResponse(BaseModel):
    task_id: str
    status: str
    progress: int  # 0-100
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


class CityGalleryItem(BaseModel):
    city: str
    country: str
    slug: str
    preview_image: str  # 缩略图拼贴
    theme_count: int
    created_at: str


class PosterItem(BaseModel):
    theme: str
    theme_display_name: str
    poster_url: str
    thumbnail_url: Optional[str] = None
    file_size: int
    format: str
    created_at: str


class VerifyPasswordRequest(BaseModel):
    password: str


class PublishToGalleryRequest(BaseModel):
    password: str
    poster_path: str  # 相对于temp_posters的路径，例如 "beijing_20260121_103000/noir_20260121_103000.png"


# ==================== Helper Functions ====================

def generate_map_poster(
    task_id: str,
    city: str,
    country: str,
    latitude: Optional[float],
    longitude: Optional[float],
    theme: str,
    distance: int,
    network_type: str,
    use_svg: bool,
    thumbnail: bool,
    hide_attribution: bool,
    poster_size: str
):
    """
    后台任务：生成地图海报
    """
    try:
        # 更新状态为处理中
        TASKS[task_id]["status"] = "processing"
        TASKS[task_id]["progress"] = 10

        # 1. 获取坐标
        if latitude is not None and longitude is not None:
            coords = (latitude, longitude)
            print(f"Using manual coordinates: {latitude}, {longitude}")
        else:
            TASKS[task_id]["progress"] = 20
            coords = get_coordinates(city, country)

        TASKS[task_id]["progress"] = 30

        # Validate distance to prevent memory issues
        if distance > MAX_DISTANCE:
            recommendations = (
                "4000-6000m for dense cities, "
                "8000-15000m for medium cities, "
                "15000-25000m for large metros"
            )
            error_msg = (
                f"Distance {distance}m exceeds maximum allowed {MAX_DISTANCE}m. "
                f"Please use a smaller distance to avoid memory issues. "
                f"Recommended: {recommendations}"
            )
            raise ValueError(error_msg)

        if distance > WARNING_THRESHOLD:
            print(f"⚠️  Large distance ({distance}m) - applying memory optimizations")

        # 2. 准备输出目录（保存到临时文件夹）
        run_id = datetime.now().strftime("%Y%m%d_%H%M%S")

        # 使用临时文件夹代替正式画廊
        # 同一个城市使用同一个文件夹，不带时间戳
        city_slug = city.lower().replace(' ', '_')
        temp_run_dir = TEMP_POSTERS_DIR / city_slug
        temp_run_dir.mkdir(parents=True, exist_ok=True)

        temp_thumbnails_dir = temp_run_dir / "thumbnails"
        temp_thumbnails_dir.mkdir(exist_ok=True)

        temp_collages_dir = temp_thumbnails_dir / "collages"
        temp_collages_dir.mkdir(exist_ok=True)

        TASKS[task_id]["progress"] = 40

        # 3. 生成海报
        output_file = temp_run_dir / f"{theme}_{run_id}.{'svg' if use_svg else 'png'}"

        TASKS[task_id]["progress"] = 50

        # 获取海报尺寸
        size_tuple = POSTER_SIZES.get(poster_size, POSTER_SIZES[DEFAULT_POSTER_SIZE])[:2]

        # 调用原始的 create_poster 函数
        thumbnail_collector = [] if thumbnail else None
        create_poster(
            city=city,
            country=country,
            point=coords,
            dist=distance,
            output_file=str(output_file),
            network_type=network_type,
            make_thumbnail=thumbnail,
            thumbnails_dir=str(temp_thumbnails_dir) if thumbnail else None,
            thumbnail_collector=thumbnail_collector,
            show_attribution=not hide_attribution,
            use_svg=use_svg,
            theme_name=theme,
            poster_size=size_tuple
        )

        TASKS[task_id]["progress"] = 90

        # 保存元数据到 JSON 文件
        metadata = {
            "poster_size": poster_size,
            "size_label": POSTER_SIZES.get(poster_size, POSTER_SIZES[DEFAULT_POSTER_SIZE])[2],
            "city": city,
            "country": country,
            "theme": theme,
            "distance": distance,
            "network_type": network_type,
            "format": "svg" if use_svg else "png",
            "created_at": run_id
        }
        metadata_file = temp_run_dir / f"{theme}_{run_id}.json"
        with open(metadata_file, 'w') as f:
            import json
            json.dump(metadata, f, indent=2)

        # 4. 构建结果（指向临时文件夹）
        poster_url = f"/temp_posters/{temp_run_dir.name}/{output_file.name}"
        thumb_url = None
        if thumbnail and thumbnail_collector:
            thumb_url = f"/temp_posters/{temp_run_dir.name}/thumbnails/{Path(thumbnail_collector[0]).name}"

        TASKS[task_id]["status"] = "completed"
        TASKS[task_id]["progress"] = 100
        TASKS[task_id]["result"] = {
            "poster_url": poster_url,
            "thumbnail_url": thumb_url,
            "city": city,
            "country": country,
            "theme": theme,
            "coords": coords,
            "created_at": run_id,
            "poster_size": poster_size,
            "size_label": POSTER_SIZES.get(poster_size, POSTER_SIZES[DEFAULT_POSTER_SIZE])[2]
        }

        print(f"✓ Task {task_id} completed successfully")

    except Exception as e:
        TASKS[task_id]["status"] = "failed"
        TASKS[task_id]["error"] = str(e)
        print(f"✗ Task {task_id} failed: {e}")
        import traceback
        traceback.print_exc()


def scan_posters_directory() -> List[Dict[str, Any]]:
    """
    扫描 posters 目录，按城市分组
    """
    cities = []

    if not POSTERS_DIR.exists():
        return cities

    # 遍历 posters 目录下的所有城市文件夹
    for city_dir in POSTERS_DIR.iterdir():
        if not city_dir.is_dir():
            continue

        # 新格式：只有城市名（例如：beijing, new_york, san_francisco）
        city_slug = city_dir.name

        # 统计该城市的主题数量
        poster_files = list(city_dir.glob("*.png")) + list(city_dir.glob("*.svg"))
        theme_count = len(poster_files)

        if theme_count == 0:
            continue

        # 获取最新的海报文件时间作为创建时间
        if poster_files:
            latest_file = max(poster_files, key=lambda p: p.stat().st_mtime)
            timestamp = datetime.fromtimestamp(latest_file.stat().st_mtime).strftime("%Y%m%d_%H%M%S")
        else:
            timestamp = "00000000_000000"

        # 优先使用第一个海报的缩略图作为预览图
        preview_image = None
        if poster_files:
            thumbnails_dir = city_dir / "thumbnails"
            if thumbnails_dir.exists():
                # 查找第一个海报对应的缩略图
                first_poster_stem = poster_files[0].stem
                thumb_file = thumbnails_dir / f"{first_poster_stem}.jpg"
                if thumb_file.exists():
                    preview_image = f"/posters/{city_dir.name}/thumbnails/{thumb_file.name}"

            # 如果没有找到缩略图，使用原图
            if not preview_image:
                preview_image = f"/posters/{city_dir.name}/{poster_files[0].name}"

        cities.append({
            "city": city_slug.replace('_', ' ').title(),
            "country": "Unknown",  # 可以从元数据读取
            "slug": city_slug,
            "preview_image": preview_image,
            "theme_count": theme_count,
            "created_at": timestamp
        })

    # 按创建时间倒序排列
    cities.sort(key=lambda x: x["created_at"], reverse=True)

    return cities


def get_city_posters(city_slug: str) -> List[Dict[str, Any]]:
    """
    获取某个城市的所有海报
    """
    posters = []

    # 新格式：直接使用城市名作为文件夹名
    city_dir = POSTERS_DIR / city_slug
    if not city_dir.exists():
        return posters

    # 遍历所有海报文件
    for poster_file in city_dir.glob("*.*"):
        if poster_file.suffix not in ['.png', '.svg']:
            continue

        # 解析文件名：{theme}_{timestamp}.{ext} 或 {theme}_{part1}_{part2}_{timestamp}.{ext}
        parts = poster_file.stem.rsplit('_', 2)

        # 尝试解析时间戳（假设格式为 YYYYMMDD_HHMMSS）
        if len(parts) >= 3 and parts[-2].isdigit() and parts[-1].isdigit():
            # 格式: theme_20260120_153000
            theme_name = '_'.join(parts[:-2])
            timestamp = f"{parts[-2]}_{parts[-1]}"
        elif len(parts) >= 2 and parts[-1].isdigit():
            # 格式: theme_153000 (只有时间)
            theme_name = '_'.join(parts[:-1])
            timestamp = parts[-1]
        else:
            # 无法解析时间戳，使用文件修改时间
            theme_name = poster_file.stem
            timestamp = datetime.fromtimestamp(poster_file.stat().st_mtime).strftime("%Y%m%d_%H%M%S")

        # 查找对应的缩略图
        thumb_path = city_dir / "thumbnails" / f"{poster_file.stem}.jpg"
        thumb_url = None
        if thumb_path.exists():
            thumb_url = f"/posters/{city_dir.name}/thumbnails/{thumb_path.name}"

        # Try to load metadata if exists
        metadata_path = poster_file.parent / f"{poster_file.stem}.json"
        poster_size = None
        size_label = None
        if metadata_path.exists():
            try:
                import json
                with open(metadata_path, 'r') as f:
                    metadata = json.load(f)
                    poster_size = metadata.get('poster_size')
                    size_label = metadata.get('size_label')
            except:
                pass

        posters.append({
            "theme": theme_name,
            "theme_display_name": theme_name.replace('_', ' ').title(),
            "poster_url": f"/posters/{city_dir.name}/{poster_file.name}",
            "thumbnail_url": thumb_url,
            "file_size": poster_file.stat().st_size,
            "format": poster_file.suffix[1:],  # 去掉点号
            "created_at": timestamp,
            "poster_size": poster_size,
            "size_label": size_label
        })

    return posters


# ==================== API Endpoints ====================

@app.get("/")
async def root():
    return {
        "name": "Justlogo API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/poster-sizes")
async def get_poster_sizes():
    """
    获取可用的海报尺寸选项
    """
    sizes = []
    for key, (width, height, description) in POSTER_SIZES.items():
        sizes.append({
            "value": key,
            "label": description,
            "width": width,
            "height": height
        })
    return {"sizes": sizes, "default": DEFAULT_POSTER_SIZE}


@app.post("/generate", response_model=TaskResponse)
async def generate(request: GenerateRequest, background_tasks: BackgroundTasks):
    """
    创建地图生成任务
    """
    task_id = str(uuid.uuid4())

    # 初始化任务状态
    TASKS[task_id] = {
        "status": "pending",
        "progress": 0,
        "result": None,
        "error": None,
        "created_at": datetime.now().isoformat()
    }

    # 添加后台任务
    background_tasks.add_task(
        generate_map_poster,
        task_id=task_id,
        city=request.city,
        country=request.country,
        latitude=request.latitude,
        longitude=request.longitude,
        theme=request.theme,
        distance=request.distance,
        network_type=request.network_type,
        use_svg=(request.format == "svg"),
        thumbnail=request.thumbnail,
        hide_attribution=request.hide_attribution,
        poster_size=request.poster_size
    )

    return TaskResponse(
        task_id=task_id,
        status="pending",
        message="Task created successfully"
    )


@app.get("/task/{task_id}", response_model=TaskStatusResponse)
async def get_task_status(task_id: str):
    """
    查询任务状态
    """
    if task_id not in TASKS:
        raise HTTPException(status_code=404, detail="Task not found")

    task = TASKS[task_id]

    return TaskStatusResponse(
        task_id=task_id,
        status=task["status"],
        progress=task["progress"],
        result=task.get("result"),
        error=task.get("error")
    )


@app.get("/themes")
async def get_themes():
    """
    获取所有可用主题
    """
    themes = get_available_themes()

    theme_list = []
    for theme_name in themes:
        try:
            theme_data = load_theme(theme_name)
            theme_list.append({
                "name": theme_name,
                "display_name": theme_data.get("name", theme_name.replace('_', ' ').title()),
                "description": theme_data.get("description", ""),
                "colors": {
                    "bg": theme_data.get("bg"),
                    "text": theme_data.get("text"),
                    "accent": theme_data.get("road_motorway")
                }
            })
        except:
            theme_list.append({
                "name": theme_name,
                "display_name": theme_name.replace('_', ' ').title(),
                "description": "",
                "colors": {}
            })

    return {"themes": theme_list}


@app.get("/gallery")
async def get_gallery(page: int = 1, limit: int = 20):
    """
    获取画廊（按城市分组）
    """
    cities = scan_posters_directory()

    # 分页
    start = (page - 1) * limit
    end = start + limit

    return {
        "cities": cities[start:end],
        "total": len(cities),
        "page": page,
        "limit": limit
    }


@app.get("/city/{city_slug}")
async def get_city_detail(city_slug: str):
    """
    获取某个城市的所有海报
    """
    posters = get_city_posters(city_slug)

    if not posters:
        raise HTTPException(status_code=404, detail="City not found")

    return {
        "city": city_slug.replace('_', ' ').title(),
        "slug": city_slug,
        "posters": posters
    }


@app.post("/verify-password")
async def verify_password(request: VerifyPasswordRequest):
    """
    验证管理员密码
    """
    if request.password == ADMIN_PASSWORD:
        return {"valid": True, "message": "Password verified"}
    else:
        return {"valid": False, "message": "Invalid password"}


@app.post("/publish-to-gallery")
async def publish_to_gallery(request: PublishToGalleryRequest):
    """
    将临时海报发布到正式画廊
    需要管理员密码验证
    """
    import shutil

    # 验证密码
    if request.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password. Please check your password.")

    # 解析路径
    poster_path = Path(request.poster_path)
    temp_city_dir = TEMP_POSTERS_DIR / poster_path.parts[0]

    if not temp_city_dir.exists():
        raise HTTPException(status_code=404, detail="Poster directory not found")

    # 目标路径：同一个城市使用同一个文件夹（不带时间戳）
    gallery_city_dir = POSTERS_DIR / temp_city_dir.name

    # 复制文件到画廊（如果目录不存在则创建，如果存在则合并）
    try:
        gallery_city_dir.mkdir(parents=True, exist_ok=True)

        # 复制临时文件夹中的所有文件到画廊
        for item in temp_city_dir.iterdir():
            dest_item = gallery_city_dir / item.name
            if item.is_dir():
                # 目录：递归复制（合并）
                shutil.copytree(item, dest_item, dirs_exist_ok=True)
            else:
                # 文件：直接复制（如果存在则覆盖）
                shutil.copy2(item, dest_item)

        return {
            "success": True,
            "message": "Poster published to gallery successfully",
            "gallery_path": f"/posters/{gallery_city_dir.name}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to publish poster: {str(e)}")


@app.get("/health")
async def health_check():
    """
    健康检查
    """
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
