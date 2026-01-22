# Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# 安装系统依赖（OSMnx 需要）
RUN apt-get update && apt-get install -y \
    build-essential \
    libgeos-dev \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件（构建上下文为仓库根目录）
COPY requirements.txt /app/main_requirements.txt
COPY web/backend/requirements.txt /app/backend_requirements.txt

# 升级 pip 和 setuptools
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# 分批安装依赖以减少内存峰值
# 第一批：基础科学计算库（预编译 wheel）
RUN pip install --no-cache-dir --only-binary=:all: \
    numpy==2.4.0 \
    pandas==2.3.3 \
    && pip cache purge

# 第二批：可视化和几何库
RUN pip install --no-cache-dir --only-binary=:all: \
    matplotlib==3.10.8 \
    pillow==12.1.0 \
    shapely==2.1.2 \
    && pip cache purge

# 第三批：地理空间库（内存消耗大）
RUN pip install --no-cache-dir \
    geopandas==1.1.2 \
    pyproj==3.7.2 \
    && pip cache purge

# 第四批：OSMnx 和其他依赖
RUN pip install --no-cache-dir \
    osmnx==2.0.7 \
    geopy==2.4.1 \
    && pip cache purge

# 第五批：剩余依赖
RUN pip install --no-cache-dir -r /app/main_requirements.txt && \
    pip cache purge

# 安装后端依赖（轻量级）
RUN pip install --no-cache-dir -r /app/backend_requirements.txt && \
    pip cache purge

# 复制项目文件
COPY . /app/project

# 设置工作目录到项目根目录
WORKDIR /app/project

# 暴露端口
EXPOSE 8100

# 启动命令
CMD ["uvicorn", "web.backend.main:app", "--host", "0.0.0.0", "--port", "8100"]
