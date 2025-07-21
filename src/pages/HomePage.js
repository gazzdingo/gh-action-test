import React from 'react';
import { useFeature, useGrowthBook } from '@growthbook/growthbook-react';
import TestBanner from '../components/TestBanner';
import FeatureCard from '../components/FeatureCard';

function HomePage() {
  const gb = useGrowthBook();
  
  // Guy's test feature - this should be detected by coderefs action
  const homePageTestGuy = useFeature('home-page-test-guy');
  
  // Other feature flags for testing
  const darkMode = useFeature('dark-mode');
  const newLayout = useFeature('new-homepage-layout');
  const betaFeatures = useFeature('beta-features-2024');
  const socialLogin = useFeature('social-login');
  
  // Feature that doesn't exist - should be cleaned up by deleteMissing
  const oldFeature = useFeature('old-legacy-feature');

  return (
    <div className={`homepage ${darkMode.on ? 'dark-theme' : 'light-theme'}`}>
      <header className="hero-section">
        <h1>Welcome to Our Platform</h1>
        <p>Experience the power of feature flags with GrowthBook</p>
        
        {/* Guy's homepage test feature */}
        {homePageTestGuy.on && (
          <TestBanner 
            message="🚀 Guy's homepage test is ACTIVE!"
            variant={homePageTestGuy.value || 'default'}
            testId="home-page-test-guy"
          />
        )}
      </header>

      <section className={`features-grid ${newLayout.on ? 'new-layout' : 'classic-layout'}`}>
        <FeatureCard
          title="Feature Flags"
          description="Control features without deploying code"
          enabled={true}
        />
        
        <FeatureCard
          title="A/B Testing"
          description="Test different variations of your features"
          enabled={homePageTestGuy.on}
          testData={homePageTestGuy.value}
        />
        
        <FeatureCard
          title="Beta Features"
          description="Try out our latest experimental features"
          enabled={betaFeatures.on}
        />
        
        {socialLogin.on && (
          <FeatureCard
            title="Social Login"
            description="Sign in with your favorite social platforms"
            enabled={socialLogin.on}
          />
        )}
        
        {oldFeature.on && (
          <div className="deprecated-feature">
            <p>This is a legacy feature that should be removed</p>
          </div>
        )}
      </section>

      <section className="test-info">
        <h2>Feature Flag Status</h2>
        <div className="flag-status-grid">
          <div className="flag-item">
            <strong>home-page-test-guy:</strong> 
            <span className={homePageTestGuy.on ? 'flag-on' : 'flag-off'}>
              {homePageTestGuy.on ? 'ON' : 'OFF'}
            </span>
            {homePageTestGuy.value && (
              <span className="flag-value">({homePageTestGuy.value})</span>
            )}
          </div>
          
          <div className="flag-item">
            <strong>dark-mode:</strong> 
            <span className={darkMode.on ? 'flag-on' : 'flag-off'}>
              {darkMode.on ? 'ON' : 'OFF'}
            </span>
          </div>
          
          <div className="flag-item">
            <strong>new-homepage-layout:</strong> 
            <span className={newLayout.on ? 'flag-on' : 'flag-off'}>
              {newLayout.on ? 'ON' : 'OFF'}
            </span>
          </div>
          
          <div className="flag-item">
            <strong>beta-features-2024:</strong> 
            <span className={betaFeatures.on ? 'flag-on' : 'flag-off'}>
              {betaFeatures.on ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
      </section>

      {/* Debug info when Guy's test is active */}
      {homePageTestGuy.on && (
        <section className="debug-info">
          <h3>Debug Information (Guy's Test)</h3>
          <pre>
            {JSON.stringify({
              userId: gb.getAttributes().id,
              experiment: 'home-page-test-guy',
              variant: homePageTestGuy.value,
              enabled: homePageTestGuy.on,
              timestamp: new Date().toISOString()
            }, null, 2)}
          </pre>
        </section>
      )}
    </div>
  );
}

export default HomePage;
