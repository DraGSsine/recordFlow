"use client"

import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { DashboardContext } from "@/context/dashboard-context-provider";

const RecordCountdown = () => {
    const { startRecording, setStartRecording } = useContext(DashboardContext);
    const [count, setCount] = useState(3);
    const [isCountingDown, setIsCountingDown] = useState(false);

    const onRecordingStart = () => {
        console.log("Recording started!");
    };

    const handleCancel = () => {
        setStartRecording(false);
        setIsCountingDown(false);
        setCount(3);
    };

    useEffect(() => {
        if (startRecording) {
            setCount(3);
            setIsCountingDown(true);
        }
    }, [startRecording]);

    useEffect(() => {
        if (isCountingDown && count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1);
            }, 1500);

            return () => clearTimeout(timer);
        }
        if (count === 0) {
            onRecordingStart();
            setStartRecording(false);
        }
    }, [isCountingDown, count, setStartRecording]);

    return (
        <Dialog open={startRecording} onOpenChange={setStartRecording}>
            <DialogContent showCloseButton={false} className="h-[500px] w-[500px] flex items-center justify-center flex-col rounded-full border-0 backdrop-blur-md shadow-2xl bg-gradient-to-br from-blue-600/20 to-blue-800/20">
            
            <div className="text-foreground text-xl font-semibold animate-pulse">
            Recording starts in...
            </div>
            <div className="flex flex-col items-center space-y-8 py-8">
            <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:scale-105 border-4 border-blue-200/50">
            <div className="text-6xl font-bold text-blue-900">
                {count}
            </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping animation-duration-1500"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 animate-pulse"></div>
            </div>
            
            
            <Button 
            variant="outline" 
            onClick={handleCancel}
            className="z-50 rounded-full px-8 py-3 border-2 border-blue-200/50 hover:border-blue-300 hover:bg-zinc-50 hover:zinc-300 transition-all duration-300 font-medium text-foreground bg-blue-50/10 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
            Cancel Recording
            </Button>
            </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecordCountdown;
