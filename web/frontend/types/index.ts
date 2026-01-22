export interface Theme {
  name: string;
  display_name: string;
  description: string;
  colors: {
    bg: string;
    text: string;
    accent: string;
  };
}

export interface CityGalleryItem {
  city: string;
  country: string;
  slug: string;
  preview_image: string;
  theme_count: number;
  created_at: string;
}

export interface PosterItem {
  theme: string;
  theme_display_name: string;
  poster_url: string;
  thumbnail_url: string | null;
  file_size: number;
  format: string;
  created_at: string;
  poster_size?: string | null;
  size_label?: string | null;
}

export interface CityDetail {
  city: string;
  slug: string;
  posters: PosterItem[];
}

export interface TaskResponse {
  task_id: string;
  status: string;
  message?: string;
}

export interface TaskStatusResponse {
  task_id: string;
  status: string;
  progress: number;
  result?: {
    poster_url: string;
    thumbnail_url: string | null;
    city: string;
    country: string;
    theme: string;
    coords: [number, number];
    created_at: string;
  };
  error?: string;
}

export interface GenerateRequest {
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  theme: string;
  distance: number;
  network_type: string;
  format: string;
  thumbnail: boolean;
  hide_attribution: boolean;
}
