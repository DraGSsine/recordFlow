import React, { useState } from 'react';
import { Settings, Monitor, Mic, Volume2, Camera, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const RecordingSettings: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle 
          className="flex items-center justify-between text-foreground cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-chart-1/30 rounded-lg blur-sm"></div>
              <div className="relative p-2 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-lg border border-primary/20">
                <Settings className="w-5 h-5 text-primary" />
              </div>
            </div>
            <span>Recording Settings</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </CardTitle>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Source Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground mb-3">Recording Source</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                className="flex items-center justify-between h-auto p-4 bg-primary/10 border-primary/30 hover:border-primary/50 hover:bg-primary/20 text-left transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-chart-2/20 rounded-lg border border-chart-2/30">
                    <Monitor className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">Full Screen</div>
                    <div className="text-xs text-muted-foreground">Capture entire screen</div>
                  </div>
                </div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-between h-auto p-4 bg-card/30 border-border hover:border-muted transition-all text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted/20 rounded-lg border border-muted/30">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-muted-foreground font-medium">Window</div>
                    <div className="text-xs text-muted-foreground/70">Select specific window</div>
                  </div>
                </div>
                <div className="w-3 h-3 bg-muted-foreground/50 rounded-full"></div>
              </Button>
            </div>
          </div>
          
          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Audio Settings</h3>
            
            <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-3/20 rounded-lg border border-chart-3/30">
                  <Mic className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <div className="text-foreground font-medium">Microphone</div>
                  <div className="text-xs text-muted-foreground">Record voice narration</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-card/30 rounded-xl border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-chart-4/20 rounded-lg border border-chart-4/30">
                  <Volume2 className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <div className="text-foreground font-medium">System Audio</div>
                  <div className="text-xs text-muted-foreground">Include computer sounds</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RecordingSettings;
