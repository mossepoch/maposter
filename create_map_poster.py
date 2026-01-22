import osmnx as ox
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
import matplotlib.colors as mcolors
import numpy as np
from geopy.geocoders import Nominatim
from tqdm import tqdm
import time
import json
import os
from datetime import datetime
import argparse
from PIL import Image
import gc

THEMES_DIR = "themes"
FONTS_DIR = "fonts"
POSTERS_DIR = "posters"

def load_fonts():
    """
    Load Roboto fonts from the fonts directory.
    Returns dict with font paths for different weights.
    """
    fonts = {
        'bold': os.path.join(FONTS_DIR, 'Roboto-Bold.ttf'),
        'regular': os.path.join(FONTS_DIR, 'Roboto-Regular.ttf'),
        'light': os.path.join(FONTS_DIR, 'Roboto-Light.ttf')
    }
    
    # Verify fonts exist
    for weight, path in fonts.items():
        if not os.path.exists(path):
            print(f"⚠ Font not found: {path}")
            return None
    
    return fonts

FONTS = load_fonts()

def ensure_run_directories(city, run_id):
    """Ensure the city/timestamp run directory and thumbnails subfolder exist."""
    if not os.path.exists(POSTERS_DIR):
        os.makedirs(POSTERS_DIR)
    
    city_slug = city.lower().replace(' ', '_')
    run_dir = os.path.join(POSTERS_DIR, f"{city_slug}_{run_id}")
    thumbnails_dir = os.path.join(run_dir, "thumbnails")
    collages_dir = os.path.join(thumbnails_dir, "collages")
    
    os.makedirs(run_dir, exist_ok=True)
    os.makedirs(thumbnails_dir, exist_ok=True)
    os.makedirs(collages_dir, exist_ok=True)
    
    return run_dir, thumbnails_dir, collages_dir

def generate_output_filename(city, theme_name, run_id, run_dir=None, use_svg=False):
    """
    Generate output path organized by city + run timestamp directory.
    """
    if run_dir is None:
        run_dir, _ = ensure_run_directories(city, run_id)

    extension = "svg" if use_svg else "png"
    filename = f"{theme_name}_{run_id}.{extension}"
    return os.path.join(run_dir, filename)

def get_available_themes():
    """
    Scans the themes directory and returns a list of available theme names.
    """
    if not os.path.exists(THEMES_DIR):
        os.makedirs(THEMES_DIR)
        return []
    
    themes = []
    for file in sorted(os.listdir(THEMES_DIR)):
        if file.endswith('.json'):
            theme_name = file[:-5]  # Remove .json extension
            themes.append(theme_name)
    return themes

