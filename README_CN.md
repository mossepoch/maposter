# Maposter - 城市地图海报生成器

为世界上任何城市生成精美的极简风格地图海报。

中文文档 | [English](README.md)

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="posters/new_york/new_york_noir_20260108_172453.png" width="200"><br>
        <b>纽约 - 黑白极简</b>
      </td>
      <td align="center">
        <img src="posters/mumbai/mumbai_contrast_zones_20260108_172010.png" width="200"><br>
        <b>孟买 - 高对比度</b>
      </td>
      <td align="center">
        <img src="posters/tokyo/tokyo_japanese_ink_20260108_165830.png" width="200"><br>
        <b>东京 - 日式水墨</b>
      </td>
      <td align="center">
        <img src="posters/beijing/beijing_warm_beige_20260120_153147.png" width="200"><br>
        <b>北京 - 复古米色</b>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 部署方式

### 方式一：Web 应用（推荐）

适合需要图形界面的用户，支持在线生成海报。

#### 系统要求

- **Docker**: 已安装 Docker 和 Docker Compose
- **内存**: 至少 4GB 可用（推荐 8GB+）
- **磁盘**: 至少 20GB 可用空间
- **操作系统**: 任何支持 Docker 的系统（Linux、macOS、Windows）

#### 快速部署

```bash
# 1. 克隆项目
git clone https://github.com/your-username/maposter.git
cd maposter

# 2. 一键部署
chmod +x deploy.sh
./deploy.sh
```

部署脚本会自动：
- ✅ 检查 Docker 环境和系统资源
- ✅ 创建配置文件 `web/.env`
- ✅ 构建 Docker 镜像（后端 + 前端，约 10-15 分钟）
- ✅ 启动所有服务（Nginx + Frontend + Backend）
- ✅ 执行健康检查

#### 访问应用

部署成功后，浏览器访问：

```
http://你的服务器IP
```

或者如果是本地部署：

```
http://localhost
```

#### 配置管理密码

编辑 `web/.env` 文件：

```bash
ADMIN_PASSWORD=your_secure_password_here
```

然后重启服务：

```bash
cd web
docker-compose restart
```

#### 常用管理命令

```bash
cd web

# 查看服务状态
docker-compose ps

# 查看实时日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx

# 重启所有服务
docker-compose restart

# 重启特定服务
docker-compose restart backend

# 停止所有服务
docker-compose down

# 更新代码后重新部署
git pull
docker-compose build
docker-compose up -d
```

---

### 方式二：命令行工具

适合开发者和需要批量生成的场景。

#### 安装依赖

**方法 1: 使用 pip（简单）**

```bash
pip install -r requirements.txt
```

**方法 2: 使用 Conda（推荐，避免依赖冲突）**

```bash
# 创建虚拟环境
conda create -n maposter python=3.11

# 激活环境
conda activate maposter

# 安装依赖
conda install numpy=1.26 geopandas osmnx pandas numexpr bottleneck
pip install -r requirements.txt
```

#### 基本用法

```bash
python create_map_poster.py --city <城市名> --country <国家名> [选项]
```

---

## 📖 命令行参数详解

### 必需参数

| 参数 | 简写 | 说明 | 示例 |
|------|------|------|------|
| `--city` | `-c` | 城市名称 | `-c "Tokyo"` |
| `--country` | `-C` | 国家名称 | `-C "Japan"` |

### 可选参数

| 参数 | 简写 | 说明 | 默认值 | 可选值/示例 |
|------|------|------|--------|------------|
| `--theme` | `-t` | 主题名称或 `all` | `feature_based` | 见下方主题列表 |
| `--distance` | `-d` | 地图半径（米） | `29000` | `4000-30000` |
| `--network-type` |  | 道路网络类型 | `drive` | `drive`, `all`, `walk`, `bike` |
| `--thumbnail` |  | 生成缩略图 | 不生成 | 添加此参数生成 |
| `--list-themes` |  | 列出所有主题 | - | 无需其他参数 |

### 参数说明

#### 1. `--city` / `-c` (必需)

城市名称，使用英文或当地官方拼写。

```bash
# 正确示例
-c "New York"
-c "Tokyo"
-c "São Paulo"

# 多词城市名需要加引号
-c "San Francisco"  # ✓ 正确
-c San Francisco    # ✗ 错误
```

#### 2. `--country` / `-C` (必需)

国家名称，使用英文。

```bash
-C "USA"
-C "Japan"
-C "United Kingdom"
```

#### 3. `--theme` / `-t` (可选)

主题名称，控制配色方案。默认为 `feature_based`。

**单个主题：**
```bash
-t noir              # 黑白极简风格
-t neon_cyberpunk    # 霓虹赛博朋克
-t japanese_ink      # 日式水墨风格
```

**生成所有主题：**
```bash
-t all               # 自动生成 17 个主题的海报
```

**可用主题列表：** (详见下方主题章节)

#### 4. `--distance` / `-d` (可选)

