import { create } from 'zustand';
import type { Node, Edge, Connection, NodeChange, EdgeChange } from '@xyflow/react';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import type { OntologyNode, OntologyEdge } from '../data/ontology';
import { ontologyData as staticData } from '../data/ontology';

// API Base URL (from environment or default)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface OntologyStore {
  nodes: Node[];
  edges: Edge[];
  selectedNode: OntologyNode | null;
  isInfoPanelOpen: boolean;
  isChatPanelOpen: boolean;
  chatMessages: ChatMessage[];
  loading: boolean;
  error: string | null;
  
  // Node operations
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (node: OntologyNode | null) => void;
  toggleInfoPanel: () => void;
  toggleChatPanel: () => void;
  addChatMessage: (message: ChatMessage) => void;
  
  // API operations
  initializeData: () => Promise<void>;
  fetchNodes: () => Promise<void>;
  fetchEdges: () => Promise<void>;
  createNode: (node: OntologyNode) => Promise<void>;
  createEdge: (edge: OntologyEdge) => Promise<void>;
  deleteNode: (nodeId: string) => Promise<void>;
  deleteEdge: (edgeId: string) => Promise<void>;
  executeQuery: (sparql: string) => Promise<any>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  refinedPrompt?: string;
  inputData?: {
    field: string;
    data: string;
  };
  outputData?: {
    format: string;
    field: string;
    data: string;
    definition: string;
  };
}

// Helper function to convert API response to Flow nodes
const apiNodeToFlowNode = (apiNode: any): Node => {
  const colors: Record<string, string> = {
    field: '#58A6FF',
    context: '#7EE787',
    request: '#F78166',
    output: '#A371F7',
  };
  
  // Simple position calculation for demo
  const idx = Math.random() * 100;
  const position = {
    x: 100 + (idx % 10) * 200,
    y: 100 + Math.floor(idx / 10) * 150,
  };
  
  return {
    id: apiNode.id,
    type: 'ontologyNode',
    position,
    data: { 
      label: apiNode.name || apiNode.nodeName,
      ...apiNode,
      color: colors[apiNode.type] || '#58A6FF',
    },
  };
};

const apiEdgeToFlowEdge = (apiEdge: any): Edge => ({
  id: apiEdge.id,
  source: apiEdge.source,
  target: apiEdge.target,
  label: apiEdge.label,
  animated: true,
  style: { stroke: '#58A6FF', strokeWidth: 2 },
});

