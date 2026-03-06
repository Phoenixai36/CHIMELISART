import { useEffect, useState } from 'react';

export const PerformanceMonitor = () => {
  const [stats, setStats] = useState<{
    fps: number;
    frameTime: number;
    memory: number;
    warnings: string[];
  }>({
    fps: 0,
    frameTime: 0,
    memory: 0,
    warnings: []
  });

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;
    const frameTimes: number[] = [];

    const calculateFPS = () => {
      const now = performance.now();
      frameCount++;
      const delta = now - lastTime;
      frameTimes.push(delta);
      
      // Keep only last 10 frames for average
      if (frameTimes.length > 10) frameTimes.shift();
      
      // Update FPS every second
      if (now - lastFpsUpdate >= 1000) {
        const averageFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        const currentFps = Math.round(1000 / averageFrameTime);
        
        setStats(prev => ({
          ...prev,
          fps: currentFps,
          frameTime: parseFloat(averageFrameTime.toFixed(2)),
          warnings: currentFps < 30 ? ['Performance warning: FPS below 30'] : []
        }));
        
        lastFpsUpdate = now;
        frameCount = 0;
      }
      
      lastTime = now;
      requestAnimationFrame(calculateFPS);
    };

    const checkMemory = () => {
      // Extended interface for Chrome's non-standard memory property
      interface PerformanceWithMemory extends Performance {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      }
      
      const perf = window.performance as unknown as PerformanceWithMemory;
      
      if (perf && perf.memory) {
        setStats(prev => ({
          ...prev,
          memory: Math.round(perf.memory!.usedJSHeapSize / 1048576) // MB
        }));
      }
      setTimeout(checkMemory, 1000);
    };

    const animationFrameId = requestAnimationFrame(calculateFPS);
    const timeoutId = setTimeout(checkMemory, 1000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  const getPerformanceColor = () => {
    if (stats.fps >= 50) return 'text-green-400';
    if (stats.fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Hidden as per user request
  return null; 
  /* 
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 backdrop-blur-md rounded-lg p-3 text-xs text-white border border-white/10">
      <div className="font-bold mb-1">🎮 CHIMELISART Performance</div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="text-gray-400">FPS</div>
          <div className={getPerformanceColor()}>{stats.fps}</div>
        </div>
        <div>
          <div className="text-gray-400">Frame</div>
          <div className="text-blue-400">{stats.frameTime}ms</div>
        </div>
        <div>
          <div className="text-gray-400">Memory</div>
          <div className="text-purple-400">{stats.memory}MB</div>
        </div>
        <div>
          <div className="text-gray-400">Status</div>
          <div className={stats.fps >= 45 ? 'text-green-400' : 'text-yellow-400'}>
            {stats.fps >= 45 ? '🟢 Smooth' : stats.fps >= 30 ? '🟡 Good' : '🔴 Laggy'}
          </div>
        </div>
      </div>
      {stats.warnings.length > 0 && (
        <div className="mt-2 p-2 bg-red-900/50 rounded text-red-300 text-xs">
          {stats.warnings[0]}
        </div>
      )}
    </div>
  );
  */
};

export default PerformanceMonitor;