def load_theme(theme_name="feature_based"):
    """
    Load theme from JSON file in themes directory.
    """
    theme_file = os.path.join(THEMES_DIR, f"{theme_name}.json")
    
    if not os.path.exists(theme_file):
        print(f"⚠ Theme file '{theme_file}' not found. Using default feature_based theme.")
        # Fallback to embedded default theme
        return {
            "name": "Feature-Based Shading",
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
    
    with open(theme_file, 'r') as f:
        theme = json.load(f)
        print(f"✓ Loaded theme: {theme.get('name', theme_name)}")
        if 'description' in theme:
            print(f"  {theme['description']}")
        return theme

# Load theme (can be changed via command line or input)
THEME = None  # Will be loaded later

def generate_thumbnail(image_path, thumbnails_dir, max_dimension=1080):
    """
    Create a thumbnail with the longest side equal to max_dimension.
    """
    if not os.path.exists(image_path):
        print(f"  ⚠ Thumbnail skipped - file not found: {image_path}")
        return None
    if not thumbnails_dir:
        print("  ⚠ Thumbnail skipped - thumbnails directory not provided.")
        return None
    
    os.makedirs(thumbnails_dir, exist_ok=True)
    
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            longest_side = max(width, height)
            
            if longest_side <= max_dimension:
                print("  ℹ Thumbnail skipped - image already smaller than requested size.")
                return None
            
            scale = max_dimension / longest_side
            new_size = (int(width * scale), int(height * scale))
            resized = img.resize(new_size, Image.LANCZOS).convert("RGB")
            
            base_slug = os.path.splitext(os.path.basename(image_path))[0]
            thumb_path = os.path.join(thumbnails_dir, f"{base_slug}.jpg")
            resized.save(thumb_path, format="JPEG", quality=85, optimize=True)
            print(f"  ✓ Thumbnail saved as {thumb_path} ({new_size[0]}x{new_size[1]})")
            return thumb_path
    except Exception as exc:
        print(f"  ⚠ Failed to create thumbnail: {exc}")
        return None

def create_thumbnail_collages(thumbnail_paths, thumbnails_dir, grid=(3, 3)):
    """
    Create collage images from a list of thumbnail paths.
    """
    if not thumbnail_paths:
        return []
    
    cols, rows = grid
    per_collage = cols * rows
    collages = []
    
    for chunk_index in range(0, len(thumbnail_paths), per_collage):
        chunk = thumbnail_paths[chunk_index:chunk_index + per_collage]
        if not chunk:
            continue
        
        images = []
        try:
            for path in chunk:
                images.append(Image.open(path))
            
            cell_w = max(img.width for img in images)
            cell_h = max(img.height for img in images)
            collage_w = cell_w * cols
            collage_h = cell_h * rows
            
            collage = Image.new("RGB", (collage_w, collage_h), color=(255, 255, 255))
            
            for i, img in enumerate(images):
                resized = img.copy()
                resized.thumbnail((cell_w, cell_h), Image.LANCZOS)
                row = i // cols
                col = i % cols
                offset_x = col * cell_w + (cell_w - resized.width) // 2
                offset_y = row * cell_h + (cell_h - resized.height) // 2
                collage.paste(resized, (offset_x, offset_y))
                resized.close()
            
            collage_name = f"collage_{chunk_index // per_collage + 1}.jpg"
            collage_path = os.path.join(thumbnails_dir, collage_name)
            collage.save(collage_path, format="JPEG", quality=85, optimize=True)
            collages.append(collage_path)
            print(f"  ✓ Collage saved as {collage_path}")
        finally:
            for img in images:
                img.close()
    
    return collages

def project_geodataframe(gdf, target_crs):
    """Project a GeoDataFrame to the graph CRS if available."""
    if gdf is None or target_crs is None:
        return gdf
    try:
        if gdf.crs != target_crs:
            return ox.project_gdf(gdf, to_crs=target_crs)
    except Exception as exc:
        print(f"  ⚠ Could not project features: {exc}")
    return gdf

def normalize_text(value):
    """
    Normalize place names for fuzzy comparisons.
    Keeps alphanumeric characters (including non-Latin scripts) and lowercases.
    """
    if value is None:
        return ""
    return "".join(ch.casefold() for ch in str(value) if ch.isalnum())

def build_city_variants(city):
    """
    Generate spelling variants for the requested city to improve geocoding accuracy.
    """
    variants = []
    if not city:
        return variants
    
    base = city.strip()
    if base:
        variants.append(base)
    
    squeezed_space = " ".join(base.split())
    if squeezed_space and squeezed_space not in variants:
        variants.append(squeezed_space)
    
    spaceless = squeezed_space.replace(" ", "")
    if spaceless and spaceless not in variants:
        variants.append(spaceless)
    
    hyphen_to_space = squeezed_space.replace("-", " ")
    if hyphen_to_space and hyphen_to_space not in variants:
        variants.append(hyphen_to_space)
    
    hyphenless = squeezed_space.replace("-", "")
    if hyphenless and hyphenless not in variants:
        variants.append(hyphenless)
    
    return variants

def location_matches_request(location, city_variants, normalized_country):
    """
    Validate that the geocoding result corresponds to the requested city/country.
    使用更宽松的匹配策略，提高匹配成功率
    """
    if not location:
        return False

    address = location.raw.get('address', {})
    candidate_country = normalize_text(address.get('country'))

    # 国家验证 - 只在两者都存在且明确不同时才拒绝
    if normalized_country and candidate_country:
        # 允许常见的国家名称变体
        country_aliases = {
            'usa': ['unitedstates', 'unitedstatesofamerica', 'us', 'america'],
            'uk': ['unitedkingdom', 'greatbritain', 'britain', 'england'],
            'uae': ['unitedarabemirates', 'emirates'],
            'china': ['peoplesrepublicofchina', 'prc'],
        }

        # 检查是否为别名
        is_alias_match = False
        for aliases in country_aliases.values():
            if normalized_country in aliases and candidate_country in aliases:
                is_alias_match = True
                break

        # 只有在明确不匹配且不是别名时才拒绝
        if not is_alias_match and normalized_country != candidate_country:
            return False

    normalized_targets = {normalize_text(variant) for variant in city_variants if normalize_text(variant)}
    candidate_fields = [
        address.get('city'),
        address.get('town'),
        address.get('village'),
        address.get('municipality'),
        address.get('county'),
        address.get('state'),
        address.get('region'),
        address.get('province'),
        location.address,
        location.raw.get('display_name')
    ]

    namedetails = location.raw.get('namedetails', {})
    if isinstance(namedetails, dict):
        candidate_fields.extend(namedetails.values())

    # 检查匹配 - 使用双向匹配提高准确率
    for candidate in candidate_fields:
        normalized_candidate = normalize_text(candidate)
        if not normalized_candidate:
            continue
        for target in normalized_targets:
            if not target:
                continue
            # 双向检查：目标在候选中，或候选在目标中
            if target in normalized_candidate or normalized_candidate in target:
                return True
            # 检查部分单词匹配（处理 "New York City" vs "New York" 的情况）
            target_words = set(target.split())
            candidate_words = set(normalized_candidate.split())
            if target_words and candidate_words and len(target_words & candidate_words) >= len(target_words) * 0.7:
                return True

    return False

def create_gradient_fade(ax, color, location='bottom', zorder=10):
    """
    Creates a fade effect at the top or bottom of the map.
    """
    vals = np.linspace(0, 1, 256).reshape(-1, 1)
    gradient = np.hstack((vals, vals))
    
    rgb = mcolors.to_rgb(color)
    my_colors = np.zeros((256, 4))
    my_colors[:, 0] = rgb[0]
    my_colors[:, 1] = rgb[1]
    my_colors[:, 2] = rgb[2]
    
    if location == 'bottom':
        my_colors[:, 3] = np.linspace(1, 0, 256)
        extent_y_start = 0
        extent_y_end = 0.25
    else:
        my_colors[:, 3] = np.linspace(0, 1, 256)
        extent_y_start = 0.75
        extent_y_end = 1.0

    custom_cmap = mcolors.ListedColormap(my_colors)
    
    xlim = ax.get_xlim()
    ylim = ax.get_ylim()
    y_range = ylim[1] - ylim[0]
    
    y_bottom = ylim[0] + y_range * extent_y_start
    y_top = ylim[0] + y_range * extent_y_end
    
    ax.imshow(gradient, extent=[xlim[0], xlim[1], y_bottom, y_top], 
              aspect='auto', cmap=custom_cmap, zorder=zorder, origin='lower')

def get_edge_colors_by_type(G, THEME):
    """
    Assigns colors to edges based on road type hierarchy.
    Returns a list of colors corresponding to each edge in the graph.
    """
    edge_colors = []

    for u, v, data in G.edges(data=True):
        # Get the highway type (can be a list or string)
        highway = data.get('highway', 'unclassified')

        # Handle list of highway types (take the first one)
        if isinstance(highway, list):
            highway = highway[0] if highway else 'unclassified'

        # Assign color based on road type
        if highway in ['motorway', 'motorway_link']:
            color = THEME['road_motorway']
        elif highway in ['trunk', 'trunk_link', 'primary', 'primary_link']:
            color = THEME['road_primary']
        elif highway in ['secondary', 'secondary_link']:
            color = THEME['road_secondary']
        elif highway in ['tertiary', 'tertiary_link']:
            color = THEME['road_tertiary']
        elif highway in ['residential', 'living_street', 'unclassified']:
            color = THEME['road_residential']
        else:
            color = THEME['road_default']

        edge_colors.append(color)

    return edge_colors

def get_edge_widths_by_type(G):
    """
    Assigns line widths to edges based on road type.
    Major roads get thicker lines.
    """
    edge_widths = []
    
    for u, v, data in G.edges(data=True):
        highway = data.get('highway', 'unclassified')
        
        if isinstance(highway, list):
            highway = highway[0] if highway else 'unclassified'
        
        # Assign width based on road importance
        if highway in ['motorway', 'motorway_link']:
            width = 1.2
        elif highway in ['trunk', 'trunk_link', 'primary', 'primary_link']:
            width = 1.0
        elif highway in ['secondary', 'secondary_link']:
            width = 0.8
        elif highway in ['tertiary', 'tertiary_link']:
            width = 0.6
        else:
            width = 0.4
        
        edge_widths.append(width)
    
    return edge_widths

def get_coordinates(city, country):
    """
    Fetches coordinates for a given city and country using geopy.
    Includes rate limiting to be respectful to the geocoding service.
    """
    print("Looking up coordinates...")
    geolocator = Nominatim(user_agent="city_map_poster", timeout=10)
    
    # Add a small delay to respect Nominatim's usage policy
    time.sleep(1)
    
    city_variants = build_city_variants(city)
    normalized_country = normalize_text(country)
    
    query_queue = []
    for variant in city_variants:
        query_queue.append({"city": variant, "country": country})
    for variant in city_variants:
        query_queue.append({"county": variant, "country": country})
        query_queue.append({"state": variant, "country": country})
    query_queue.append(f"{city}, {country}")
    if " " in city:
        query_queue.append(f"{city.replace(' ', '')}, {country}")
    
    for idx, query in enumerate(query_queue, start=1):
        try:
            location = geolocator.geocode(
                query,
                exactly_one=True,
                addressdetails=True,
                namedetails=True,
                language="en"
            )
        except Exception as exc:
            print(f"  ⚠ Geocoding attempt {idx} failed for '{query}': {exc}")
            continue
        
        if location and location_matches_request(location, city_variants, normalized_country):
            print(f"✓ Found: {location.address}")
            print(f"✓ Coordinates: {location.latitude}, {location.longitude}")
            return (location.latitude, location.longitude)
        elif location:
            print(f"  ⚠ Skipping '{location.address}' - does not match requested city.")
    
    raise ValueError(f"Could not find coordinates for {city}, {country}. Try alternate spellings or include state/province.")

def create_poster(
    city,
    country,
    point,
    dist,
    output_file,
    network_type,
    make_thumbnail=False,
    thumbnails_dir=None,
    thumbnail_collector=None,
    show_attribution=True,
    use_svg=False,
    theme_name="feature_based",
    poster_size=(12, 16),  # (width, height) in inches
):
    print(f"\nGenerating map for {city}, {country}...")

    # Load theme
    THEME = load_theme(theme_name)
    if THEME is None:
        raise ValueError(f"Failed to load theme: {theme_name}")

    # Progress bar for data fetching
    with tqdm(total=3, desc="Fetching map data", unit="step", bar_format='{l_bar}{bar}| {n_fmt}/{total_fmt}') as pbar:
        # 1. Fetch Street Network
        pbar.set_description("Downloading street network")

        # Memory optimization based on distance
        # Thresholds:  15km: drop isolated nodes, 20km: aggressive simplification
        use_aggressive_mode = dist > 15000

        if use_aggressive_mode:
            print(f"  ⚠️  Using memory optimization for distance {dist}m")

        G = ox.graph_from_point(
            point,
            dist=dist,
            dist_type='bbox',
            network_type=network_type,
            retain_all=False if use_aggressive_mode else True,
            simplify=True,
            truncate_by_edge=True
        )

        # Additional simplification for very large distances
        if dist > 20000:
            print(f"  Applying aggressive graph simplification")
            G = ox.simplify_graph(G, strict=False)
        G = ox.project_graph(G)
        graph_crs = G.graph.get('crs')
        pbar.update(1)
        time.sleep(0.5)  # Rate limit between requests
        
        # 2. Fetch Water Features
        pbar.set_description("Downloading water features")
        try:
            water = ox.features_from_point(point, tags={'natural': 'water', 'waterway': 'riverbank'}, dist=dist)
        except:
            water = None
        water = project_geodataframe(water, graph_crs)
        pbar.update(1)
        time.sleep(0.3)
        
        # 3. Fetch Parks
        pbar.set_description("Downloading parks/green spaces")
        gc.collect()  # Free memory before next download
        try:
            parks = ox.features_from_point(point, tags={'leisure': 'park', 'landuse': 'grass'}, dist=dist)
        except:
            parks = None
        parks = project_geodataframe(parks, graph_crs)
        pbar.update(1)
    
    print("✓ All data downloaded successfully!")

    # 2. Setup Plot
    print(f"Rendering map at {poster_size[0]}×{poster_size[1]} inches...")
    fig, ax = plt.subplots(figsize=poster_size, facecolor=THEME['bg'])
    ax.set_facecolor(THEME['bg'])
    ax.set_position([0, 0, 1, 1])
    
    # 3. Plot Layers
    # Layer 1: Polygons
    if water is not None and not water.empty:
        water.plot(ax=ax, facecolor=THEME['water'], edgecolor='none', zorder=1)
    if parks is not None and not parks.empty:
        parks.plot(ax=ax, facecolor=THEME['parks'], edgecolor='none', zorder=2)
    
    # Layer 2: Roads with hierarchy coloring
    print("Applying road hierarchy colors...")
    edge_colors = get_edge_colors_by_type(G, THEME)
    edge_widths = get_edge_widths_by_type(G)
    
    ox.plot_graph(
        G, ax=ax, bgcolor=THEME['bg'],
        node_size=0,
        edge_color=edge_colors,
        edge_linewidth=edge_widths,
        show=False, close=False
    )
    
    # Layer 3: Gradients (Top and Bottom)
    create_gradient_fade(ax, THEME['gradient_color'], location='bottom', zorder=10)
    create_gradient_fade(ax, THEME['gradient_color'], location='top', zorder=10)
    
    # 4. Typography using Roboto font
    if FONTS:
        font_main = FontProperties(fname=FONTS['bold'], size=60)
        font_top = FontProperties(fname=FONTS['bold'], size=40)
        font_sub = FontProperties(fname=FONTS['light'], size=22)
        font_coords = FontProperties(fname=FONTS['regular'], size=14)
    else:
        # Fallback to system fonts
        font_main = FontProperties(family='monospace', weight='bold', size=60)
        font_top = FontProperties(family='monospace', weight='bold', size=40)
        font_sub = FontProperties(family='monospace', weight='normal', size=22)
        font_coords = FontProperties(family='monospace', size=14)
    
    spaced_city = "  ".join(list(city.upper()))

    # --- BOTTOM TEXT ---
    ax.text(0.5, 0.14, spaced_city, transform=ax.transAxes,
            color=THEME['text'], ha='center', fontproperties=font_main, zorder=11)
    
    ax.text(0.5, 0.10, country.upper(), transform=ax.transAxes,
            color=THEME['text'], ha='center', fontproperties=font_sub, zorder=11)
    
    lat, lon = point
    coords = f"{lat:.4f}° N / {lon:.4f}° E" if lat >= 0 else f"{abs(lat):.4f}° S / {lon:.4f}° E"
    if lon < 0:
        coords = coords.replace("E", "W")
    
    ax.text(0.5, 0.07, coords, transform=ax.transAxes,
            color=THEME['text'], alpha=0.7, ha='center', fontproperties=font_coords, zorder=11)
    
    ax.plot([0.4, 0.6], [0.125, 0.125], transform=ax.transAxes, 
            color=THEME['text'], linewidth=1, zorder=11)

    # --- ATTRIBUTION (bottom right) ---
    if show_attribution:
        if FONTS:
            font_attr = FontProperties(fname=FONTS['light'], size=8)
        else:
            font_attr = FontProperties(family='monospace', size=8)
        
        ax.text(
            0.995,
            0.005,
            "© OpenStreetMap contributors",
            transform=ax.transAxes,
            color=THEME['text'],
            alpha=0.5,
            ha='right',
            va='bottom',
            fontproperties=font_attr,
            zorder=11,
        )

    # 5. Save
    print(f"Saving to {output_file}...")
    if use_svg:
        plt.savefig(output_file, format='svg', facecolor=THEME['bg'])
    else:
        plt.savefig(output_file, dpi=300, facecolor=THEME['bg'])
    plt.close()

    # Force garbage collection to free memory
    del G, water, parks, edge_colors, edge_widths
    gc.collect()

    print(f"✓ Done! Poster saved as {output_file}")

    if make_thumbnail:
        thumb_path = generate_thumbnail(output_file, thumbnails_dir)
        if thumb_path and thumbnail_collector is not None:
            thumbnail_collector.append(thumb_path)

def print_examples():
    """Print usage examples."""
    print("""
City Map Poster Generator
=========================

Usage:
  python create_map_poster.py --city <city> --country <country> [options]

Examples:
  # Iconic grid patterns
  python create_map_poster.py -c "New York" -C "USA" -t noir -d 12000           # Manhattan grid
  python create_map_poster.py -c "Barcelona" -C "Spain" -t warm_beige -d 8000   # Eixample district grid
  
  # Waterfront & canals
  python create_map_poster.py -c "Venice" -C "Italy" -t blueprint -d 4000       # Canal network
  python create_map_poster.py -c "Amsterdam" -C "Netherlands" -t ocean -d 6000  # Concentric canals
  python create_map_poster.py -c "Dubai" -C "UAE" -t midnight_blue -d 15000     # Palm & coastline
  
  # Radial patterns
  python create_map_poster.py -c "Paris" -C "France" -t pastel_dream -d 10000   # Haussmann boulevards
  python create_map_poster.py -c "Moscow" -C "Russia" -t noir -d 12000          # Ring roads
  
  # Organic old cities
  python create_map_poster.py -c "Tokyo" -C "Japan" -t japanese_ink -d 15000    # Dense organic streets
  python create_map_poster.py -c "Marrakech" -C "Morocco" -t terracotta -d 5000 # Medina maze
  python create_map_poster.py -c "Rome" -C "Italy" -t warm_beige -d 8000        # Ancient street layout
  
  # Coastal cities
  python create_map_poster.py -c "San Francisco" -C "USA" -t sunset -d 10000    # Peninsula grid
  python create_map_poster.py -c "Sydney" -C "Australia" -t ocean -d 12000      # Harbor city
  python create_map_poster.py -c "Mumbai" -C "India" -t contrast_zones -d 18000 # Coastal peninsula
  
  # River cities
  python create_map_poster.py -c "London" -C "UK" -t noir -d 15000              # Thames curves
  python create_map_poster.py -c "Budapest" -C "Hungary" -t copper_patina -d 8000  # Danube split
  
  # List themes
  python create_map_poster.py --list-themes

Options:
  --city, -c        City name (required)
  --country, -C     Country name (required)
  --theme, -t       Theme name (default: feature_based)
  --distance, -d    Map radius in meters (default: 29000)
  --list-themes     List all available themes

Distance guide:
  4000-6000m   Small/dense cities (Venice, Amsterdam old center)
  8000-12000m  Medium cities, focused downtown (Paris, Barcelona)
  15000-20000m Large metros, full city view (Tokyo, Mumbai)

Available themes can be found in the 'themes/' directory.
Generated posters are saved to 'posters/' directory.
""")

def list_themes():
    """List all available themes with descriptions."""
    available_themes = get_available_themes()
    if not available_themes:
        print("No themes found in 'themes/' directory.")
        return
    
    print("\nAvailable Themes:")
    print("-" * 60)
    for theme_name in available_themes:
        theme_path = os.path.join(THEMES_DIR, f"{theme_name}.json")
        try:
            with open(theme_path, 'r') as f:
                theme_data = json.load(f)
                display_name = theme_data.get('name', theme_name)
                description = theme_data.get('description', '')
        except:
            display_name = theme_name
            description = ''
        print(f"  {theme_name}")
        print(f"    {display_name}")
        if description:
            print(f"    {description}")
        print()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate beautiful map posters for any city",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python create_map_poster.py --city "New York" --country "USA"
  python create_map_poster.py --city Tokyo --country Japan --theme midnight_blue
  python create_map_poster.py --city Paris --country France --theme noir --distance 15000
  python create_map_poster.py --list-themes
        """
    )
    
    parser.add_argument('--city', '-c', type=str, help='City name')
    parser.add_argument('--country', '-C', type=str, help='Country name')
    parser.add_argument('--theme', '-t', type=str, default='feature_based', help='Theme name (default: feature_based)')
    parser.add_argument('--distance', '-d', type=int, default=29000, help='Map radius in meters (default: 29000)')
    parser.add_argument('--list-themes', action='store_true', help='List all available themes')
    parser.add_argument(
        '--network-type',
        type=str,
        default='drive',
        choices=['drive', 'drive_service', 'walk', 'bike', 'all', 'all_private'],
        help="OSMnx network type to download (default: drive). Use 'all' to include pedestrian paths."
    )
    parser.add_argument(
        '--thumbnail',
        action='store_true',
        help='Also export a ~1080px thumbnail alongside the full-resolution poster'
    )
    parser.add_argument(
        '--latitude',
        type=float,
        help='Latitude override for the map center (skip geocoding when paired with --longitude)'
    )
    parser.add_argument(
        '--longitude',
        type=float,
        help='Longitude override for the map center (skip geocoding when paired with --latitude)'
    )
    parser.add_argument(
        '--hide-attribution',
        action='store_true',
        help='Hide the default “© OpenStreetMap contributors” watermark on the poster'
    )
    parser.add_argument(
        '--svg',
        action='store_true',
        help='Export poster as SVG (vector format) instead of PNG'
    )

    args = parser.parse_args()
    
    # If no arguments provided, show examples
    if len(os.sys.argv) == 1:
        print_examples()
        os.sys.exit(0)
    
    # List themes if requested
    if args.list_themes:
        list_themes()
        os.sys.exit(0)
    
    # Validate required arguments
    if not args.city or not args.country:
        print("Error: --city and --country are required.\n")
        print_examples()
        os.sys.exit(1)
    
    # Validate theme exists (allow special keyword 'all')
    available_themes = get_available_themes()
    if not available_themes:
        print("Error: No themes found in 'themes/' directory.")
        os.sys.exit(1)
    
    if args.theme == 'all':
        themes_to_render = available_themes
    else:
        if args.theme not in available_themes:
            print(f"Error: Theme '{args.theme}' not found.")
            print(f"Available themes: {', '.join(available_themes)}")
            os.sys.exit(1)
        themes_to_render = [args.theme]
    
    print("=" * 50)
    print("City Map Poster Generator")
    print("=" * 50)
    
    # Determine coordinates once (override with manual input if provided)
    if args.latitude is not None or args.longitude is not None:
        if args.latitude is None or args.longitude is None:
            print("Error: both --latitude and --longitude must be provided together.")
            os.sys.exit(1)
        coords = (args.latitude, args.longitude)
        print(f"✓ Using manual coordinates: {args.latitude}, {args.longitude}")
    else:
        try:
            coords = get_coordinates(args.city, args.country)
        except Exception as e:
            print(f"\n✗ Error: {e}")
            import traceback
            traceback.print_exc()
            os.sys.exit(1)
    
    run_id = datetime.now().strftime("%Y%m%d_%H%M%S")
    run_dir, thumbnails_dir, collages_dir = ensure_run_directories(args.city, run_id)
    
    failures = []
    total = len(themes_to_render)
    
    thumbnails = []
    
    for idx, theme_name in enumerate(themes_to_render, start=1):
        try:
            print(f"\n--- Theme {idx}/{total}: {theme_name} ---")
            THEME = load_theme(theme_name)
            output_file = generate_output_filename(args.city, theme_name, run_id, run_dir=run_dir, use_svg=args.svg)
            create_poster(
                args.city,
                args.country,
                coords,
                args.distance,
                output_file,
                args.network_type,
                make_thumbnail=args.thumbnail,
                thumbnails_dir=thumbnails_dir if args.thumbnail else None,
                thumbnail_collector=thumbnails if args.thumbnail else None,
                show_attribution=not args.hide_attribution,
                use_svg=args.svg,
            )
        except Exception as e:
            print(f"\n Error while rendering theme '{theme_name}': {e}")
            import traceback
            traceback.print_exc()
            failures.append(theme_name)
    
    if args.thumbnail and thumbnails:
        print("\nCreating collage thumbnails...")
        create_thumbnail_collages(thumbnails, collages_dir, grid=(3, 3))
    
    print("\n" + "=" * 50)
    if failures:
        successful = [t for t in themes_to_render if t not in failures]
        if successful:
            print(f"✓ Completed themes: {', '.join(successful)}")
        print(f"✗ Failed themes: {', '.join(failures)}")
        os.sys.exit(1)
    else:
        print("✓ Poster generation complete!")
    print("=" * 50)
