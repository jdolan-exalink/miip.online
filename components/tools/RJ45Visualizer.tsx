import React, { useState } from 'react';
import { Cable } from 'lucide-react';

const RJ45Visualizer: React.FC = () => {
  const [standard, setStandard] = useState<'A' | 'B'>('B');

  const colorsA = [
    { name: 'White/Green', class: 'bg-green-100 border-green-600 border-dashed border-2' },
    { name: 'Green', class: 'bg-green-600' },
    { name: 'White/Orange', class: 'bg-orange-100 border-orange-500 border-dashed border-2' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'White/Blue', class: 'bg-blue-100 border-blue-600 border-dashed border-2' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'White/Brown', class: 'bg-amber-100 border-amber-800 border-dashed border-2' },
    { name: 'Brown', class: 'bg-amber-800' },
  ];

  const colorsB = [
    { name: 'White/Orange', class: 'bg-orange-100 border-orange-500 border-dashed border-2' },
    { name: 'Orange', class: 'bg-orange-500' },
    { name: 'White/Green', class: 'bg-green-100 border-green-600 border-dashed border-2' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'White/Blue', class: 'bg-blue-100 border-blue-600 border-dashed border-2' },
    { name: 'Green', class: 'bg-green-600' },
    { name: 'White/Brown', class: 'bg-amber-100 border-amber-800 border-dashed border-2' },
    { name: 'Brown', class: 'bg-amber-800' },
  ];

  const currentColors = standard === 'A' ? colorsA : colorsB;

  return (
    <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Cable className="text-primary-500" /> RJ45 Color Guide
      </h2>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setStandard('B')}
          className={`px-4 py-2 rounded-lg font-medium transition ${standard === 'B' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300'}`}
        >
          T-568B (Common)
        </button>
        <button
          onClick={() => setStandard('A')}
          className={`px-4 py-2 rounded-lg font-medium transition ${standard === 'A' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-300'}`}
        >
          T-568A
        </button>
      </div>

      <div className="flex flex-col items-center">
        {/* Connector Visualization */}
        <div className="relative w-48 h-64 bg-transparent mb-6">
            {/* Plastic Head */}
            <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-600 rounded-t-2xl rounded-b-md z-10 pointer-events-none"></div>
            
            {/* Pins Area */}
            <div className="absolute top-2 left-2 right-2 h-8 bg-yellow-400/20 rounded-t border-b border-gray-200 z-0 flex justify-between px-1">
                 {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-full bg-yellow-500/80"></div>)}
            </div>

            {/* Wires */}
            <div className="absolute top-12 left-4 right-4 bottom-0 flex justify-between px-1">
                {currentColors.map((col, idx) => (
                    <div key={idx} className="flex flex-col items-center w-full">
                        <div className={`w-3 h-full ${col.class} rounded-full`}></div>
                    </div>
                ))}
            </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
            {currentColors.map((col, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded bg-gray-50 dark:bg-dark-800">
                    <div className="text-xs font-mono text-gray-400 w-4">{idx + 1}</div>
                    <div className={`w-4 h-4 rounded-full border border-gray-200 ${col.class}`}></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{col.name}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RJ45Visualizer;