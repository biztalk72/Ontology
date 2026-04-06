#!/usr/bin/env python3
"""
Excel to RDF Importer for Ontology Studio
Converts retail Excel data to RDF/OWL format
"""

import pandas as pd
from rdflib import Graph, Namespace, URIRef, Literal, RDF, RDFS, OWL
from rdflib.namespace import XSD
import sys

# Define namespaces
ONTO = Namespace("http://ontology.studio/ontology#")
DATA = Namespace("http://ontology.studio/data#")


def create_ontology_schema(g):
    """Create base ontology schema"""

    # Classes
    g.add((ONTO.Node, RDF.type, OWL.Class))
    g.add((ONTO.Node, RDFS.label, Literal("Node")))

    g.add((ONTO.Branch, RDF.type, OWL.Class))
    g.add((ONTO.Branch, RDFS.subClassOf, ONTO.Node))
    g.add((ONTO.Branch, RDFS.label, Literal("Branch")))

    g.add((ONTO.ProductCategory, RDF.type, OWL.Class))
    g.add((ONTO.ProductCategory, RDFS.subClassOf, ONTO.Node))
    g.add((ONTO.ProductCategory, RDFS.label, Literal("Product Category")))

    g.add((ONTO.SKU, RDF.type, OWL.Class))
    g.add((ONTO.SKU, RDFS.subClassOf, ONTO.Node))
    g.add((ONTO.SKU, RDFS.label, Literal("SKU")))

    # Properties
    g.add((ONTO.nodeId, RDF.type, OWL.DatatypeProperty))
    g.add((ONTO.nodeName, RDF.type, OWL.DatatypeProperty))
    g.add((ONTO.branchLocation, RDF.type, OWL.DatatypeProperty))
    g.add((ONTO.branchGrade, RDF.type, OWL.DatatypeProperty))
    g.add((ONTO.skuPrice, RDF.type, OWL.DatatypeProperty))
    g.add((ONTO.skuCost, RDF.type, OWL.DatatypeProperty))

    g.add((ONTO.sells, RDF.type, OWL.ObjectProperty))
    g.add((ONTO.sells, RDFS.label, Literal("sells")))


def import_branches(g, excel_file):
    """Import branch data"""
    df = pd.read_excel(excel_file, sheet_name="便利店 지점_마스터")

    for _, row in df.iterrows():
        branch_id = row["지점ID"]
        branch_uri = DATA[branch_id]

        g.add((branch_uri, RDF.type, ONTO.Branch))
        g.add((branch_uri, ONTO.nodeId, Literal(branch_id)))
        g.add((branch_uri, ONTO.nodeName, Literal(row["지점명"])))
        g.add((branch_uri, ONTO.branchLocation, Literal(row["지역"])))
        g.add((branch_uri, ONTO.branchGrade, Literal(row["등급"])))

        area_val = row["면적(㎡)"]
        try:
            area = float(str(area_val))
        except (ValueError, TypeError):
            area = 0.0
        g.add((branch_uri, ONTO.branchArea, Literal(area, datatype=XSD.double)))

        print(f"Added branch: {row['지점명']}")


def import_categories(g, excel_file):
    """Import category data"""
    df = pd.read_excel(excel_file, sheet_name="SKU_마스터")
    categories = df["대분류"].unique()

    for idx, category in enumerate(categories):
        cat_id = f"Category_{idx:03d}"
        cat_uri = DATA[cat_id]

        g.add((cat_uri, RDF.type, ONTO.ProductCategory))
        g.add((cat_uri, ONTO.nodeId, Literal(cat_id)))
        g.add((cat_uri, ONTO.nodeName, Literal(category)))

        print(f"Added category: {category}")


def import_skus(g, excel_file):
    """Import SKU data"""
    df = pd.read_excel(excel_file, sheet_name="SKU_마스터")

    for _, row in df.head(50).iterrows():
        sku_id = row["SKU_ID"]
        sku_uri = DATA[sku_id]

        g.add((sku_uri, RDF.type, ONTO.SKU))
        g.add((sku_uri, ONTO.nodeId, Literal(sku_id)))
        g.add((sku_uri, ONTO.nodeName, Literal(row["상품명"])))

        price_val = row["판매가(원)"]
        cost_val = row["원가(원)"]

        try:
            price = float(str(price_val))
        except (ValueError, TypeError):
            price = 0.0

        try:
            cost = float(str(cost_val))
        except (ValueError, TypeError):
            cost = 0.0

        g.add((sku_uri, ONTO.skuPrice, Literal(price, datatype=XSD.double)))
        g.add((sku_uri, ONTO.skuCost, Literal(cost, datatype=XSD.double)))

        print(f"Added SKU: {row['상품명']}")


def main():
    excel_file = "/Users/brian-work/Works/Ontology/base-data/retail_3yr_sales_data.xlsx"

    g = Graph()
    g.bind("onto", ONTO)
    g.bind("data", DATA)
    g.bind("rdf", RDF)
    g.bind("rdfs", RDFS)
    g.bind("owl", OWL)

    print("Creating ontology schema...")
    create_ontology_schema(g)

    print("\nImporting branches...")
    import_branches(g, excel_file)

    print("\nImporting categories...")
    import_categories(g, excel_file)

    print("\nImporting SKUs...")
    import_skus(g, excel_file)

    # Save to file
    output_file = "/Users/brian-work/Works/Ontology/docker/ontology-data.ttl"
    g.serialize(destination=output_file, format="turtle")

    print(f"\n✅ Ontology saved to: {output_file}")
    print(f"Total triples: {len(g)}")


if __name__ == "__main__":
    main()