地图半径，单位：米。控制地图覆盖范围。

**推荐距离：**

| 距离范围 | 适用场景 | 示例 |
|---------|---------|------|
| 4000-6000m | 小型城市、密集老城区 | 威尼斯、阿姆斯特丹中心 |
| 8000-12000m | 中型城市、聚焦市中心 | 巴黎、巴塞罗那、旧金山 |
| 15000-20000m | 大型都市、完整城市视图 | 东京、孟买、纽约 |
| 25000-30000m | 超大城市、含郊区 | 洛杉矶、北京、上海 |

```bash
# 小城市
-d 5000

# 中型城市
-d 10000

# 大都市
-d 20000
```

#### 5. `--network-type` (可选)

道路网络类型，决定显示哪些道路。

| 值 | 包含道路 | 适用场景 |
|----|---------|---------|
| `drive` | 车行道路（高速、主干道等） | 默认选项，适合大多数城市 |
| `all` | 所有道路（含步行道、小路） | 显示更多细节，适合密集城区 |
| `walk` | 步行道路 | 展示步行友好型城市 |
| `bike` | 自行车道 | 展示自行车路网 |

```bash
# 只显示车行道（默认）
--network-type drive

# 显示所有道路（包括小巷）
--network-type all

# 只显示步行道
--network-type walk

# 只显示自行车道
--network-type bike
```

#### 6. `--thumbnail` (可选)

生成缩略图（约 1080px），用于预览或网页展示。

```bash
# 同时生成高清海报和缩略图
--thumbnail

# 不生成缩略图（默认）
# 不添加此参数即可
```

#### 7. `--list-themes` (可选)

列出所有可用主题，无需指定城市和国家。

```bash
python create_map_poster.py --list-themes
```

---

## 📝 使用示例

### 基础示例

```bash
# 1. 最简单的用法（使用默认主题和距离）
python create_map_poster.py -c "Paris" -C "France"

# 2. 指定主题
python create_map_poster.py -c "Tokyo" -C "Japan" -t japanese_ink

# 3. 指定距离
python create_map_poster.py -c "Venice" -C "Italy" -d 5000

# 4. 组合使用
python create_map_poster.py -c "New York" -C "USA" -t noir -d 12000
```

### 按城市类型

**网格型城市（规整街道）**

```bash
# 纽约曼哈顿 - 经典网格
python create_map_poster.py -c "New York" -C "USA" -t noir -d 12000

# 巴塞罗那 - 方形街区
python create_map_poster.py -c "Barcelona" -C "Spain" -t warm_beige -d 8000

# 芝加哥 - 整齐网格
python create_map_poster.py -c "Chicago" -C "USA" -t contrast_zones -d 15000
```

**水域城市（运河、海岸）**

```bash
# 威尼斯 - 运河网络
python create_map_poster.py -c "Venice" -C "Italy" -t blueprint -d 4000

# 阿姆斯特丹 - 同心圆运河
python create_map_poster.py -c "Amsterdam" -C "Netherlands" -t ocean -d 6000

# 迪拜 - 棕榈岛和海岸线
python create_map_poster.py -c "Dubai" -C "UAE" -t midnight_blue -d 15000

# 旧金山 - 半岛海岸
python create_map_poster.py -c "San Francisco" -C "USA" -t sunset -d 10000
```

**放射型城市（环路结构）**

```bash
# 巴黎 - 奥斯曼大道
python create_map_poster.py -c "Paris" -C "France" -t pastel_dream -d 10000

# 莫斯科 - 环路系统
python create_map_poster.py -c "Moscow" -C "Russia" -t noir -d 12000
```

**有机型城市（不规则街道）**

```bash
# 东京 - 密集有机街道
python create_map_poster.py -c "Tokyo" -C "Japan" -t japanese_ink -d 15000

# 马拉喀什 - 老城迷宫
python create_map_poster.py -c "Marrakech" -C "Morocco" -t terracotta -d 5000

# 罗马 - 古老街道
python create_map_poster.py -c "Rome" -C "Italy" -t warm_beige -d 8000
```

**河流城市**

```bash
# 伦敦 - 泰晤士河
python create_map_poster.py -c "London" -C "UK" -t noir -d 15000

# 布达佩斯 - 多瑙河
python create_map_poster.py -c "Budapest" -C "Hungary" -t copper_patina -d 8000
```

### 高级用法

```bash
# 1. 生成所有主题（17 张海报）
python create_map_poster.py -c "Paris" -C "France" -t all -d 10000

# 2. 包含所有道路（步行道、小巷）
python create_map_poster.py -c "Suzhou" -C "China" -t sunset -d 10000 --network-type all

# 3. 生成海报 + 缩略图
python create_map_poster.py -c "Singapore" -C "Singapore" -t neon_cyberpunk -d 8000 --thumbnail

# 4. 完整参数示例
python create_map_poster.py \
  --city "Barcelona" \
  --country "Spain" \
  --theme warm_beige \
  --distance 8000 \
  --network-type drive \
  --thumbnail
```

