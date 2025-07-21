import React from 'react';
import { useFeature } from '@growthbook/growthbook-react';

function TestBanner({ message, variant = 'default', testId }) {
  // Access Guy's test feature for additional customization
  const homePageTestGuy = useFeature('home-page-test-guy');
  
  const getBannerStyle = () => {
    if (homePageTestGuy.value === 'variant-a') {
      return 'test-banner-variant-a';
    } else if (homePageTestGuy.value === 'variant-b') {
      return 'test-banner-variant-b';
    }
    return 'test-banner-default';
  };

  const getBannerContent = () => {
    const baseContent = {
      message,
      testId,
      variant: homePageTestGuy.value || variant,
      timestamp: new Date().toLocaleDateString()
    };

    // Customize content based on Guy's test variant
    if (homePageTestGuy.value === 'variant-a') {
      return {
        ...baseContent,
        title: '🚀 Enhanced Test Experience',
        description: 'You\'re seeing the advanced version of Guy\'s homepage test',
        ctaText: 'Learn More About This Test'
      };
    } else if (homePageTestGuy.value === 'variant-b') {
      return {
        ...baseContent,
        title: '⭐ Premium Test Mode',
        description: 'This is the premium variant of the home-page-test-guy experiment',
        ctaText: 'Explore Premium Features'
      };
    }

    return {
      ...baseContent,
      title: message,
      description: 'Default test banner - home-page-test-guy is active',
      ctaText: 'Continue Testing'
    };
  };

  const content = getBannerContent();

  return (
    <div className={`test-banner ${getBannerStyle()}`} data-testid={testId}>
      <div className="test-banner-content">
        <h3 className="test-banner-title">{content.title}</h3>
        <p className="test-banner-description">{content.description}</p>
        
        <div className="test-banner-meta">
          <span className="test-variant">Variant: {content.variant}</span>
          <span className="test-date">Active since: {content.timestamp}</span>
        </div>
        
        <button className="test-banner-cta">
          {content.ctaText}
        </button>
      </div>
      
      <div className="test-banner-debug">
        <small>
          Feature: home-page-test-guy | 
          Status: {homePageTestGuy.on ? 'Active' : 'Inactive'} |
          Value: {homePageTestGuy.value || 'default'}
        </small>
      </div>
    </div>
  );
}

export default TestBanner;
