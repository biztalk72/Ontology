import { X, ArrowRight, ArrowLeft, Database, Zap } from 'lucide-react';
import { useOntologyStore } from '../store/ontologyStore';
import { ontologyData } from '../data/ontology';

export default function InfoPanel() {
  const { selectedNode, isInfoPanelOpen, selectNode } = useOntologyStore();
  
  if (!isInfoPanelOpen || !selectedNode) return null;
  
  const nodeTypeColors: Record<string, string> = {
    field: '#58A6FF',
    context: '#7EE787',
    request: '#F78166',
    output: '#A371F7',
  };
  
  const color = nodeTypeColors[selectedNode.type] || '#58A6FF';
  
  const incomingEdges = ontologyData.edges.filter(e => e.target === selectedNode.id);
  const outgoingEdges = ontologyData.edges.filter(e => e.source === selectedNode.id);
  
  const incomingNodes = incomingEdges.map(e => 
    ontologyData.nodes.find(n => n.id === e.source)
  ).filter(Boolean);
  
  const outgoingNodes = outgoingEdges.map(e => 
    ontologyData.nodes.find(n => n.id === e.target)
  ).filter(Boolean);
  
  const getContextName = (ctxId?: string) => {
    const ctx = ontologyData.nodes.find(n => n.id === ctxId);
    return ctx?.name || 'N/A';
  };
  
  const getRequestName = (reqId?: string) => {
    const req = ontologyData.nodes.find(n => n.id === reqId);
    return req?.name || 'N/A';
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '320px',
      height: '100%',
      background: '#161B22',
      borderLeft: '1px solid #30363D',
      boxShadow: '-8px 0 24px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #30363D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h2 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 600,
          color: '#F0F6FC',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: color,
          }} />
          Node Details
        </h2>
        <button
          onClick={() => selectNode(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#8B949E',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={20} />
        </button>
      </div>
      
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px',
      }}>
        <div style={{
          background: '#21262D',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#8B949E',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}>
            Name
          </div>
          <div style={{
            fontSize: '15px',
            fontWeight: 600,
            color: '#F0F6FC',
            fontFamily: '"JetBrains Mono", monospace',
            wordBreak: 'break-all',
          }}>
            {selectedNode.name}
          </div>
          
          {selectedNode.dataType && (
            <>
              <div style={{
                fontSize: '12px',
                color: '#8B949E',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '12px',
                marginBottom: '4px',
              }}>
                Data Type
              </div>
              <div style={{
                fontSize: '14px',
                color: '#58A6FF',
                fontFamily: '"JetBrains Mono", monospace',
              }}>
                {selectedNode.dataType}
              </div>
            </>
          )}
          
          <div style={{
            fontSize: '12px',
            color: '#8B949E',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginTop: '12px',
            marginBottom: '4px',
          }}>
            Description
          </div>
          <div style={{
            fontSize: '13px',
            color: '#C9D1D9',
            lineHeight: 1.5,
          }}>
            {selectedNode.description}
          </div>
        </div>
        
        {selectedNode.contextId && selectedNode.type === 'field' && (
          <div style={{
            background: '#21262D',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}>
            <div style={{
              fontSize: '12px',
              color: '#8B949E',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Database size={14} color="#7EE787" />
              Related Context
            </div>
            <div style={{
              fontSize: '13px',
              color: '#7EE787',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
              {getContextName(selectedNode.contextId)}
            </div>
          </div>
        )}
        
        {selectedNode.requestId && selectedNode.type === 'field' && (
          <div style={{
            background: '#21262D',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
          }}>
            <div style={{
              fontSize: '12px',
              color: '#8B949E',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Zap size={14} color="#F78166" />
              Related Request
            </div>
            <div style={{
              fontSize: '13px',
              color: '#F78166',
              fontFamily: '"JetBrains Mono", monospace',
            }}>
              {getRequestName(selectedNode.requestId)}
            </div>
          </div>
        )}
        
        <div style={{
          background: '#21262D',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#8B949E',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <ArrowLeft size={14} color="#58A6FF" />
            Input Connections ({incomingNodes.length})
          </div>
          {incomingNodes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {incomingNodes.map((node, idx) => (
                <div
                  key={`in-${idx}`}
                  onClick={() => selectNode(node!)}
                  style={{
                    fontSize: '12px',
                    color: nodeTypeColors[node!.type],
                    cursor: 'pointer',
                    padding: '6px 8px',
                    background: '#161B22',
                    borderRadius: '4px',
                    fontFamily: '"JetBrains Mono", monospace',
                    transition: 'background 0.2s',
                  }}
                >
                  {node!.name}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#8B949E', fontStyle: 'italic' }}>
              No input connections
            </div>
          )}
        </div>
        
        <div style={{
          background: '#21262D',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#8B949E',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <ArrowRight size={14} color="#A371F7" />
            Output Connections ({outgoingNodes.length})
          </div>
          {outgoingNodes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {outgoingNodes.map((node, idx) => (
                <div
                  key={`out-${idx}`}
                  onClick={() => selectNode(node!)}
                  style={{
                    fontSize: '12px',
                    color: nodeTypeColors[node!.type],
                    cursor: 'pointer',
                    padding: '6px 8px',
                    background: '#161B22',
                    borderRadius: '4px',
                    fontFamily: '"JetBrains Mono", monospace',
                    transition: 'background 0.2s',
                  }}
                >
                  {node!.name}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#8B949E', fontStyle: 'italic' }}>
              No output connections
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
