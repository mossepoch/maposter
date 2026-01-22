# Maposter - City Map Poster Generator

Generate beautiful, minimalist map posters for any city in the world.

[中文文档](README_CN.md) | English

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="posters/new_york/new_york_noir_20260108_172453.png" width="200"><br>
        <b>New York - Noir</b>
      </td>
      <td align="center">
        <img src="posters/mumbai/mumbai_contrast_zones_20260108_172010.png" width="200"><br>
        <b>Mumbai - Contrast Zones</b>
      </td>
      <td align="center">
        <img src="posters/tokyo/tokyo_japanese_ink_20260108_165830.png" width="200"><br>
        <b>Tokyo - Japanese Ink</b>
      </td>
      <td align="center">
        <img src="posters/beijing/beijing_warm_beige_20260120_153147.png" width="200"><br>
        <b>Beijing - Warm Beige</b>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Deployment

### Method 1: Web Application (Recommended)

For users who prefer a graphical interface for online poster generation.

#### System Requirements

- **Docker**: Docker and Docker Compose installed
- **Memory**: At least 4GB available (8GB+ recommended)
- **Storage**: At least 20GB available space
- **OS**: Any system supporting Docker (Linux, macOS, Windows)

#### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/maposter.git
cd maposter

# 2. One-click deployment
chmod +x deploy.sh
./deploy.sh
```

The deployment script will automatically:
- ✅ Check Docker environment and system resources
- ✅ Create configuration file `web/.env`
- ✅ Build Docker images (backend + frontend, ~10-15 minutes)
- ✅ Start all services (Nginx + Frontend + Backend)
- ✅ Perform health checks

#### Access the Application

After successful deployment, open in your browser:

```
http://your-server-ip
```

Or for local deployment:

```
http://localhost
```

#### Configure Admin Password

Edit `web/.env` file:

```bash
ADMIN_PASSWORD=your_secure_password_here
```

Then restart services:

```bash
cd web
docker-compose restart
```

#### Common Management Commands

```bash
cd web

# Check service status
docker-compose ps

# View real-time logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx

# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Stop all services
docker-compose down

# Redeploy after code updates
git pull
docker-compose build
docker-compose up -d
```

---

### Method 2: Command Line Tool

For developers and batch generation scenarios.

#### Install Dependencies

**Option 1: Using pip (Simple)**

```bash
pip install -r requirements.txt
```

**Option 2: Using Conda (Recommended, avoids dependency conflicts)**

```bash
# Create virtual environment
conda create -n maposter python=3.11

# Activate environment
conda activate maposter

# Install dependencies
conda install numpy=1.26 geopandas osmnx pandas numexpr bottleneck
pip install -r requirements.txt
```

#### Basic Usage

```bash
python create_map_poster.py --city <city_name> --country <country_name> [options]
```

---

## 📖 Command Line Parameters

### Required Parameters

| Parameter | Short | Description | Example |
|-----------|-------|-------------|---------|
| `--city` | `-c` | City name | `-c "Tokyo"` |
| `--country` | `-C` | Country name | `-C "Japan"` |

### Optional Parameters

| Parameter | Short | Description | Default | Options/Example |
|-----------|-------|-------------|---------|-----------------|
| `--theme` | `-t` | Theme name or `all` | `feature_based` | See theme list below |
| `--distance` | `-d` | Map radius (meters) | `29000` | `4000-30000` |
| `--network-type` |  | Road network type | `drive` | `drive`, `all`, `walk`, `bike` |
| `--thumbnail` |  | Generate thumbnail | No | Add to generate |
| `--list-themes` |  | List all themes | - | No other params needed |

### Parameter Details

#### 1. `--city` / `-c` (Required)

City name in English or local official spelling.

```bash
# Correct examples
-c "New York"
-c "Tokyo"
-c "São Paulo"

# Multi-word city names need quotes
-c "San Francisco"  # ✓ Correct
-c San Francisco    # ✗ Wrong
```

#### 2. `--country` / `-C` (Required)

Country name in English.

```bash
-C "USA"
-C "Japan"
-C "United Kingdom"
```

#### 3. `--theme` / `-t` (Optional)

Theme name, controls color scheme. Default is `feature_based`.

**Single theme:**
```bash
-t noir              # Black and white minimalist
-t neon_cyberpunk    # Neon cyberpunk
-t japanese_ink      # Japanese ink style
```

**All themes:**
```bash
-t all               # Generate all 17 themes
```

#### 4. `--distance` / `-d` (Optional)

Map radius in meters. Controls map coverage area.

**Recommended distances:**

| Range | Use Case | Example |
|-------|----------|---------|
| 4000-6000m | Small cities, dense old town | Venice, Amsterdam center |
| 8000-12000m | Medium cities, city center focus | Paris, Barcelona, San Francisco |
| 15000-20000m | Large cities, full city view | Tokyo, Mumbai, New York |
| 25000-30000m | Mega cities, including suburbs | Los Angeles, Beijing, Shanghai |

```bash
# Small city
-d 5000

