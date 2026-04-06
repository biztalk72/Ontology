import { useState, useRef, useEffect } from 'react';
import { Send, Code, Type as TypeIcon, X, Zap } from 'lucide-react';
import { useOntologyStore } from '../store/ontologyStore';
import type { ChatMessage } from '../store/ontologyStore';

interface HistoryItem {
  id: string;
  text: string;
  json: string;
  timestamp: Date;
}

export default function ControlChat() {
  const { 
    isChatPanelOpen, 
    chatMessages, 
    addChatMessage, 
    selectedNode,
    selectNode,
    nodes,
    onNodesChange,
    onEdgesChange,
  } = useOntologyStore();
  
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyFormat, setHistoryFormat] = useState<'text' | 'json'>('text');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    const command = parseCommand(input);
    
    // Process command
    if (command.type === 'connect') {
      createConnection(command.source!, command.target!);
    } else if (command.type === 'highlight') {
      highlightNode(command.nodeId!);
    } else if (command.type === 'disconnect') {
      deleteConnection(command.edgeId!);
    }
    
    // Add to history
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      text: input,
      json: JSON.stringify({
        type: command.type,
        data: command,
        timestamp: new Date().toISOString()
      }, null, 2),
      timestamp: new Date(),
    };
    setHistory(prev => [...prev, historyItem]);
    
    // Add to chat
    const msg: ChatMessage = {
      id: Date.now().toString(),
      role: 'system',
      content: `Command executed: ${command.type}`,
    };
    addChatMessage(msg);
    
    setInput('');
  };
  
  const parseCommand = (text: string) => {
    const connectMatch = text.match(/connect\s+(\S+)\s+to\s+(\S+)/i);
    if (connectMatch) {
      return {
        type: 'connect',
        source: connectMatch[1],
        target: connectMatch[2],
      };
    }
    
    const highlightMatch = text.match(/highlight\s+(\S+)/i);
    if (highlightMatch) {
      return {
        type: 'highlight',
        nodeId: highlightMatch[1],
      };
    }
    
    const disconnectMatch = text.match(/disconnect\s+(\S+)/i);
    if (disconnectMatch) {
      return {
        type: 'disconnect',
        edgeId: disconnectMatch[1],
      };
    }
    
    if (selectedNode) {
      return { type: 'highlight', nodeId: selectedNode.id };
    }
    
    return { type: 'unknown', input: text };
  };
  
  const createConnection = (sourceId: string, targetId: string) => {
    const sourceNode = nodes.find(n => n.id === sourceId || n.data?.name === sourceId);
    const targetNode = nodes.find(n => n.id === targetId || n.data?.name === targetId);
    
    if (sourceNode && targetNode) {
      const newEdge = {
        id: `edge-${Date.now()}`,
        source: sourceNode.id,
        target: targetNode.id,
        label: 'manual_connection',
        animated: true,
      };
      onEdgesChange([{ type: 'add', item: newEdge }]);
    }
  };
  
  const deleteConnection = (edgeId: string) => {
    onEdgesChange([{ type: 'remove', id: edgeId }]);
  };
  
  const highlightNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      selectNode(node.data as any);
      onNodesChange([{
        type: 'select',
        id: nodeId,
        selected: true,
      }]);
    }
  };
  
  const editHistoryItem = (id: string) => {
    const item = history.find(h => h.id === id);
    if (item) {
      setInput(item.text);
      setEditingId(id);
    }
  };
  
  const updateHistoryItem = (id: string, newText: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id 
        ? { ...item, text: newText, json: JSON.stringify({ question: newText }, null, 2) }
        : item
    ));
    setEditingId(null);
    setInput('');
  };
  
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: isChatPanelOpen ? '340px' : '20px',
      width: '300px',
      height: '400px',
      background: '#161B22',
      border: '1px solid #30363D',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      transition: 'right 0.3s ease-out',
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #30363D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} color="#F78166" />
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#F0F6FC' }}>QUESTION</span>
        </div>
        <button
          onClick={() => {}}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#8B949E',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={16} />
        </button>
      </div>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Chat messages */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
          borderBottom: '1px solid #21262D',
        }}>
          {chatMessages.filter(m => m.role !== 'user').slice(-3).map((msg) => (
            <div key={msg.id} style={{ marginBottom: '8px', fontSize: '11px', color: '#C9D1D9' }}>
              <span style={{ color: '#8B949E', fontSize: '10px' }}>{msg.role}</span>: {msg.content}
            </div>
          ))}
        </div>
        
        {/* History */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
          }}>
            <span style={{ fontSize: '10px', color: '#8B949E' }}>History</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setHistoryFormat('text')}
                style={{
                  background: historyFormat === 'text' ? '#30363D' : 'transparent',
                  border: '1px solid #30363D',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  color: '#8B949E',
                  cursor: 'pointer',
                }}
              >
                <TypeIcon size={10} />
              </button>
              <button
                onClick={() => setHistoryFormat('json')}
                style={{
                  background: historyFormat === 'json' ? '#30363D' : 'transparent',
                  border: '1px solid #30363D',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  color: '#8B949E',
                  cursor: 'pointer',
                }}
              >
                <Code size={10} />
              </button>
            </div>
          </div>
          
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => editHistoryItem(item.id)}
              style={{
                padding: '6px 8px',
                background: editingId === item.id ? '#30363D' : '#21262D',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '10px',
                color: '#C9D1D9',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {historyFormat === 'text' ? item.text : item.json}
              {editingId === item.id && (
                <input
                  type="text"
                  defaultValue={item.text}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') updateHistoryItem(item.id, e.currentTarget.value);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  autoFocus
                  style={{
                    width: '100%',
                    marginTop: '4px',
                    background: '#0D1117',
                    border: '1px solid #58A6FF',
                    borderRadius: '4px',
                    padding: '2px 4px',
                    fontSize: '10px',
                    color: '#F0F6FC',
                  }}
                />
              )}
            </div>
          ))}
          
          {history.length === 0 && (
            <div style={{ fontSize: '10px', color: '#8B949E', textAlign: 'center', padding: '10px' }}>
              No history
            </div>
          )}
        </div>
      </div>
      
      <div style={{
        padding: '10px',
        borderTop: '1px solid #21262D',
        display: 'flex',
        gap: '8px',
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="connect <node> to <node>..."
          style={{
            flex: 1,
            background: '#21262D',
            border: '1px solid #30363D',
            borderRadius: '4px',
            padding: '6px 10px',
            fontSize: '11px',
            color: '#F0F6FC',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            background: input.trim() ? '#58A6FF' : '#21262D',
            border: 'none',
            borderRadius: '4px',
            padding: '6px 10px',
            color: input.trim() ? '#0D1117' : '#8B949E',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            fontSize: '11px',
          }}
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  );
}
