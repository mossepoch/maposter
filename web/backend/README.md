# Maposter Backend

FastAPI backend for map poster generation.

## Development

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Visit http://localhost:8000/docs for API documentation.

## API Endpoints

- `GET /health` - Health check
- `POST /generate` - Generate map poster
- `GET /themes` - List available themes
- `GET /docs` - OpenAPI documentation

## Docker

Built and deployed via main `docker-compose.yml`.

See [web README](../README.md) for deployment instructions.
