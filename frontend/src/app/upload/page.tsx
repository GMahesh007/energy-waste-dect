"use client";

import { useState } from "react";
import { UploadCloud, FileText, CheckCircle, Zap, ShieldAlert } from "lucide-react";

export default function UploadPage() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragActive(true);
    else setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulating API call duration for the AI parse
    setTimeout(() => {
      // Mock Parsed Data Response from AI Module
      setParsedData({
        totalKWh: 1045,
        totalCost: 185.20,
        billingPeriod: "March 2026",
        insights: [
          "Your usage of 1045 kWh is 25% higher than the regional average for similar households.",
          "Your Air Conditioning unit shows inefficient power draw patterns during peak hours.",
          "Consider replacing your 10-year-old Refrigerator to save approximately $18/month."
        ]
      });
      setIsUploading(false);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Smart Bill Upload</h1>
        <p className="text-foreground/60 mt-2">Upload your electricity bill for AI analysis and savings recommendations</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload Column */}
        <div className="space-y-6">
          <div 
            className={`glass border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 relative overflow-hidden group
              ${isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-[rgba(255,255,255,0.1)] hover:border-primary/50"}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              accept=".pdf,image/*"
              onChange={handleChange}
            />
            
            <div className="relative z-0 pointer-events-none flex flex-col items-center">
              <div className={`p-5 rounded-full mb-6 transition-all duration-300 ${isDragActive ? 'bg-primary/20 scale-110' : 'bg-secondary'}`}>
                {file ? <FileText className="w-10 h-10 text-primary" /> : <UploadCloud className="w-10 h-10 text-primary" />}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                {file ? file.name : "Drag & drop your bill here"}
              </h3>
              <p className="text-foreground/50 text-sm mb-6 max-w-xs mx-auto">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Supports PDF, JPG, PNG up to 10MB"}
              </p>
              
              <button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] pointer-events-auto"
                disabled={isUploading}
                onClick={(e) => { e.stopPropagation(); document.querySelector('input')?.click() }}
              >
                Browse Files
              </button>
            </div>
          </div>

          {file && !parsedData && (
            <div className="flex justify-end">
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Bill...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current" />
                    Extract Insights
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div>
          {parsedData ? (
            <div className="glass rounded-3xl p-8 border-l-4 border-l-accent animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/20 text-green-400 rounded-full">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Analysis Complete</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-secondary/50 rounded-2xl p-4 border border-[rgba(255,255,255,0.05)]">
                  <p className="text-sm text-foreground/60 mb-1">Total Usage</p>
                  <p className="text-2xl font-bold text-accent">{parsedData.totalKWh} <span className="text-sm font-normal text-foreground/50">kWh</span></p>
                </div>
                <div className="bg-secondary/50 rounded-2xl p-4 border border-[rgba(255,255,255,0.05)]">
                  <p className="text-sm text-foreground/60 mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-green-400">${parsedData.totalCost}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  AI Energy Saving Tips
                </h3>
                <ul className="space-y-4">
                  {parsedData.insights.map((insight: string, idx: number) => (
                    <li key={idx} className="flex gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]">
                      <ShieldAlert className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                      <p className="text-foreground/90 leading-relaxed text-sm">{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 glass rounded-3xl border border-[rgba(255,255,255,0.05)] opacity-50">
              <div className="text-center">
                <Zap className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-foreground/50">Awaiting Bill Data</h3>
                <p className="text-foreground/40 mt-2 max-w-xs mx-auto">Upload a bill to let the AI analyze your consumption patterns.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
