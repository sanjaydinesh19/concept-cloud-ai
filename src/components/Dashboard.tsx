import { Plus, Brain, Users, Download, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const recentProjects = [
  {
    id: 1,
    title: "Product Strategy 2024",
    lastModified: "2 hours ago",
    collaborators: 3,
    nodeCount: 24,
  },
  {
    id: 2,
    title: "Team Brainstorm Session",
    lastModified: "1 day ago",
    collaborators: 5,
    nodeCount: 18,
  },
  {
    id: 3,
    title: "Learning Path: AI/ML",
    lastModified: "3 days ago",
    collaborators: 1,
    nodeCount: 32,
  },
];

const templates = [
  {
    id: 1,
    name: "Business Strategy",
    description: "Comprehensive business planning template",
    icon: "🎯",
    nodeCount: 15,
  },
  {
    id: 2,
    name: "Project Planning",
    description: "Organize project tasks and milestones",
    icon: "📋",
    nodeCount: 12,
  },
  {
    id: 3,
    name: "Study Guide",
    description: "Structure learning materials and concepts",
    icon: "📚",
    nodeCount: 20,
  },
  {
    id: 4,
    name: "Team Workshop",
    description: "Facilitate group brainstorming sessions",
    icon: "💡",
    nodeCount: 8,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/editor');
  };

  const handleOpenProject = (projectId: number) => {
    navigate(`/editor/${projectId}`);
  };

  const handleTemplateSelect = (templateId: number) => {
    navigate(`/editor?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary animate-pulse-glow" />
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  IdeaMap AI
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search mind maps..."
                  className="pl-10 w-64 bg-surface border-border/50"
                />
              </div>
              <Button variant="hero" size="lg" className="shadow-glow" onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                New Mind Map
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Recent Projects</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <Card key={project.id} className="p-6 hover:shadow-md transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Modified {project.lastModified}</span>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{project.collaborators} collaborators</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Brain className="h-3 w-3" />
                          <span>{project.nodeCount} nodes</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ai" size="sm" onClick={() => handleOpenProject(project.id)}>Open</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Templates Sidebar */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Quick Start Templates</h2>
            <div className="space-y-4">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className="p-4 hover:shadow-md transition-all duration-300 cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-ai-secondary/20"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{template.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {template.nodeCount} starting nodes
                        </span>
                        <Star className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="mt-8 p-6 bg-gradient-ai border-ai-primary/20">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-5 w-5 text-ai-primary" />
                <h3 className="font-semibold text-ai-primary">AI Recommendations</h3>
              </div>
              <p className="text-sm text-card-foreground/80 mb-4">
                Based on your recent activity, we suggest creating a mind map for:
              </p>
              <div className="space-y-2">
                <Button variant="ai-subtle" size="sm" className="w-full justify-start" onClick={handleCreateNew}>
                  📈 Q1 Performance Analysis
                </Button>
                <Button variant="ai-subtle" size="sm" className="w-full justify-start" onClick={handleCreateNew}>
                  🎨 Creative Campaign Ideas
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}