import { useState, useRef } from "react";
import { 
  Brain, 
  Plus, 
  Save, 
  Download, 
  Users, 
  Sparkles, 
  Move, 
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Settings,
  ArrowLeft,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import ExportModal from "./ExportModal";

interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  connections: string[];
}

const initialNodes: MindMapNode[] = [
  {
    id: "root",
    text: "My Project Strategy",
    x: 400,
    y: 300,
    color: "primary",
    connections: ["node1", "node2", "node3"]
  },
  {
    id: "node1",
    text: "Market Research",
    x: 200,
    y: 200,
    color: "ai-primary",
    connections: ["root"]
  },
  {
    id: "node2",
    text: "Product Development",
    x: 600,
    y: 200,
    color: "accent",
    connections: ["root"]
  },
  {
    id: "node3",
    text: "Marketing Strategy",
    x: 400,
    y: 450,
    color: "success",
    connections: ["root"]
  }
];

const aiSuggestions = [
  "🎯 Target Audience Analysis",
  "💰 Budget Planning",
  "📊 Performance Metrics",
  "🚀 Launch Timeline",
  "🤝 Partnership Opportunities",
  "📈 Growth Strategies"
];

export default function MindMapEditor() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<MindMapNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showExportModal, setShowExportModal] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNode(nodeId);
    setIsDragging(true);
    
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setDragOffset({
        x: e.clientX - node.x,
        y: e.clientY - node.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedNode) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;
        
        setNodes(nodes.map(node => 
          node.id === selectedNode 
            ? { ...node, x: newX, y: newY }
            : node
        ));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const addNode = (suggestion: string) => {
    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      text: suggestion,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      color: "ai-primary",
      connections: []
    };
    setNodes([...nodes, newNode]);
  };

  const renderConnections = () => {
    return nodes.flatMap(node => 
      node.connections.map(connectionId => {
        const connectedNode = nodes.find(n => n.id === connectionId);
        if (!connectedNode) return null;
        
        return (
          <line
            key={`${node.id}-${connectionId}`}
            x1={node.x + 50}
            y1={node.y + 25}
            x2={connectedNode.x + 50}
            y2={connectedNode.y + 25}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="opacity-60"
          />
        );
      })
    ).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex">
      {/* Toolbar */}
      <div className="w-16 bg-card border-r border-border/50 flex flex-col items-center py-4 space-y-4">
        <Button variant="ghost" size="sm" className="h-12 w-12">
          <Move className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-12 w-12">
          <Plus className="h-5 w-5" />
        </Button>
        <Separator className="w-8" />
        <Button variant="ghost" size="sm" className="h-12 w-12">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-12 w-12">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="h-12 w-12">
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Separator className="w-8" />
        <Button variant="ghost" size="sm" className="h-12 w-12">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card/50 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">Product Strategy Mind Map</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>3 collaborators online</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowExportModal(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="hero" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 flex">
          <div 
            ref={canvasRef}
            className="flex-1 relative overflow-hidden bg-gradient-to-br from-surface/50 to-background/80 cursor-move"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {renderConnections()}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute cursor-grab active:cursor-grabbing transition-transform hover:scale-105 ${
                  selectedNode === node.id ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                  transform: selectedNode === node.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
              >
                <Card className={`
                  p-4 min-w-24 text-center shadow-md border-2 transition-all duration-300
                  ${node.color === 'primary' ? 'bg-gradient-primary text-primary-foreground border-primary' : ''}
                  ${node.color === 'ai-primary' ? 'bg-gradient-ai text-white border-ai-primary' : ''}
                  ${node.color === 'accent' ? 'bg-gradient-accent text-accent-foreground border-accent' : ''}
                  ${node.color === 'success' ? 'bg-success text-success-foreground border-success' : ''}
                `}>
                  <div className="font-medium text-sm leading-tight">{node.text}</div>
                  {selectedNode === node.id && (
                    <Button
                      variant="ghost"
                      size="sm" 
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-destructive text-destructive-foreground rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNodes(nodes.filter(n => n.id !== node.id));
                        setSelectedNode(null);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </Card>
              </div>
            ))}

            {/* Grid dots for visual guidance */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => 
                Array.from({ length: 15 }, (_, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="absolute w-1 h-1 bg-muted-foreground rounded-full"
                    style={{
                      left: i * 60 + 30,
                      top: j * 60 + 30
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {/* AI Suggestions Sidebar */}
          <div className="w-80 bg-card/50 backdrop-blur-sm border-l border-border/50 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-5 w-5 text-ai-primary animate-pulse" />
              <h2 className="text-lg font-semibold">AI Suggestions</h2>
            </div>
            
            <div className="space-y-3 mb-6">
              {aiSuggestions.map((suggestion, index) => (
                <Card 
                  key={index}
                  className="p-3 cursor-pointer hover:shadow-md transition-all duration-300 border-border/50 hover:bg-ai-secondary/20"
                  onClick={() => addNode(suggestion)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{suggestion}</span>
                    <Plus className="h-4 w-4 text-ai-primary" />
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-gradient-ai border-ai-primary/20">
              <h3 className="font-semibold text-ai-primary mb-2">Smart Connect</h3>
              <p className="text-xs text-card-foreground/80 mb-3">
                AI can automatically suggest connections between your ideas.
              </p>
              <Button variant="ai" size="sm" className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Find Connections
              </Button>
            </Card>

            {/* Recent Activity */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-sm">Recent Activity</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Sarah added "Budget Planning"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-ai-primary rounded-full"></div>
                  <span>AI suggested 3 new connections</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Mike exported to PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ExportModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
      />
    </div>
  );
}