# Medium city
-d 10000

# Mega city
-d 20000
```

#### 5. `--network-type` (Optional)

Road network type, determines which roads to display.

| Value | Included Roads | Use Case |
|-------|---------------|----------|
| `drive` | Drivable roads (highways, main roads) | Default, suitable for most cities |
| `all` | All roads (including walkways, alleys) | Show more detail, dense urban areas |
| `walk` | Pedestrian paths | Walkable cities |
| `bike` | Bike paths | Cycling infrastructure |

```bash
# Drivable roads only (default)
--network-type drive

# All roads (including alleys)
--network-type all

# Pedestrian paths only
--network-type walk

# Bike paths only
--network-type bike
```

#### 6. `--thumbnail` (Optional)

Generate thumbnail (~1080px) for preview or web display.

```bash
# Generate both high-res poster and thumbnail
--thumbnail

# No thumbnail (default)
# Simply omit this parameter
```

#### 7. `--list-themes` (Optional)

List all available themes, no city/country needed.

```bash
python create_map_poster.py --list-themes
```

---

## 📝 Usage Examples

### Basic Examples

```bash
# 1. Simplest usage (default theme and distance)
python create_map_poster.py -c "Paris" -C "France"

# 2. Specify theme
python create_map_poster.py -c "Tokyo" -C "Japan" -t japanese_ink

# 3. Specify distance
python create_map_poster.py -c "Venice" -C "Italy" -d 5000

# 4. Combined usage
python create_map_poster.py -c "New York" -C "USA" -t noir -d 12000
```

### By City Type

**Grid Cities (Regular streets)**

```bash
# New York Manhattan - Classic grid
python create_map_poster.py -c "New York" -C "USA" -t noir -d 12000

# Barcelona - Square blocks
python create_map_poster.py -c "Barcelona" -C "Spain" -t warm_beige -d 8000

# Chicago - Neat grid
python create_map_poster.py -c "Chicago" -C "USA" -t contrast_zones -d 15000
```

**Waterfront Cities (Canals, coastlines)**

```bash
# Venice - Canal network
python create_map_poster.py -c "Venice" -C "Italy" -t blueprint -d 4000

# Amsterdam - Concentric canals
python create_map_poster.py -c "Amsterdam" -C "Netherlands" -t ocean -d 6000

# Dubai - Palm islands and coastline
python create_map_poster.py -c "Dubai" -C "UAE" -t midnight_blue -d 15000

# San Francisco - Peninsula coast
python create_map_poster.py -c "San Francisco" -C "USA" -t sunset -d 10000
```

**Radial Cities (Ring structure)**

```bash
# Paris - Haussmann boulevards
python create_map_poster.py -c "Paris" -C "France" -t pastel_dream -d 10000

# Moscow - Ring system
python create_map_poster.py -c "Moscow" -C "Russia" -t noir -d 12000
```

**Organic Cities (Irregular streets)**

```bash
# Tokyo - Dense organic streets
python create_map_poster.py -c "Tokyo" -C "Japan" -t japanese_ink -d 15000

# Marrakech - Old town maze
python create_map_poster.py -c "Marrakech" -C "Morocco" -t terracotta -d 5000

# Rome - Ancient streets
python create_map_poster.py -c "Rome" -C "Italy" -t warm_beige -d 8000
```

**River Cities**

```bash
# London - Thames River
python create_map_poster.py -c "London" -C "UK" -t noir -d 15000

# Budapest - Danube River
python create_map_poster.py -c "Budapest" -C "Hungary" -t copper_patina -d 8000
```

### Advanced Usage

```bash
# 1. Generate all themes (17 posters)
python create_map_poster.py -c "Paris" -C "France" -t all -d 10000

# 2. Include all roads (walkways, alleys)
python create_map_poster.py -c "Suzhou" -C "China" -t sunset -d 10000 --network-type all

# 3. Generate poster + thumbnail
python create_map_poster.py -c "Singapore" -C "Singapore" -t neon_cyberpunk -d 8000 --thumbnail

