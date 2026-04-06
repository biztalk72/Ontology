import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

interface OntologyNodeData {
  label: string;
  color: string;
  description: string;
  dataType?: string;
  type?: string;
}

function OntologyNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as unknown as OntologyNodeData;
  const color = nodeData.color || '#58A6FF';
  
  return (
    <div
      style={{
        background: '#21262D',
        border: `2px solid ${selected ? color : '#30363D'}`,
        borderRadius: '8px',
        padding: '12px',
        minWidth: '160px',
        maxWidth: '200px',
        boxShadow: selected 
          ? `0 0 20px ${color}40` 
          : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.2s ease-out',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ 
          background: color, 
          width: 10, 
          height: 10,
          border: '2px solid #0D1117',
        }}
      />
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        marginBottom: '8px',
        borderBottom: '1px solid #30363D',
        paddingBottom: '8px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: color,
        }} />
        <span style={{
          fontSize: '10px',
          color: '#8B949E',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {data.type as string}
        </span>
      </div>
      
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: '#F0F6FC',
        marginBottom: '4px',
        fontFamily: '"JetBrains Mono", monospace',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {nodeData.label}
      </div>
      
      {nodeData.dataType && (
        <div style={{
          fontSize: '10px',
          color: '#8B949E',
          fontFamily: '"JetBrains Mono", monospace',
        }}>
          {nodeData.dataType}
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        style={{ 
          background: color, 
          width: 10, 
          height: 10,
          border: '2px solid #0D1117',
        }}
      />
    </div>
  );
}

export default memo(OntologyNodeComponent);
