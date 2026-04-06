import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react';
import type { FitViewOptions } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useOntologyStore } from '../store/ontologyStore';
import type { OntologyNode } from '../data/ontology';
import OntologyNodeComponent from './OntologyNode';

const nodeTypes = {
  ontologyNode: OntologyNodeComponent,
};

export default function Canvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    initializeData,
  } = useOntologyStore();
  
  const { fitView } = useReactFlow();
  
  useEffect(() => {
    initializeData();
  }, [initializeData]);
  
  useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 500 } as FitViewOptions);
    }, 100);
  }, [nodes.length]);
  
  const handleNodeClick = useCallback((_: React.MouseEvent, node: any) => {
    selectNode(node.data as OntologyNode);
  }, [selectNode]);
  
  const handlePaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#58A6FF', strokeWidth: 2 },
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#30363D"
        />
        <Controls
          style={{
            background: '#21262D',
            borderRadius: '8px',
            border: '1px solid #30363D',
          }}
        />
        <MiniMap
          nodeColor={(node) => {
            const colors: Record<string, string> = {
              field: '#58A6FF',
              context: '#7EE787',
              request: '#F78166',
              output: '#A371F7',
            };
            return colors[node.data?.type as string] || '#58A6FF';
          }}
          maskColor="rgba(13, 17, 23, 0.8)"
          style={{
            background: '#161B22',
            borderRadius: '8px',
            border: '1px solid #30363D',
          }}
        />
      </ReactFlow>
    </div>
  );
}