# 4. Full parameters example
python create_map_poster.py \
  --city "Barcelona" \
  --country "Spain" \
  --theme warm_beige \
  --distance 8000 \
  --network-type drive \
  --thumbnail
```

### Batch Generation

```bash
# Generate multiple themes for same city
cities=("noir" "midnight_blue" "sunset" "ocean")
for theme in "${cities[@]}"; do
  python create_map_poster.py -c "Tokyo" -C "Japan" -t $theme -d 15000
done

# Or simply use all
python create_map_poster.py -c "Tokyo" -C "Japan" -t all -d 15000
```

---

## 🎨 Theme List

17 built-in themes, each with unique style:

| Theme Name | Style Description | Suitable For |
|------------|-------------------|--------------|
| `feature_based` | Classic B&W, distinct road hierarchy | Universal |
| `gradient_roads` | Smooth gradient shadows | Universal |
| `contrast_zones` | High-contrast city density | Metropolis |
| `noir` | Pure black background, white roads | Grid cities |
| `midnight_blue` | Navy blue background, golden roads | Coastal cities |
| `blueprint` | Architectural blueprint aesthetic | Industrial, modern cities |
| `neon_cyberpunk` | Dark background, electric pink/cyan | Modern cities |
| `warm_beige` | Vintage beige tones | European old towns |
| `pastel_dream` | Soft pastels | Romantic cities |
| `japanese_ink` | Minimalist ink style | Asian cities |
| `forest` | Deep green and sage | Garden cities |
| `ocean` | Blue and cyan | Coastal cities |
| `terracotta` | Mediterranean warm colors | Southern Europe, North Africa |
| `sunset` | Warm orange and pink | Desert, coastal cities |
| `autumn` | Autumn orange-red | Autumn cities |
| `copper_patina` | Oxidized copper texture | Historic cities |
| `monochrome_blue` | Single blue tones | Water cities |

### View All Themes

```bash
python create_map_poster.py --list-themes
```

### Custom Themes

Create a JSON file in `themes/` directory:

```json
{
  "name": "My Custom Theme",
  "description": "Custom theme description",
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

Save as `themes/my_theme.json`, then:

```bash
python create_map_poster.py -c "Tokyo" -C "Japan" -t my_theme
```

---

## 📁 Output Files

### File Structure

Each run creates a folder in `posters/` directory:

```
posters/
└── tokyo_20260122_143022/          # Format: city_timestamp
    ├── japanese_ink_20260122_143022.png    # High-res poster (300 DPI)
    ├── noir_20260122_143025.png
    ├── ...
    └── thumbnails/                          # Thumbnail directory (if --thumbnail used)
        ├── japanese_ink_20260122_143022.png  # ~1080px
        ├── noir_20260122_143025.png
        └── collages/                        # Collages (auto-generated)
            ├── collage_1.png                # First 9 themes in 3x3 grid
            └── collage_2.png                # Next 9 themes in 3x3 grid
```

### File Description

- **High-res posters**: 300 DPI, suitable for printing
- **Thumbnails**: ~1080px, suitable for web display and preview
- **Collages**: Auto-generated 3×3 grids, display up to 18 themes

---

## 🤝 Contributing

Contributions welcome! You can:

- 🐛 Report bugs
- 💡 Suggest features
- 🎨 Submit new themes
- 📖 Improve documentation
- 🔧 Submit code

---

## 📄 License

MIT License

---

## 🙏 Credits

### Original Author

This project is based on the excellent work of [originalankur/maptoposter](https://github.com/originalankur/maptoposter).

Thank you originalankur for creating this awesome map poster generator!

### Enhancements in This Project

Built upon the original project, this version adds:
- ✨ Web application interface (Next.js + FastAPI)
- 🐳 Docker containerized deployment
- 🚀 One-click deployment script
- 🔒 Nginx reverse proxy and HTTPS support
- 📚 Comprehensive documentation

### Tech Stack

- [OSMnx](https://github.com/gboeing/osmnx) - OpenStreetMap data retrieval
- [Matplotlib](https://matplotlib.org/) - Map rendering
- [GeoPandas](https://geopandas.org/) - Geospatial data processing
- [FastAPI](https://fastapi.tiangolo.com/) - Backend API framework
- [Next.js](https://nextjs.org/) - Frontend framework
- [Nginx](https://nginx.org/) - Web server and reverse proxy
- [Docker](https://www.docker.com/) - Containerized deployment

---

**If you find this useful, please give it a Star ⭐**
