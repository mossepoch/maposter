"""
Backend configuration for map poster generation.
Adjust these settings based on your server's memory capacity.
"""

# Memory Management Settings
# ---------------------------

# Maximum allowed distance for map generation (meters)
# Larger distances require more memory
# IMPORTANT: For 6GB RAM servers, 25000m is the safe maximum
# Adjust based on your server capacity:
#   - 4GB RAM: MAX_DISTANCE = 20000
#   - 6GB RAM: MAX_DISTANCE = 25000 (safe for production)
#   - 8GB+ RAM: MAX_DISTANCE = 35000
MAX_DISTANCE = 25000

# Distance threshold for applying memory optimizations (meters)
# Above this threshold, aggressive simplification is applied
MEMORY_OPTIMIZATION_THRESHOLD = 15000

# Distance threshold for warning users (meters)
# Users will see a warning if distance exceeds this
WARNING_THRESHOLD = 20000

# Distance recommendations for different city types
DISTANCE_RECOMMENDATIONS = {
    "small_dense": (4000, 6000),      # Venice, Amsterdam center
    "medium": (8000, 15000),           # Paris, Barcelona
    "large_metro": (15000, 25000),     # Tokyo, Mumbai
    "very_large": (25000, 35000)       # Maximum, not recommended
}

# OSMnx Settings
# --------------

# Whether to retain all nodes (including isolated ones)
# Set to False for large distances to reduce memory
RETAIN_ALL_NODES_THRESHOLD = 20000  # Only retain all if distance < this

# Simplification tolerance for large maps
# Higher values = more aggressive simplification = less memory
SIMPLIFY_TOLERANCE_LARGE_MAPS = 10

# Output Settings
# ---------------

# Default DPI for PNG output
# Lower DPI = less memory, smaller files
DEFAULT_DPI = 300

# Maximum DPI allowed
MAX_DPI = 300

# Thumbnail size (pixels)
THUMBNAIL_SIZE = 1080

# Poster size options (width, height) in inches
# Format: "name": (width_inches, height_inches, description)
POSTER_SIZES = {
    "A4": (8.3, 11.7, "A4 - 21×30 cm"),
    "A3": (11.7, 16.5, "A3 - 30×42 cm"),
    "12x16": (12, 16, "12×16 inch - 30×41 cm"),
    "A2": (16.5, 23.4, "A2 - 42×59 cm"),
    "A1": (23.4, 33.1, "A1 - 59×84 cm"),
    "18x24": (18, 24, "18×24 inch - 46×61 cm"),
}

# Default poster size
DEFAULT_POSTER_SIZE = "A3"

# Server Resource Limits
# ----------------------

# These should match your docker-compose.yml settings
RECOMMENDED_MEMORY_GB = 6
RECOMMENDED_CPU_CORES = 2

# Task timeout (seconds)
# How long to wait before killing a stuck generation task
TASK_TIMEOUT = 600  # 10 minutes