export const useOntologyStore = create<OntologyStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  isInfoPanelOpen: false,
  isChatPanelOpen: true,
  chatMessages: [
    {
      id: 'welcome',
      role: 'system',
      content: '안녕하세요! 온톨로지 스튜디오입니다. 노드에 대한 질문을 입력하거나 빠른 작업을 선택하세요.',
    },
  ],
  loading: false,
  error: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  onConnect: (connection) => {
    set({
      edges: addEdge(
        { 
          ...connection, 
          animated: true, 
          style: { stroke: '#58A6FF', strokeWidth: 2 },
        },
        get().edges
      ),
    });
  },
  
  selectNode: (node) => {
    set({ 
      selectedNode: node,
      isInfoPanelOpen: node !== null,
    });
  },
  
  toggleInfoPanel: () => set((state) => ({ isInfoPanelOpen: !state.isInfoPanelOpen })),
  toggleChatPanel: () => set((state) => ({ isChatPanelOpen: !state.isChatPanelOpen })),
  
  addChatMessage: (message) => set((state) => ({ 
    chatMessages: [...state.chatMessages, message] 
  })),

  // API Operations
  initializeData: async () => {
    set({ loading: true, error: null });
    try {
      // Try to fetch from API first
      const [nodesRes, edgesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/nodes`),
        fetch(`${API_BASE_URL}/edges`),
      ]);
      
      if (nodesRes.ok && edgesRes.ok) {
        const nodesData = await nodesRes.json();
        const edgesData = await edgesRes.json();
        
        const flowNodes = nodesData.nodes.map(apiNodeToFlowNode);
        const flowEdges = edgesData.edges.map(apiEdgeToFlowEdge);
        
        set({ nodes: flowNodes, edges: flowEdges, loading: false });
      } else {
        // Fallback to static data
        console.log("API unavailable, using static data");
        const flowNodes = staticData.nodes.map(n => {
          // Calculate position based on type and spread across canvas
          let x: number, y: number;
          const spreadX = 2000;  // Wide spread across X axis
          const spreadY = 1500;  // High spread across Y axis
          
          // Create scatter effect based on node type and index
          const typeIndex = staticData.nodes.filter(x => x.type === n.type).indexOf(n);
          
          switch (n.type) {
            case 'context':
              // Context nodes in top-left to middle area
              x = 100 + (typeIndex % 5) * 400 + Math.random() * 100;
              y = 100 + Math.floor(typeIndex / 5) * 250 + Math.random() * 50;
              break;
            case 'field':
              // Field nodes spread across center-right area
              x = 600 + (typeIndex % 8) * 300 + Math.random() * 100;
              y = 200 + Math.floor(typeIndex / 8) * 200 + Math.random() * 100;
              break;
            case 'request':
              // Request nodes in bottom-left area
              x = 150 + (typeIndex % 4) * 350 + Math.random() * 50;
              y = 1000 + Math.floor(typeIndex / 4) * 200 + Math.random() * 50;
              break;
            case 'output':
              // Output nodes in bottom-right area
              x = 800 + (typeIndex % 5) * 350 + Math.random() * 50;
              y = 900 + Math.floor(typeIndex / 5) * 200 + Math.random() * 50;
              break;
            default:
              x = Math.random() * spreadX;
              y = Math.random() * spreadY;
          }
          
          return {
            id: n.id,
            type: 'ontologyNode',
            position: { x, y },
            data: { 
              label: n.name,
              ...n,
              color: n.type === 'field' ? '#58A6FF' : n.type === 'context' ? '#7EE787' : n.type === 'request' ? '#F78166' : '#A371F7',
            },
          };
        });
        const flowEdges = staticData.edges.map(e => ({
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          animated: true,
          style: { stroke: '#58A6FF', strokeWidth: 2 },
        }));
        set({ nodes: flowNodes, edges: flowEdges, loading: false });
      }
    } catch (error) {
      console.log("API connection failed, using static data:", error);
      // Fallback to static data
      const flowNodes = staticData.nodes.map(n => ({
        id: n.id,
        type: 'ontologyNode',
        position: { x: Math.random() * 500, y: Math.random() * 500 },
        data: { 
          label: n.name,
          ...n,
          color: n.type === 'field' ? '#58A6FF' : n.type === 'context' ? '#7EE787' : n.type === 'request' ? '#F78166' : '#A371F7',
        },
      }));
      const flowEdges = staticData.edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: true,
        style: { stroke: '#58A6FF', strokeWidth: 2 },
      }));
      set({ nodes: flowNodes, edges: flowEdges, loading: false, error: null });
    }
  },

  fetchNodes: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/nodes`);
      if (res.ok) {
        const data = await res.json();
        const flowNodes = data.nodes.map(apiNodeToFlowNode);
        set({ nodes: flowNodes });
      }
    } catch (error) {
      console.error("Failed to fetch nodes:", error);
    }
  },

  fetchEdges: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/edges`);
      if (res.ok) {
        const data = await res.json();
        const flowEdges = data.edges.map(apiEdgeToFlowEdge);
        set({ edges: flowEdges });
      }
    } catch (error) {
      console.error("Failed to fetch edges:", error);
    }
  },

  createNode: async (node: OntologyNode) => {
    try {
      const res = await fetch(`${API_BASE_URL}/nodes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(node),
      });
      if (res.ok) {
        await get().fetchNodes();
      }
    } catch (error) {
      console.error("Failed to create node:", error);
    }
  },

  createEdge: async (edge: OntologyEdge) => {
    try {
      const res = await fetch(`${API_BASE_URL}/edges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edge),
      });
      if (res.ok) {
        await get().fetchEdges();
      }
    } catch (error) {
      console.error("Failed to create edge:", error);
    }
  },

  deleteNode: async (nodeId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/node/${nodeId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await get().fetchNodes();
      }
    } catch (error) {
      console.error("Failed to delete node:", error);
    }
  },

  deleteEdge: async (edgeId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/edge/${edgeId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await get().fetchEdges();
      }
    } catch (error) {
      console.error("Failed to delete edge:", error);
    }
  },

  executeQuery: async (sparql: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sparql, format: 'json' }),
      });
      return await res.json();
    } catch (error) {
      console.error("Failed to execute query:", error);
      return { results: [], error: String(error) };
    }
  },
}));
