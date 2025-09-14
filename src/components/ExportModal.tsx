import { Download, FileImage, FileText, Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const exportOptions = [
  {
    id: 'pdf',
    name: 'PDF Document',
    description: 'High-quality document for printing and sharing',
    icon: FileText,
    format: 'PDF',
  },
  {
    id: 'png',
    name: 'PNG Image',
    description: 'High-resolution image with transparent background',
    icon: FileImage,
    format: 'PNG',
  },
  {
    id: 'jpeg',
    name: 'JPEG Image',
    description: 'Compressed image format for web sharing',
    icon: FileImage,
    format: 'JPEG',
  },
  {
    id: 'link',
    name: 'Shareable Link',
    description: 'Create a public link to share your mind map',
    icon: Link,
    format: 'URL',
  },
];

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [exporting, setExporting] = useState<string | null>(null);
  const [exported, setExported] = useState<string | null>(null);

  const handleExport = async (optionId: string) => {
    setExporting(optionId);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setExporting(null);
    setExported(optionId);
    
    // Reset exported status after 3 seconds
    setTimeout(() => {
      setExported(null);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5 text-primary" />
            <span>Export Mind Map</span>
          </DialogTitle>
          <DialogDescription>
            Choose your preferred export format. Your mind map will be optimized for the selected format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {exportOptions.map((option) => {
            const Icon = option.icon;
            const isExporting = exporting === option.id;
            const isExported = exported === option.id;
            
            return (
              <Card 
                key={option.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-300 border-border/50"
                onClick={() => !isExporting && !isExported && handleExport(option.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-2 rounded-lg transition-colors
                    ${isExported ? 'bg-success text-success-foreground' : 'bg-surface text-surface-foreground'}
                  `}>
                    {isExported ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{option.name}</h3>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {option.format}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    {isExporting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : isExported ? (
                      <Button variant="success" size="sm">
                        Downloaded
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        Export
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            💡 Tip: PDF format preserves all interactive elements and is best for professional presentations.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}