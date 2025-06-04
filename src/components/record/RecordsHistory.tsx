import React, { useState } from 'react';
import { History, Play, Download, Trash2, MoreHorizontal, Clock, Calendar, HardDrive, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Recording {
  id: string;
  title: string;
  duration: string;
  date: string;
  thumbnail: string;
  size: string;
  type: 'screen' | 'camera' | 'audio';
}

const mockRecordings: Recording[] = [
  {
    id: '1',
    title: 'Product Demo Recording',
    duration: '05:42',
    date: '2024-06-04',
    thumbnail: '/placeholder.svg',
    size: '24.5 MB',
    type: 'screen'
  },
  {
    id: '2',
    title: 'Team Meeting - Q2 Review',
    duration: '12:18',
    date: '2024-06-03',
    thumbnail: '/placeholder.svg',
    size: '67.2 MB',
    type: 'camera'
  },
  {
    id: '3',
    title: 'Tutorial Walkthrough',
    duration: '08:15',
    date: '2024-06-02',
    thumbnail: '/placeholder.svg',
    size: '41.8 MB',
    type: 'screen'
  },
  {
    id: '4',
    title: 'Bug Report Recording',
    duration: '03:22',
    date: '2024-06-01',
    thumbnail: '/placeholder.svg',
    size: '18.1 MB',
    type: 'audio'
  }
];

const RecordsHistory: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePlay = (id: string) => {
    console.log('Playing recording:', id);
  };

  const handleDownload = (id: string) => {
    console.log('Downloading recording:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting recording:', id);
  };


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-chart-1/30 rounded-xl blur-lg"></div>
            <div className="relative p-3 bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-xl border border-primary/20">
              <History className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">Recording Library</h2>
            <p className="text-muted-foreground">Organize and access your recordings</p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search recordings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-card/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground w-64"
            />
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center bg-card/50 border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
        </div>
      </div>
      
      {mockRecordings.length === 0 ? (
        <Card className="bg-card/50 border-border backdrop-blur-sm">
          <CardContent className="p-16 text-center">
            <div className="relative mx-auto mb-8 w-20 h-20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-chart-1/30 rounded-2xl blur-lg"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-primary/10 to-chart-1/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                <History className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">No recordings yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              Start recording to see your content appear here. Your library will help you organize and access all your recordings.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {mockRecordings.map((recording) => (
            <Card 
              key={recording.id} 
              className="group bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
            >
              <CardContent className={viewMode === 'grid' ? 'p-0' : 'p-6'}>
                {viewMode === 'grid' ? (
                  <div className="space-y-0">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-1/5"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-background/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-border/50">
                          <Play className="w-6 h-6 text-primary" fill="currentColor" />
                        </div>
                      </div>
                      
                      
                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium text-foreground border border-border/50">
                        {recording.duration}
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handlePlay(recording.id)}
                              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:border-primary"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleDownload(recording.id)}
                              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-chart-2 hover:border-chart-2"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDelete(recording.id)}
                            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-destructive hover:border-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {recording.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{recording.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HardDrive className="w-3.5 h-3.5" />
                            <span>{recording.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    {/* List Thumbnail */}
                    <div className="relative flex-shrink-0 w-24 h-16 bg-gradient-to-br from-muted/30 to-muted/60 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-chart-1/5"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary" fill="currentColor" />
                      </div>
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-background/80 backdrop-blur-sm rounded text-xs font-medium text-foreground">
                        {recording.duration}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground mb-2 truncate group-hover:text-primary transition-colors">
                            {recording.title}
                          </h3>
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{recording.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HardDrive className="w-4 h-4" />
                              <span>{recording.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePlay(recording.id)}
                            className="h-9 w-9 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(recording.id)}
                            className="h-9 w-9 p-0 text-muted-foreground hover:text-chart-2 hover:bg-chart-2/10"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(recording.id)}
                            className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordsHistory;
