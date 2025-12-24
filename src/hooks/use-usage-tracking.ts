import { useLocalStorage } from './use-local-storage';

export interface ToolUsage {
  toolId: string;
  visits: Array<{
    timestamp: number;
    duration: number; // seconds
  }>;
  totalUsage: number;
  lastUsed: number;
}

export interface UsageStats {
  tools: Record<string, ToolUsage>;
}

export function useUsageTracking() {
  const [usageData, setUsageData] = useLocalStorage<UsageStats>('devnest_usage', {
    tools: {},
  });

  const trackToolVisit = (toolId: string) => {
    const startTime = Date.now();

    // Record visit start
    const updatedData = { ...usageData };
    if (!updatedData.tools[toolId]) {
      updatedData.tools[toolId] = {
        toolId,
        visits: [],
        totalUsage: 0,
        lastUsed: startTime,
      };
    }

    updatedData.tools[toolId].lastUsed = startTime;
    setUsageData(updatedData);

    // Return cleanup function to track duration
    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const finalData = { ...updatedData };
      
      finalData.tools[toolId].visits.push({
        timestamp: startTime,
        duration,
      });
      finalData.tools[toolId].totalUsage += 1;

      // Keep only last 100 visits per tool
      if (finalData.tools[toolId].visits.length > 100) {
        finalData.tools[toolId].visits = finalData.tools[toolId].visits.slice(-100);
      }

      setUsageData(finalData);
    };
  };

  const getToolUsage = (toolId: string): ToolUsage | null => {
    return usageData.tools[toolId] || null;
  };

  const getRecentTools = (limit: number = 5): string[] => {
    const tools = Object.values(usageData.tools);
    return tools
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, limit)
      .map(t => t.toolId);
  };

  const getMostUsedTools = (limit: number = 5, days: number = 7): string[] => {
    const cutoffTime = Date.now() - days * 24 * 60 * 60 * 1000;
    const tools = Object.values(usageData.tools);

    const recentUsage = tools.map(tool => ({
      toolId: tool.toolId,
      count: tool.visits.filter(v => v.timestamp >= cutoffTime).length,
    }));

    return recentUsage
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
      .map(t => t.toolId);
  };

  const getWeeklyStats = () => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const tools = Object.values(usageData.tools);

    const weeklyUsage: Record<string, number> = {};
    let totalActions = 0;

    tools.forEach(tool => {
      const weekVisits = tool.visits.filter(v => v.timestamp >= sevenDaysAgo);
      if (weekVisits.length > 0) {
        weeklyUsage[tool.toolId] = weekVisits.length;
        totalActions += weekVisits.length;
      }
    });

    const mostUsedTool = Object.entries(weeklyUsage)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || '';

    return {
      toolUsage: weeklyUsage,
      totalActions,
      mostUsedTool,
    };
  };

  const clearUsageData = () => {
    setUsageData({ tools: {} });
  };

  return {
    trackToolVisit,
    getToolUsage,
    getRecentTools,
    getMostUsedTools,
    getWeeklyStats,
    clearUsageData,
    usageData,
  };
}
