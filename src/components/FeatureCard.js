import React from 'react';
import { useFeature } from '@growthbook/growthbook-react';

function FeatureCard({ title, description, enabled, testData, flagKey }) {
  // Check Guy's test for card styling
  const homePageTestGuy = useFeature('home-page-test-guy');
  const cardAnimations = useFeature('card-animations');
  
  const getCardClass = () => {
    let classes = ['feature-card'];
    
    if (enabled) {
      classes.push('feature-enabled');
    } else {
      classes.push('feature-disabled');
    }
    
    // Apply Guy's test styling
    if (homePageTestGuy.on) {
      classes.push('test-enhanced-card');
    }
    
    if (cardAnimations.on) {
      classes.push('animated-card');
    }
    
    return classes.join(' ');
  };

  return (
    <div className={getCardClass()}>
      <div className="feature-card-header">
        <h3>{title}</h3>
        {homePageTestGuy.on && (
          <span className="test-indicator">Guy's Test</span>
        )}
      </div>
      
      <div className="feature-card-body">
        <p>{description}</p>
        
        {testData && (
          <div className="test-data">
            <strong>Test Data:</strong> {JSON.stringify(testData)}
          </div>
        )}
      </div>
      
      <div className="feature-card-footer">
        <div className={`status-indicator ${enabled ? 'enabled' : 'disabled'}`}>
          {enabled ? '✅ Enabled' : '❌ Disabled'}
        </div>
        
        {flagKey && (
          <div className="flag-info">
            <small>Flag: {flagKey}</small>
          </div>
        )}
      </div>
      
      {/* Guy's test enhancement */}
      {homePageTestGuy.on && enabled && (
        <div className="test-enhancement">
          <div className="enhancement-badge">Enhanced by home-page-test-guy</div>
          <div className="enhancement-details">
            <p>This card has been enhanced for Guy's experiment</p>
            <p>Variant: {homePageTestGuy.value || 'default'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeatureCard;
