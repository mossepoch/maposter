"""
Example configuration file for map poster generation backend.

Copy this file to config.py and adjust settings based on your server capacity:
    cp config.example.py config.py

Then edit config.py to match your server's resources.
"""

# Memory Management Settings
# ---------------------------

# Maximum allowed distance for map generation (meters)
# Adjust based on your server's RAM:
#   - 4GB RAM: MAX_DISTANCE = 25000
#   - 6GB RAM: MAX_DISTANCE = 35000 (default)
#   - 8GB+ RAM: MAX_DISTANCE = 40000
MAX_DISTANCE = 35000

# Distance threshold for applying memory optimizations (meters)
# Above this threshold, aggressive simplification is applied
# Recommended: Keep at 20000 for all configurations
MEMORY_OPTIMIZATION_THRESHOLD = 20000

# Distance threshold for warning users (meters)
# Users will see a warning if distance exceeds this
# Recommended: Set 5000m below MAX_DISTANCE
WARNING_THRESHOLD = 25000

# Distance recommendations for different city types
DISTANCE_RECOMMENDATIONS = {
    "small_dense": (4000, 6000),      # Venice, Amsterdam center
    "medium": (8000, 15000),           # Paris, Barcelona
    "large_metro": (15000, 25000),     # Tokyo, Mumbai
    "very_large": (25000, 35000)       # Maximum range
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
# Recommended: 300 for high quality, 200 for lower memory
DEFAULT_DPI = 300

# Maximum DPI allowed
MAX_DPI = 300

# Thumbnail size (pixels)
THUMBNAIL_SIZE = 1080

# Server Resource Limits
# ----------------------

# These should match your docker-compose.yml settings
RECOMMENDED_MEMORY_GB = 6
RECOMMENDED_CPU_CORES = 2

# Task timeout (seconds)
# How long to wait before killing a stuck generation task
TASK_TIMEOUT = 600  # 10 minutes

# Production Environment Settings
# --------------------------------

# Enable these in production for better stability

# Maximum concurrent generation tasks
# Set based on: (Total RAM - OS overhead) / Average task memory
# Example: (6GB - 2GB) / 2GB = 2 concurrent tasks
MAX_CONCURRENT_TASKS = 2

# Rate limiting (requests per minute)
RATE_LIMIT_PER_MINUTE = 10

# Enable garbage collection after each task
FORCE_GC_AFTER_TASK = True
