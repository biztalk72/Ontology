# scripts

# Run API server locally
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Run SPARQL queries
python scripts/query.py

# Import Excel to RDF
python scripts/import_excel.py
