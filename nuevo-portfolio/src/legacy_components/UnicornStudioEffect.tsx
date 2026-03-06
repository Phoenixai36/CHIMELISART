import React, { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio: any;
  }
}

const UnicornStudioEffect: React.FC = () => {
  useEffect(() => {
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          if (window.UnicornStudio.init) {
            window.UnicornStudio.init();
          }
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else if (window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
      window.UnicornStudio.init();
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full overflow-hidden bg-black/20 my-20">
      <div 
        data-us-project="FqzjsAnDO0SjOyfh1xQF" 
        className="unicorn-wrapper-generic"
      ></div>
    </div>
  );
};

export default UnicornStudioEffect;
