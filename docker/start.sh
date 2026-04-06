#!/bin/bash

# Docker Compose Management Script

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

case "$1" in
    up)
        echo -e "${GREEN}Starting Docker containers...${NC}"
        cd "$SCRIPT_DIR"
        docker-compose up -d
        echo -e "${GREEN}Docker containers started!${NC}"
        echo ""
        echo "Services:"
        echo "  - Fuseki (RDF Store): http://localhost:3030"
        echo "  - GraphDB: http://localhost:7200"
        echo "  - API Server: http://localhost:8000"
        echo "  - PostgreSQL: localhost:5432"
        echo "  - Redis: localhost:6379"
        echo "  - Frontend: http://localhost:5173"
        echo "  - Adminer: http://localhost:8080"
        ;;
    down)
        echo -e "${RED}Stopping Docker containers...${NC}"
        cd "$SCRIPT_DIR"
        docker-compose down
        echo -e "${RED}Docker containers stopped!${NC}"
        ;;
    restart)
        echo -e "${YELLOW}Restarting Docker containers...${NC}"
        cd "$SCRIPT_DIR"
        docker-compose restart
        echo -e "${GREEN}Docker containers restarted!${NC}"
        ;;
    logs)
        cd "$SCRIPT_DIR"
        docker-compose logs -f "$2"
        ;;
    status)
        cd "$SCRIPT_DIR"
        docker-compose ps
        ;;
    init-ontology)
        echo -e "${GREEN}Initializing ontology database...${NC}"
        # Upload ontology schema to Fuseki
        curl -X POST -H "Content-Type: text/turtle" \
            --data-binary "@$SCRIPT_DIR/ontology-schema.ttl" \
            "http://localhost:3030/ontology/data?default"
        echo -e "${GREEN}Ontology schema uploaded!${NC}"
        ;;
    *)
        echo "Usage: $0 {up|down|restart|logs|status|init-ontology}"
        echo ""
        echo "Commands:"
        echo "  up             - Start all containers"
        echo "  down           - Stop all containers"
        echo "  restart        - Restart all containers"
        echo "  logs [service] - Show logs (optional: specify service)"
        echo "  status         - Show container status"
        echo "  init-ontology  - Upload ontology schema to Fuseki"
        exit 1
        ;;
esac
