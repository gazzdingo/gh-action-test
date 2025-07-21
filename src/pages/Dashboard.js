import React, { useState, useEffect } from 'react';
import { useFeature, useGrowthBook } from '@growthbook/growthbook-react';

function Dashboard() {
  const gb = useGrowthBook();
  const [analytics, setAnalytics] = useState(null);
  
  // Feature flags
  const advancedAnalytics = useFeature('advanced-analytics');
  const realTimeUpdates = useFeature('real-time-updates');
  const exportFeature = useFeature('export-dashboard-data');
  const darkMode = useFeature('dark-mode');
  
  // Guy's test feature for dashboard customization
  const homePageTestGuy = useFeature('home-page-test-guy'); // test feature
  const dashboardPersonalization = useFeature('dashboard-personalization');
  
  // Legacy features that should be cleaned up
  const oldCharts = useFeature('legacy-chart-system');
  const deprecatedMetrics = useFeature('old-metrics-display');

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = () => {
      const baseData = {
        users: 1250,
        sessions: 3400,
        conversions: 89,
        revenue: 15420
      };
      
      // Enhanced analytics when feature flag is on
      if (advancedAnalytics.on) {
        setAnalytics({
          ...baseData,
          detailedMetrics: {
            bounceRate: 0.32,
            sessionDuration: 245,
            pagesPerSession: 3.2,
            conversionRate: 0.026
          },
          segments: ['mobile', 'desktop', 'tablet'],
          realTime: realTimeUpdates.on
        });
      } else {
        setAnalytics(baseData);
      }
    };

    loadAnalytics();
  }, [advancedAnalytics.on, realTimeUpdates.on]);

  const getDashboardLayout = () => {
    if (homePageTestGuy.on) {
      return 'experimental-dashboard-layout';
    }
    return dashboardPersonalization.on ? 'personalized-layout' : 'default-layout';
  };

  return (
    <div className={`dashboard ${darkMode.on ? 'dark-theme' : 'light-theme'} ${getDashboardLayout()}`}>
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        
        {/* Guy's test feature affecting dashboard */}
        {homePageTestGuy.on && (
          <div className="test-indicator">
            <span className="test-badge">Guy's Test Active</span>
            <p>Dashboard running in experimental mode</p>
          </div>
        )}
        
        {realTimeUpdates.on && (
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>Live Updates</span>
          </div>
        )}
      </header>

      <div className="dashboard-grid">
        {/* Basic Metrics */}
        <div className="metric-card">
          <h3>Users</h3>
          <p className="metric-value">{analytics?.users || 0}</p>
        </div>
        
        <div className="metric-card">
          <h3>Sessions</h3>
          <p className="metric-value">{analytics?.sessions || 0}</p>
        </div>
        
        <div className="metric-card">
          <h3>Conversions</h3>
          <p className="metric-value">{analytics?.conversions || 0}</p>
        </div>
        
        <div className="metric-card">
          <h3>Revenue</h3>
          <p className="metric-value">${analytics?.revenue || 0}</p>
        </div>

        {/* Advanced Analytics Section */}
        {advancedAnalytics.on && analytics?.detailedMetrics && (
          <>
            <div className="advanced-metric-card">
              <h3>Bounce Rate</h3>
              <p className="metric-value">{(analytics.detailedMetrics.bounceRate * 100).toFixed(1)}%</p>
            </div>
            
            <div className="advanced-metric-card">
              <h3>Avg. Session Duration</h3>
              <p className="metric-value">{analytics.detailedMetrics.sessionDuration}s</p>
            </div>
            
            <div className="advanced-metric-card">
              <h3>Pages/Session</h3>
              <p className="metric-value">{analytics.detailedMetrics.pagesPerSession}</p>
            </div>
            
            <div className="advanced-metric-card">
              <h3>Conversion Rate</h3>
              <p className="metric-value">{(analytics.detailedMetrics.conversionRate * 100).toFixed(2)}%</p>
            </div>
          </>
        )}

        {/* Legacy Charts - should be removed */}
        {oldCharts.on && (
          <div className="legacy-charts">
            <h3>Legacy Chart System (Deprecated)</h3>
            <p>This old chart system should be removed</p>
          </div>
        )}

        {/* Export Feature */}
        {exportFeature.on && (
          <div className="export-section">
            <button className="export-btn">Export Dashboard Data</button>
          </div>
        )}
      </div>

      {/* Feature Flag Status for Dashboard */}
      <div className="dashboard-flags-info">
        <h3>Active Dashboard Features</h3>
        <div className="flag-list">
          <div className={`flag-status ${homePageTestGuy.on ? 'active' : 'inactive'}`}>
            <strong>home-page-test-guy:</strong> {homePageTestGuy.on ? 'Active' : 'Inactive'}
            {homePageTestGuy.on && homePageTestGuy.value && (
              <span> (variant: {homePageTestGuy.value})</span>
            )}
          </div>
          
          <div className={`flag-status ${advancedAnalytics.on ? 'active' : 'inactive'}`}>
            <strong>advanced-analytics:</strong> {advancedAnalytics.on ? 'Active' : 'Inactive'}
          </div>
          
          <div className={`flag-status ${realTimeUpdates.on ? 'active' : 'inactive'}`}>
            <strong>real-time-updates:</strong> {realTimeUpdates.on ? 'Active' : 'Inactive'}
          </div>
          
          <div className={`flag-status ${dashboardPersonalization.on ? 'active' : 'inactive'}`}>
            <strong>dashboard-personalization:</strong> {dashboardPersonalization.on ? 'Active' : 'Inactive'}
          </div>
        </div>
      </div>

      {/* Guy's test specific dashboard features */}
      {homePageTestGuy.on && (
        <div className="test-dashboard-features">
          <h3>Experimental Features (Guy's Test)</h3>
          <div className="test-features">
            <div className="test-feature-item">
              <h4>Enhanced User Tracking</h4>
              <p>Advanced user behavior analytics enabled by home-page-test-guy</p>
            </div>
            
            <div className="test-feature-item">
              <h4>Custom Dashboard Layout</h4>
              <p>Personalized dashboard experience for test users</p>
            </div>
            
            <div className="test-feature-item">
              <h4>A/B Test Integration</h4>
              <p>Real-time A/B test results and performance metrics</p>
            </div>
          </div>
        </div>
      )}

      {/* Deprecated metrics warning */}
      {deprecatedMetrics.on && (
        <div className="deprecated-warning">
          <h4>⚠️ Deprecated Metrics Display</h4>
          <p>This metrics display system is deprecated and should be removed</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