### 批量生成

```bash
# 为同一个城市生成多个主题
cities=("noir" "midnight_blue" "sunset" "ocean")
for theme in "${cities[@]}"; do
  python create_map_poster.py -c "Tokyo" -C "Japan" -t $theme -d 15000
done

# 或直接使用 all
python create_map_poster.py -c "Tokyo" -C "Japan" -t all -d 15000
```

---

## 🎨 主题列表

17 个内置主题，每个都有独特的风格：

| 主题名 | 风格描述 | 适合城市 |
|--------|---------|---------|
| `feature_based` | 经典黑白，道路层级分明 | 通用 |
| `gradient_roads` | 平滑渐变阴影 | 通用 |
| `contrast_zones` | 高对比度城市密度 | 大都市 |
| `noir` | 纯黑背景，白色道路 | 网格城市 |
| `midnight_blue` | 海军蓝背景，金色道路 | 海滨城市 |
| `blueprint` | 建筑蓝图美学 | 工业、现代城市 |
| `neon_cyberpunk` | 暗色背景，电子粉/青色 | 现代都市 |
| `warm_beige` | 复古米色调 | 欧洲古城 |
| `pastel_dream` | 柔和粉彩 | 浪漫城市 |
| `japanese_ink` | 极简水墨风格 | 亚洲城市 |
| `forest` | 深绿和鼠尾草色 | 花园城市 |
| `ocean` | 蓝色和青色 | 海滨城市 |
| `terracotta` | 地中海暖色 | 南欧、北非 |
| `sunset` | 暖橙和粉红 | 沙漠、海滨城市 |
| `autumn` | 秋季橙红色 | 秋色城市 |
| `copper_patina` | 氧化铜质感 | 历史名城 |
| `monochrome_blue` | 单一蓝色系 | 水城 |

### 查看所有主题

```bash
python create_map_poster.py --list-themes
```

### 自定义主题

在 `themes/` 目录创建 JSON 文件：

```json
{
  "name": "My Custom Theme",
  "description": "自定义主题说明",
  "bg": "#FFFFFF",
  "text": "#000000",
  "gradient_color": "#FFFFFF",
  "water": "#C0C0C0",
  "parks": "#F0F0F0",
  "road_motorway": "#0A0A0A",
  "road_primary": "#1A1A1A",
  "road_secondary": "#2A2A2A",
  "road_tertiary": "#3A3A3A",
  "road_residential": "#4A4A4A",
  "road_default": "#3A3A3A"
}
```

保存为 `themes/my_theme.json`，然后：

```bash
python create_map_poster.py -c "Tokyo" -C "Japan" -t my_theme
```

---

## 📁 输出文件

### 文件结构

每次运行会在 `posters/` 目录下创建一个文件夹：

```
posters/
└── tokyo_20260122_143022/          # 格式：城市_时间戳
    ├── japanese_ink_20260122_143022.png    # 高清海报 (300 DPI)
    ├── noir_20260122_143025.png
    ├── ...
    └── thumbnails/                          # 缩略图目录（如果使用 --thumbnail）
        ├── japanese_ink_20260122_143022.png  # ~1080px
        ├── noir_20260122_143025.png
        └── collages/                        # 拼贴图（自动生成）
            ├── collage_1.png                # 前 9 个主题 3x3 网格
            └── collage_2.png                # 后 9 个主题 3x3 网格
```

### 文件说明

- **高清海报**: 300 DPI，适合打印
- **缩略图**: ~1080px，适合网页展示和预览
- **拼贴图**: 自动生成的 3×3 网格，最多展示 18 个主题

---

---

## 🤝 贡献

欢迎贡献！您可以：

- 🐛 报告 Bug
- 💡 建议新功能
- 🎨 提交新主题
- 📖 改进文档
- 🔧 提交代码

---

## 📄 许可证

MIT License

---

## 🙏 致谢

### 原作者

本项目基于 [originalankur/maptoposter](https://github.com/originalankur/maptoposter) 的优秀工作开发。

感谢 originalankur 创建了这个出色的地图海报生成工具！

### 本项目增强

在原项目基础上，本项目添加了：
- ✨ Web 应用界面（Next.js + FastAPI）
- 🐳 Docker 容器化部署
- 🚀 一键部署脚本
- 🔒 Nginx 反向代理和 HTTPS 支持
- 📚 完善的文档

### 技术栈

- [OSMnx](https://github.com/gboeing/osmnx) - OpenStreetMap 数据获取
- [Matplotlib](https://matplotlib.org/) - 地图渲染
- [GeoPandas](https://geopandas.org/) - 地理空间数据处理
- [FastAPI](https://fastapi.tiangolo.com/) - 后端 API 框架
- [Next.js](https://nextjs.org/) - 前端框架
- [Nginx](https://nginx.org/) - Web 服务器和反向代理
- [Docker](https://www.docker.com/) - 容器化部署

---

**如果觉得有用，请给个 Star ⭐**
