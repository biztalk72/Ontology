import { useState, useRef, useEffect } from 'react';
import { Send, ChevronUp, ChevronDown, Sparkles, Lightbulb, GitBranch, FileOutput, Bot, User } from 'lucide-react';
import { useOntologyStore } from '../store/ontologyStore';
import type { ChatMessage } from '../store/ontologyStore';
import { ontologyData } from '../data/ontology';

const mockLLMResponse = (question: string, selectedNode: any): ChatMessage => {
  const refinedPrompt = `Extract ontology information for: "${question}" from ${selectedNode?.name || 'entire knowledge graph'}`;
  
  const sampleField = selectedNode?.type === 'field' ? selectedNode.name : 'user_id';
  const sampleContext = selectedNode?.contextId ? 
    ontologyData.nodes.find(n => n.id === selectedNode.contextId)?.name : 'User Authentication';
  
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: `온톨로지 분석 결과입니다. "${question}"에 대한 질문을 분석했어요.`,
    refinedPrompt,
    inputData: {
      field: sampleField,
      data: 'sample_value_123',
    },
    outputData: {
      format: 'JSON',
      field: 'ontology_response',
      data: JSON.stringify({
        concept: sampleField,
        context: sampleContext,
        relationships: ['has_property', 'belongs_to', 'validates'],
        semantic_type: 'identifier',
      }, null, 2),
      definition: `${sampleField}는 ${sampleContext} 맥락에서 사용되는 고유 식별자입니다.`,
    },
  };
};

export default function ChatPanel() {
  const { 
    isChatPanelOpen, 
    toggleChatPanel, 
    chatMessages, 
    addChatMessage, 
    selectedNode 
  } = useOntologyStore();
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    
    addChatMessage(userMessage);
    setInput('');
    setIsProcessing(true);
    
    setTimeout(() => {
      const response = mockLLMResponse(input, selectedNode);
      addChatMessage(response);
      setIsProcessing(false);
    }, 1000);
  };
  
  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      explain: selectedNode ? `Explain the node "${selectedNode.name}"` : 'Explain selected node',
      find: selectedNode ? `Find related fields to "${selectedNode.name}"` : 'Find related fields',
      flow: selectedNode ? `Show data flow for "${selectedNode.name}"` : 'Show data flow',
    };
    
    setInput(actions[action]);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: isChatPanelOpen ? '320px' : '40px',
      background: '#0D1117',
      borderTop: '1px solid #30363D',
      display: 'flex',
      flexDirection: 'column',
      transition: 'height 0.3s ease-out',
      zIndex: 100,
    }}>
      <button
        onClick={toggleChatPanel}
        style={{
          position: 'absolute',
          top: '-24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#21262D',
          border: '1px solid #30363D',
          borderBottom: 'none',
          borderRadius: '8px 8px 0 0',
          padding: '4px 16px',
          color: '#8B949E',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
        }}
      >
        <Bot size={14} />
        AI Assistant (하단)
        {isChatPanelOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
      
      {isChatPanelOpen && (
        <>
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid #21262D',
            display: 'flex',
            gap: '8px',
          }}>
            <button
              onClick={() => handleQuickAction('explain')}
              disabled={!selectedNode}
              style={{
                background: '#21262D',
                border: '1px solid #30363D',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11px',
                color: selectedNode ? '#58A6FF' : '#8B949E',
                cursor: selectedNode ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Lightbulb size={12} />
              Explain
            </button>
            <button
              onClick={() => handleQuickAction('find')}
              disabled={!selectedNode}
              style={{
                background: '#21262D',
                border: '1px solid #30363D',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11px',
                color: selectedNode ? '#7EE787' : '#8B949E',
                cursor: selectedNode ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <GitBranch size={12} />
              Related
            </button>
            <button
              onClick={() => handleQuickAction('flow')}
              disabled={!selectedNode}
              style={{
                background: '#21262D',
                border: '1px solid #30363D',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11px',
                color: selectedNode ? '#F78166' : '#8B949E',
                cursor: selectedNode ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <FileOutput size={12} />
              Flow
            </button>
          </div>
          
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '12px 16px',
          }}>
            {chatMessages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: '16px' }}>
                {msg.role === 'system' ? (
                  <div style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#8B949E',
                    padding: '8px',
                  }}>
                    {msg.content}
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}>
                      {msg.role === 'user' ? (
                        <User size={14} color="#58A6FF" />
                      ) : (
                        <Bot size={14} color="#7EE787" />
                      )}
                      <span style={{
                        fontSize: '11px',
                        color: '#8B949E',
                      }}>
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                      </span>
                    </div>
                    
                    <div style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      lineHeight: 1.5,
                      background: msg.role === 'user' ? '#58A6FF' : '#21262D',
                      color: '#F0F6FC',
                      border: msg.role === 'assistant' ? '1px solid #30363D' : 'none',
                    }}>
                      {msg.content}
                    </div>
                    
                    {msg.role === 'assistant' && msg.refinedPrompt && (
                      <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        background: '#161B22',
                        borderRadius: '8px',
                        border: '1px solid #30363D',
                        maxWidth: '90%',
                        fontSize: '12px',
                      }}>
                        <div style={{
                          color: '#8B949E',
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}>
                          <Sparkles size={12} color="#D29922" />
                          <span>Refined Prompt</span>
                        </div>
                        <div style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          color: '#C9D1D9',
                          fontSize: '11px',
                          padding: '8px',
                          background: '#0D1117',
                          borderRadius: '4px',
                          marginBottom: '12px',
                        }}>
                          {msg.refinedPrompt}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <div style={{ color: '#8B949E', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Input</div>
                            <div style={{ background: '#0D1117', padding: '8px', borderRadius: '4px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#58A6FF' }}>
                              <div>field: {msg.inputData?.field}</div>
                              <div>data: {msg.inputData?.data}</div>
                            </div>
                          </div>
                          <div>
                            <div style={{ color: '#8B949E', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Output</div>
                            <div style={{ background: '#0D1117', padding: '8px', borderRadius: '4px', fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: '#7EE787' }}>
                              <div>format: {msg.outputData?.format}</div>
                              <div>field: {msg.outputData?.field}</div>
                            </div>
                          </div>
                        </div>
                        {msg.outputData?.definition && (
                          <div style={{ marginTop: '12px', padding: '8px', background: '#0D1117', borderRadius: '4px' }}>
                            <div style={{ color: '#8B949E', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>Definition</div>
                            <div style={{ color: '#C9D1D9', fontSize: '12px' }}>{msg.outputData.definition}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B949E', fontSize: '12px' }}>
                <Bot size={14} color="#7EE787" />
                <span>Processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid #21262D',
            display: 'flex',
            gap: '12px',
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about ontology concepts..."
              style={{
                flex: 1,
                background: '#21262D',
                border: '1px solid #30363D',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#F0F6FC',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                background: input.trim() ? '#58A6FF' : '#21262D',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                color: input.trim() ? '#0D1117' : '#8B949E',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
