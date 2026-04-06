import { ontologyData as realOntologyData } from './realOntology';

export type NodeType = 'field' | 'context' | 'request' | 'output';

export interface OntologyNode {
  id: string;
  type: NodeType;
  name: string;
  description: string;
  dataType?: string;
  contextId?: string;
  requestId?: string;
  location?: string;
  grade?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  price?: number;
  cost?: number;
  category_type?: string;
}

export interface OntologyEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

// Export real ontology data from Excel
export const ontologyData = realOntologyData;
