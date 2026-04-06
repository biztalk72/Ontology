# README.md

# Ontology Studio with Docker & Protege

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      ONTOLOGY STUDIO                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)       │  API (FastAPI)                    │
│  http://localhost:5173  │  http://localhost:8000            │
└─────────────────────────┴───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ┌─────────┐      ┌──────────┐      ┌──────────┐
   │ Fuseki  │      │ GraphDB  │      │ PostgreSQL│
   │ (RDF)   │      │ (Triple) │      │ (Metadata)│
   │ :3030   │      │ :7200    │      │ :5432     │
   └─────────┘      └──────────┘      └──────────┘
```

## Quick Start

### 1. Start Docker Containers

```bash
cd docker
./start.sh up
```

### 2. Initialize Ontology Database

```bash
./start.sh init-ontology
```

### 3. Start Frontend

```bash
cd ontology-studio
npm run dev
```

### 4. Access Services

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | UI Interface |
| API Server | http://localhost:8000 | Backend API |
| Fuseki | http://localhost:3030 | RDF Store (SPARQL) |
| GraphDB | http://localhost:7200 | Triple Store UI |
| Adminer | http://localhost:8080 | Database Management |
| Redis | localhost:6379 | Cache & Session |

## Protege Integration

### 1. Install Protege
- Download: https://protege.stanford.edu/products.php#desktop-protege
- Recommended: Protege 5.5+

### 2. Connect to Fuseki
1. Open Protege
2. File → Open URL
3. Enter: `http://localhost:3030/ontology/sparql`
4. Select "SPARQL Endpoint" as ontology source

### 3. Import Schema
```bash
# Upload schema to Fuseki
curl -X POST -H "Content-Type: text/turtle" \
    --data-binary "@ontology-schema.ttl" \
    "http://localhost:3030/ontology/data?default"
```

## API Endpoints

### Node Operations
- `GET /nodes` - Get all nodes
- `POST /nodes` - Create node
- `GET /node/{id}` - Get node details
- `DELETE /node/{id}` - Delete node

### Edge Operations
- `GET /edges` - Get all edges
- `POST /edges` - Create edge
- `DELETE /edge/{id}` - Delete edge

### Query
- `POST /query` - Execute SPARQL query
- `GET /ontology/export` - Export ontology

## Data Model

### Classes
- `onto:Node` - Base node class
- `onto:Context` - Context node (branch, category)
- `onto:Field` - Field node (SKU)
- `onto:Request` - Request node
- `onto:Output` - Output node
- `onto:Branch` - Retail store
- `onto:ProductCategory` - Product category
- `onto:SKU` - Stock keeping unit

### Properties
- `onto:nodeId`, `onto:nodeName`, `onto:nodeType`
- `onto:source`, `onto:target` (edges)
- `onto:sells`, `onto:contains`, `onto:manufacturedBy`

## Useful Commands

```bash
# View logs
./start.sh logs

# Check status
./start.sh status

# Restart containers
./start.sh restart

# Stop containers
./start.sh down
```

## Development

### API Server
```bash
cd docker/api
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```bash
cd ontology-studio
npm install
npm run dev
```

## Troubleshooting

### Port Conflicts
```bash
# Check running services
netstat -tulpn | grep LISTEN

# Kill process on port
lsof -ti:8000 | xargs kill -9
```

### Docker Issues
```bash
# View all logs
docker-compose logs

# Rebuild containers
docker-compose up -d --build

# Clean up
docker-compose down -v
```

## References
- Protege: https://protege.stanford.edu/
- RDFlib: https://rdflib.readthedocs.io/
- FastAPI: https://fastapi.tiangolo.com/
- Fuseki: https://jena.apache.org/documentation/fuseki2/
