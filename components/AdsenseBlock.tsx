import React from 'react';

interface AdsenseBlockProps {
  slotId: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

const AdsenseBlock: React.FC<AdsenseBlockProps> = ({ slotId, format = 'auto', className = '' }) => {
  return (
    <div className={`bg-gray-100 dark:bg-dark-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center p-4 text-xs text-gray-500 overflow-hidden ${className}`}>
       <div className="text-center w-full break-words">
         <p className="font-semibold mb-1">Ad Space</p>
         <p className="opacity-50 text-[10px]">Google AdSense</p>
         <p className="opacity-30 text-[9px] mt-1">{slotId}</p>
         {/* In production, the <ins> tag for AdSense would go here */}
         {/* <ins className="adsbygoogle" style={{display: 'block'}} data-ad-client="ca-pub-XXXXXXXX" data-ad-slot={slotId} data-ad-format={format} data-full-width-responsive="true"></ins> */}
       </div>
    </div>
  );
};

export default AdsenseBlock;