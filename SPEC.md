# Ontology Concept Visualization MVP

## Project Overview
- **Project Name**: Ontology Studio
- **Type**: Web Application (React + TypeScript)
- **Core Functionality**: Interactive node-based visualization of ontology concepts with 100 virtual data fields, showing connections between fields, contexts, and requests
- **Target Users**: Data architects, ontology engineers, and knowledge graph developers

## UI/UX Specification

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        HEADER (60px)                           │
├────────┬────────────────────────────────────────┬──────────────┤
│        │                                        │              │
│  LEFT  │         MAIN CANVAS                    │   INFO       │
│  MENU  │      (Zoomable/Movable)                │   PANEL      │
│ (240px)│                                        │  (320px)     │
│        │      ┌─────┐      ┌─────┐               │   (optional) │
│        │      │Node │──────│Node │               │              │
│        │      └─────┘      └─────┘               │              │
│        │                                        │              │
├────────┴────────────────────────────────────────┴──────────────┤
│                    CHATBOT PANEL (320px height)               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Chat messages area                                      │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │ Input field                              [Send]  │    │  │
│  │  └─────────────────────────────────────────────────┘    │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- Desktop: >= 1200px (full layout)
- Tablet: 768px - 1199px (collapsible left menu)
- Mobile: < 768px (stacked layout, simplified)

### Visual Design

#### Color Palette
- **Background Dark**: #0D1117
- **Background Medium**: #161B22
- **Background Light**: #21262D
- **Surface**: #30363D
- **Primary**: #58A6FF (bright blue)
- **Secondary**: #7EE787 (green)
- **Accent**: #F78166 (orange)
- **Warning**: #D29922 (yellow)
- **Text Primary**: #F0F6FC
- **Text Secondary**: #8B949E
- **Border**: #30363D

#### Node Type Colors
- **Field Node**: #58A6FF (blue)
- **Context Node**: #7EE787 (green)
- **Request Node**: #F78166 (orange)
- **Output Node**: #A371F7 (purple)

#### Typography
- **Font Family**: "JetBrains Mono", "Fira Code", monospace
- **Heading 1**: 24px, weight 600
- **Heading 2**: 18px, weight 600
- **Body**: 14px, weight 400
- **Small**: 12px, weight 400
- **Code**: 13px, JetBrains Mono

#### Spacing System
- Base unit: 4px
- XS: 4px, SM: 8px, MD: 16px, LG: 24px, XL: 32px

#### Visual Effects
- Node shadows: 0 4px 12px rgba(0,0,0,0.4)
- Panel shadows: 0 8px 24px rgba(0,0,0,0.5)
- Border radius: 8px (panels), 6px (nodes), 4px (buttons)
- Transitions: 200ms ease-out
- Connection lines: animated dashed stroke

### Components

#### 1. Left Menu (Sidebar)
- Logo/Title area
- Menu sections:
  - **Fields** (collapsible, shows field count)
  - **Contexts** (collapsible)
  - **Requests** (collapsible)
  - **Views**: Mini-map, Layers, Export
- Each item clickable to highlight on canvas

#### 2. Main Canvas
- React Flow based node canvas
- Zoom: 25% - 200% (scroll wheel)
- Pan: Click and drag on empty space
- Minimap in bottom-right corner
- Grid background with dot pattern

#### 3. Nodes
- Size: 180px x auto (min 80px height)
- Header with icon and type label
- Body with name/description
- Connection handles:
  - Top: Input
  - Bottom: Output
  - Left/Right: Bidirectional
- States:
  - Default: solid background
  - Hover: glow effect
  - Selected: bright border + glow
  - Disabled: 50% opacity

#### 4. Info Panel (Right)
- Shows when node is selected
- Sections:
  - Node Details (name, type, description)
  - Input Connections (from which nodes)
  - Output Connections (to which nodes)
  - Linked Fields
  - Linked Functions
- Close button (X)

#### 5. Chatbot Panel (Bottom)
- Collapsible (click to expand/collapse)
- Message area with:
  - User messages (right-aligned, blue bg)
  - Bot messages (left-aligned, dark bg)
  - System messages (center, muted)
- Input field with send button
- Quick action buttons:
  - "Explain selected node"
  - "Find related fields"
  - "Show data flow"
- LLM Response display:
  - Original question
  - Refined prompt
  - Input (field, data)
  - Output (format, field, data, definition)

## Functionality Specification

### Core Features

#### 1. Ontology Data Generation
- Generate 100 virtual fields with:
  - Field name (e.g., "user_id", "product_name")
  - Field type (string, number, date, boolean, etc.)
  - Description
  - Associated context
  - Associated request
- Generate 20 contexts
- Generate 20 requests
- Create connections between them

#### 2. Node Visualization
- Display all entities as nodes on canvas
- Color-code by type (field/context/request/output)
- Show connection lines between related nodes
- Animate connections for data flow direction

#### 3. Interactive Connections
- Click and drag from handle to create new connection
- Click connection to delete
- Visual feedback during connection

#### 4. Node Interaction
- Click node to select and show info panel
- Double-click to focus/center on node
- Drag to reposition
- Multi-select with Shift+click

#### 5. Canvas Controls
- Zoom in/out buttons
- Fit to view button
- Minimap toggle
- Grid toggle

#### 6. Chatbot Integration
- Accept natural language questions
- Use LLM API to process questions
- Display:
  - Refined prompt
  - Input: field name, sample data
  - Output: format, field name, data, definition
- Mock LLM responses for demo (simulated)

### User Interactions and Flows

1. **View Ontology**: Load page → see all nodes → zoom/pan to explore
2. **Select Node**: Click node → info panel appears → see connections
3. **Modify Connection**: Click handle → drag to target → connection created
4. **Ask Question**: Type in chatbot → get refined response → see data flow

### Data Handling
- All data stored in-memory (no backend)
- State management via React Context
- Local storage for user preferences (zoom level, panel states)

### Edge Cases
- Empty search results → show "No results" message
- LLM API failure → show error with retry option
- Too many nodes → virtualized rendering
- Mobile view → simplified single-panel layout

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with specified color palette applied
- [ ] Left menu visible with all sections
- [ ] Canvas shows 100+ nodes without lag
- [ ] Nodes have correct colors by type
- [ ] Connection lines are visible and animated
- [ ] Info panel appears on node click
- [ ] Chatbot panel at bottom is functional
- [ ] Zoom and pan work smoothly

### Functional Checkpoints
- [ ] All 100 fields are generated with connections
- [ ] Clicking node shows correct info
- [ ] Can create new connections via drag
- [ ] Can delete connections
- [ ] Chatbot accepts input and shows response
- [ ] Quick action buttons work
- [ ] Canvas controls (zoom, fit) work

### Performance
- Initial load < 3 seconds
- Smooth 60fps panning/zooming
- No visible lag with 100+ nodes
