import React, { useState } from 'react';
import { useFeature, useGrowthBook } from '@growthbook/growthbook-react';

function Settings() {
  const gb = useGrowthBook();
  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: false,
    analytics: true
  });

  // Feature flags
  const darkMode = useFeature('dark-mode');
  const advancedSettings = useFeature('advanced-settings-panel');
  const twoFactorAuth = useFeature('two-factor-authentication');
  const apiAccess = useFeature('api-access-keys');
  
  // Guy's test feature for settings customization
  const homePageTestGuy = useFeature('home-page-test-guy');
  const betaSettings = useFeature('beta-settings-ui');
  
  // Legacy settings that should be cleaned up
  const oldUserInterface = useFeature('legacy-settings-ui');
  const deprecatedOptions = useFeature('deprecated-user-options');

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSettingsLayout = () => {
    if (homePageTestGuy.on && betaSettings.on) {
      return 'experimental-settings';
    }
    return advancedSettings.on ? 'advanced-layout' : 'basic-layout';
  };

  return (
    <div className={`settings ${darkMode.on ? 'dark-theme' : 'light-theme'} ${getSettingsLayout()}`}>
      <header className="settings-header">
        <h1>Settings</h1>
        
        {/* Guy's test feature indicator */}
        {homePageTestGuy.on && (
          <div className="test-settings-banner">
            <span className="test-label">Guy's Test Mode</span>
            <p>Enhanced settings experience enabled</p>
          </div>
        )}
      </header>

      <div className="settings-container">
        {/* Basic Settings */}
        <section className="settings-section">
          <h2>General Preferences</h2>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
              />
              Enable notifications
            </label>
          </div>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.newsletter}
                onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
              />
              Subscribe to newsletter
            </label>
          </div>
          
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
              />
              Allow analytics tracking
            </label>
          </div>

          {/* Dark mode toggle */}
          <div className="setting-item">
            <label>
              <span>Dark Mode: {darkMode.on ? 'Enabled' : 'Disabled'}</span>
            </label>
            <p className="setting-description">
              Dark mode is controlled by the 'dark-mode' feature flag
            </p>
          </div>
        </section>

        {/* Advanced Settings (Feature Flag Controlled) */}
        {advancedSettings.on && (
          <section className="settings-section advanced-section">
            <h2>Advanced Settings</h2>
            
            <div className="setting-item">
              <label>Performance Mode</label>
              <select defaultValue="balanced">
                <option value="performance">High Performance</option>
                <option value="balanced">Balanced</option>
                <option value="battery">Battery Saver</option>
              </select>
            </div>
            
            <div className="setting-item">
              <label>Cache Duration (hours)</label>
              <input type="number" defaultValue="24" min="1" max="168" />
            </div>
          </section>
        )}

        {/* Two-Factor Authentication */}
        {twoFactorAuth.on && (
          <section className="settings-section security-section">
            <h2>Security</h2>
            
            <div className="setting-item">
              <h3>Two-Factor Authentication</h3>
              <p>Secure your account with 2FA</p>
              <button className="btn btn-primary">Enable 2FA</button>
            </div>
          </section>
        )}

        {/* API Access (Feature Flag Controlled) */}
        {apiAccess.on && (
          <section className="settings-section api-section">
            <h2>API Access</h2>
            
            <div className="setting-item">
              <h3>API Keys</h3>
              <p>Manage your API access keys</p>
              <button className="btn btn-secondary">Generate New Key</button>
            </div>
            
            <div className="setting-item">
              <h3>Rate Limits</h3>
              <p>Current limit: 1000 requests/hour</p>
            </div>
          </section>
        )}

        {/* Guy's Test Features */}
        {homePageTestGuy.on && (
          <section className="settings-section test-section">
            <h2>Experimental Settings (Guy's Test)</h2>
            
            <div className="test-settings-grid">
              <div className="test-setting-item">
                <h4>Enhanced User Experience</h4>
                <p>Personalized settings based on your usage patterns</p>
                <label>
                  <input type="checkbox" defaultChecked />
                  Enable smart recommendations
                </label>
              </div>
              
              <div className="test-setting-item">
                <h4>Advanced Analytics</h4>
                <p>Detailed insights into your feature usage</p>
                <label>
                  <input type="checkbox" />
                  Share usage data for home-page-test-guy experiment
                </label>
              </div>
              
              <div className="test-setting-item">
                <h4>Beta Feature Access</h4>
                <p>Early access to new features and improvements</p>
                <label>
                  <input type="checkbox" defaultChecked />
                  Participate in beta testing program
                </label>
              </div>
            </div>
          </section>
        )}

        {/* Beta Settings UI */}
        {betaSettings.on && (
          <section className="settings-section beta-section">
            <h2>Beta Features</h2>
            <p>These settings are part of our beta testing program</p>
            
            <div className="setting-item">
              <label>
                <input type="checkbox" />
                Enable experimental interface animations
              </label>
            </div>
            
            <div className="setting-item">
              <label>
                <input type="checkbox" />
                Use new keyboard shortcuts
              </label>
            </div>
          </section>
        )}

        {/* Legacy UI Warning */}
        {oldUserInterface.on && (
          <section className="settings-section legacy-section">
            <h2>⚠️ Legacy Interface</h2>
            <p>You're using the old settings interface. This will be removed soon.</p>
            <div className="legacy-settings">
              <button className="btn btn-warning">Switch to New Interface</button>
            </div>
          </section>
        )}

        {/* Deprecated Options */}
        {deprecatedOptions.on && (
          <section className="settings-section deprecated-section">
            <h2>Deprecated Options</h2>
            <p>These options are deprecated and should be removed</p>
            
            <div className="setting-item deprecated">
              <label>
                <input type="checkbox" disabled />
                Old analytics system (deprecated)
              </label>
            </div>
            
            <div className="setting-item deprecated">
              <label>
                <input type="checkbox" disabled />
                Legacy notification system (deprecated)
              </label>
            </div>
          </section>
        )}

        {/* Feature Flags Status */}
        <section className="settings-section flags-section">
          <h2>Feature Flags Status</h2>
          <div className="flags-grid">
            <div className={`flag-item ${homePageTestGuy.on ? 'active' : 'inactive'}`}>
              <strong>home-page-test-guy:</strong>
              <span>{homePageTestGuy.on ? 'ON' : 'OFF'}</span>
              {homePageTestGuy.value && <span className="flag-value">({homePageTestGuy.value})</span>}
            </div>
            
            <div className={`flag-item ${darkMode.on ? 'active' : 'inactive'}`}>
              <strong>dark-mode:</strong>
              <span>{darkMode.on ? 'ON' : 'OFF'}</span>
            </div>
            
            <div className={`flag-item ${advancedSettings.on ? 'active' : 'inactive'}`}>
              <strong>advanced-settings-panel:</strong>
              <span>{advancedSettings.on ? 'ON' : 'OFF'}</span>
            </div>
            
            <div className={`flag-item ${twoFactorAuth.on ? 'active' : 'inactive'}`}>
              <strong>two-factor-authentication:</strong>
              <span>{twoFactorAuth.on ? 'ON' : 'OFF'}</span>
            </div>
            
            <div className={`flag-item ${apiAccess.on ? 'active' : 'inactive'}`}>
              <strong>api-access-keys:</strong>
              <span>{apiAccess.on ? 'ON' : 'OFF'}</span>
            </div>
            
            <div className={`flag-item ${betaSettings.on ? 'active' : 'inactive'}`}>
              <strong>beta-settings-ui:</strong>
              <span>{betaSettings.on ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </section>

        {/* Debug Information */}
        {homePageTestGuy.on && (
          <section className="settings-section debug-section">
            <h2>Debug Information</h2>
            <pre className="debug-info">
              {JSON.stringify({
                userId: gb.getAttributes().id,
                experiment: 'home-page-test-guy',
                variant: homePageTestGuy.value,
                settingsLayout: getSettingsLayout(),
                timestamp: new Date().toISOString(),
                activeFlags: {
                  'home-page-test-guy': homePageTestGuy.on,
                  'advanced-settings-panel': advancedSettings.on,
                  'beta-settings-ui': betaSettings.on,
                  'dark-mode': darkMode.on
                }
              }, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}

export default Settings;
