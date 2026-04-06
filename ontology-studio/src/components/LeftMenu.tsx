import { useState } from 'react';
import { ChevronDown, ChevronRight, Database, Zap, FileText, Box, Layers, Map, Download } from 'lucide-react';
import { useOntologyStore } from '../store/ontologyStore';
import { ontologyData } from '../data/ontology';

export default function LeftMenu() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    fields: true,
    contexts: true,
    requests: true,
    views: true,
  });
  
  const { selectNode, nodes } = useOntologyStore();
  
  const fields = ontologyData.nodes.filter(n => n.type === 'field');
  const contexts = ontologyData.nodes.filter(n => n.type === 'context');
  const requests = ontologyData.nodes.filter(n => n.type === 'request');
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      selectNode(node.data as any);
    }
  };
  
  const renderNodeList = (items: typeof ontologyData.nodes, _type: string) => {
    const colors: Record<string, string> = {
      field: '#58A6FF',
      context: '#7EE787',
      request: '#F78166',
    };
    
    return items.slice(0, 10).map((item) => (
      <div
        key={item.id}
        onClick={() => handleNodeClick(item.id)}
        style={{
          padding: '8px 12px',
          fontSize: '12px',
          color: '#C9D1D9',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = '#21262D'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: colors[item.type] || '#58A6FF',
        }} />
        <span style={{ fontFamily: '"JetBrains Mono", monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.name}
        </span>
      </div>
    ));
  };
  
  const MenuSection = ({ 
    id, 
    icon, 
    title, 
    count, 
    children 
  }: { 
    id: string; 
    icon: React.ReactNode; 
    title: string; 
    count: number;
    children: React.ReactNode; 
  }) => (
    <div style={{ borderBottom: '1px solid #21262D' }}>
      <button
        onClick={() => toggleSection(id)}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'transparent',
          border: 'none',
          color: '#F0F6FC',
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {icon}
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            color: '#8B949E',
            background: '#21262D',
            padding: '2px 6px',
            borderRadius: '10px',
          }}>
            {count}
          </span>
          {expandedSections[id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </div>
      </button>
      {expandedSections[id] && (
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          {children}
          {count > 10 && (
            <div style={{
              padding: '8px 12px',
              fontSize: '11px',
              color: '#8B949E',
              fontStyle: 'italic',
            }}>
              +{count - 10} more...
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  return (
    <div style={{
      width: '240px',
      height: '100%',
      background: '#161B22',
      borderRight: '1px solid #30363D',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid #30363D',
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#F0F6FC',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <Box size={24} color="#58A6FF" />
          <span>Ontology</span>
        </div>
        <div style={{
          fontSize: '11px',
          color: '#8B949E',
          marginTop: '4px',
        }}>
          Concept Visualization Studio
        </div>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto' }}>
        <MenuSection
          id="fields"
          icon={<FileText size={16} color="#58A6FF" />}
          title="Fields"
          count={fields.length}
        >
          {renderNodeList(fields, 'field')}
        </MenuSection>
        
        <MenuSection
          id="contexts"
          icon={<Database size={16} color="#7EE787" />}
          title="Contexts"
          count={contexts.length}
        >
          {renderNodeList(contexts, 'context')}
        </MenuSection>
        
        <MenuSection
          id="requests"
          icon={<Zap size={16} color="#F78166" />}
          title="Requests"
          count={requests.length}
        >
          {renderNodeList(requests, 'request')}
        </MenuSection>
        
        <MenuSection
          id="views"
          icon={<Layers size={16} color="#A371F7" />}
          title="Views"
          count={4}
        >
          <div style={{ padding: '8px 12px', fontSize: '12px', color: '#C9D1D9', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Map size={14} color="#8B949E" />
            Mini-map
          </div>
          <div style={{ padding: '8px 12px', fontSize: '12px', color: '#C9D1D9', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Layers size={14} color="#8B949E" />
            Layers
          </div>
          <div style={{ padding: '8px 12px', fontSize: '12px', color: '#C9D1D9', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Download size={14} color="#8B949E" />
            Export JSON
          </div>
        </MenuSection>
      </div>
      
      <div style={{
        padding: '16px',
        borderTop: '1px solid #30363D',
        fontSize: '11px',
        color: '#8B949E',
      }}>
        <div>Total Nodes: {ontologyData.nodes.length}</div>
        <div>Total Connections: {ontologyData.edges.length}</div>
      </div>
    </div>
  );
}
