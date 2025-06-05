'use client'

import React from 'react';
import RecordingControl from '@/components/record/RecordingControl';
import RecordsHistory from '@/components/record/RecordsHistory';
import RecordingSettings from '@/components/record/RecordingSettings';
import { toast } from 'sonner';

const Index = () => {


  return (
    <div className="bg-background">
      {/* Background Pattern */}      
      <div className="relative container mx-auto py-12">


        {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Recording Control */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                <RecordingControl/>
                
                {/* Settings Card */}
                <RecordingSettings />
              </div>
            </div>

            {/* Right Column - Recording History */}
            <div className="lg:col-span-8">
              <RecordsHistory />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Index;
