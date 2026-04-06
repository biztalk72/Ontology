from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import json

# RDF/OWL imports
from rdflib import Graph, Namespace, URIRef, Literal, RDF, RDFS, OWL
from rdflib.plugins.stores.sparqlstore import SPARQLStore

app = FastAPI(title="Ontology API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ontology Namespaces
ONTO = Namespace("http://ontology.studio/ontology#")
DATA = Namespace("http://ontology.studio/data#")
RDFS = Namespace("http://www.w3.org/2000/01/rdf-schema#")
OWL = Namespace("http://www.w3.org/2002/07/owl#")


# Models
class NodeRequest(BaseModel):
    id: str
    name: str
    type: str
    description: str
    properties: Optional[Dict[str, Any]] = None


class EdgeRequest(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None


class OntologyQuery(BaseModel):
    sparql: str
    format: str = "json"


# RDF Store connection (Fuseki)
rdf_store = SPARQLStore("http://fuseki:3030/ontology/sparql")


@app.get("/")
async def root():
    return {"message": "Ontology API Server", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/nodes")
async def get_nodes():
    """Get all ontology nodes"""
    try:
        g = Graph()
        g.store = rdf_store

        query = """
        PREFIX onto: <http://ontology.studio/ontology#>
        PREFIX data: <http://ontology.studio/data#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        
        SELECT ?id ?name ?type ?description ?properties
        WHERE {
            ?node a onto:Node ;
                  onto:nodeId ?id ;
                  onto:nodeName ?name ;
                  onto:nodeType ?type ;
                  rdfs:comment ?description .
            OPTIONAL { ?node onto:properties ?properties }
        }
        """

        results = g.query(query)
        nodes = []
        for row in results:
            nodes.append(
                {
                    "id": str(row.id),
                    "name": str(row.name),
                    "type": str(row.type),
                    "description": str(row.description),
                    "properties": json.loads(str(row.properties))
                    if row.properties
                    else {},
                }
            )

        return {"nodes": nodes}
    except Exception as e:
        return {"nodes": [], "error": str(e)}


@app.get("/edges")
async def get_edges():
    """Get all ontology edges"""
    try:
        g = Graph()
        g.store = rdf_store

        query = """
        PREFIX onto: <http://ontology.studio/ontology#>
        PREFIX data: <http://ontology.studio/data#>
        
        SELECT ?id ?source ?target ?label
        WHERE {
            ?edge a onto:Edge ;
                  onto:edgeId ?id ;
                  onto:source ?source ;
                  onto:target ?target .
            OPTIONAL { ?edge onto:label ?label }
        }
        """

        results = g.query(query)
        edges = []
        for row in results:
            edges.append(
                {
                    "id": str(row.id),
                    "source": str(row.source),
                    "target": str(row.target),
                    "label": str(row.label) if row.label else "",
                }
            )

        return {"edges": edges}
    except Exception as e:
        return {"edges": [], "error": str(e)}


@app.post("/nodes")
async def create_node(node: NodeRequest):
    """Create a new ontology node"""
    try:
        g = Graph()
        g.store = rdf_store

        node_uri = DATA[node.id]

        g.add((node_uri, RDF.type, ONTO.Node))
        g.add((node_uri, ONTO.nodeId, Literal(node.id)))
        g.add((node_uri, ONTO.nodeName, Literal(node.name)))
        g.add((node_uri, ONTO.nodeType, Literal(node.type)))
        g.add((node_uri, RDFS.comment, Literal(node.description)))

        if node.properties:
            g.add((node_uri, ONTO.properties, Literal(json.dumps(node.properties))))

        return {"success": True, "node": node.dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/edges")
async def create_edge(edge: EdgeRequest):
    """Create a new ontology edge"""
    try:
        g = Graph()
        g.store = rdf_store

        edge_uri = DATA[edge.id]

        g.add((edge_uri, RDF.type, ONTO.Edge))
        g.add((edge_uri, ONTO.edgeId, Literal(edge.id)))
        g.add((edge_uri, ONTO.source, Literal(edge.source)))
        g.add((edge_uri, ONTO.target, Literal(edge.target)))

        if edge.label:
            g.add((edge_uri, ONTO.label, Literal(edge.label)))

        return {"success": True, "edge": edge.dict()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/query")
async def execute_sparql(query: OntologyQuery):
    """Execute SPARQL query"""
    try:
        g = Graph()
        g.store = rdf_store

        results = g.query(query.sparql)

        if query.format == "json":
            # Convert results to JSON
            output = []
            for row in results:
                output.append({str(var): str(row[var]) for var in results.vars})
            return {"results": output}
        else:
            return {"results": str(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SPARQL Query Error: {str(e)}")


@app.get("/ontology/export")
async def export_ontology(format: str = "ttl"):
    """Export ontology in specified format"""
    try:
        g = Graph()
        g.store = rdf_store

        # Get all triples
        query = "CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o }"
        results = g.query(query)

        if format == "ttl":
            return {"format": "turtle", "data": results.serialize(format="turtle")}
        elif format == "xml":
            return {"format": "rdf+xml", "data": results.serialize(format="xml")}
        elif format == "jsonld":
            return {"format": "json-ld", "data": results.serialize(format="json-ld")}
        else:
            raise ValueError(f"Unsupported format: {format}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/node/{node_id}")
async def get_node_details(node_id: str):
    """Get node details including connections"""
    try:
        g = Graph()
        g.store = rdf_store

        # Get node info
        query = f"""
        PREFIX onto: <http://ontology.studio/ontology#>
        PREFIX data: <http://ontology.studio/data#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        
        SELECT ?name ?type ?description
        WHERE {{
            data:{node_id} onto:nodeName ?name ;
                           onto:nodeType ?type ;
                           rdfs:comment ?description .
        }}
        """

        results = g.query(query)
        node_info = None
        for row in results:
            node_info = {
                "id": node_id,
                "name": str(row.name),
                "type": str(row.type),
                "description": str(row.description),
            }

        if not node_info:
            raise HTTPException(status_code=404, detail="Node not found")

        # Get incoming connections
        incoming_query = f"""
        PREFIX onto: <http://ontology.studio/ontology#>
        PREFIX data: <http://ontology.studio/data#>
        
        SELECT ?edgeId ?source ?label
        WHERE {{
            ?edge onto:target "data:{node_id}" ;
                  onto:edgeId ?edgeId ;
                  onto:source ?source .
            OPTIONAL {{ ?edge onto:label ?label }}
        }}
        """

        incoming = []
        for row in g.query(incoming_query):
            incoming.append(
                {
                    "edgeId": str(row.edgeId),
                    "source": str(row.source),
                    "label": str(row.label) if row.label else "",
                }
            )

        # Get outgoing connections
        outgoing_query = f"""
        PREFIX onto: <http://ontology.studio/ontology#>
        PREFIX data: <http://ontology.studio/data#>
        
        SELECT ?edgeId ?target ?label
        WHERE {{
            ?edge onto:source "data:{node_id}" ;
                  onto:edgeId ?edgeId ;
                  onto:target ?target .
            OPTIONAL {{ ?edge onto:label ?label }}
        }}
        """

        outgoing = []
        for row in g.query(outgoing_query):
            outgoing.append(
                {
                    "edgeId": str(row.edgeId),
                    "target": str(row.target),
                    "label": str(row.label) if row.label else "",
                }
            )

        return {**node_info, "incoming": incoming, "outgoing": outgoing}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/node/{node_id}")
async def delete_node(node_id: str):
    """Delete a node and its connections"""
    try:
        g = Graph()
        g.store = rdf_store

        # Remove node and all related triples
        node_uri = DATA[node_id]
        g.remove((node_uri, None, None))
        g.remove((None, None, node_uri))

        return {"success": True, "node_id": node_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/edge/{edge_id}")
async def delete_edge(edge_id: str):
    """Delete an edge"""
    try:
        g = Graph()
        g.store = rdf_store

        edge_uri = DATA[edge_id]
        g.remove((edge_uri, None, None))

        return {"success": True, "edge_id": edge_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
