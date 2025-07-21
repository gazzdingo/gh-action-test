#!/usr/bin/env node

/**
 * Count feature flag references in the codebase
 * This helps verify that the GrowthBook coderefs action finds all references
 */

const fs = require('fs');
const path = require('path');

// Feature flags to count
const FLAGS_TO_COUNT = [
  'home-page-test-guy',
  'dark-mode',
  'new-homepage-layout',
  'advanced-analytics',
  'beta-features-2024',
  'social-login',
  'advanced-settings-panel',
  'two-factor-authentication',
  'api-access-keys',
  'real-time-updates',
  'dashboard-personalization',
  'beta-settings-ui',
  'card-animations',
  'export-dashboard-data',
  'old-legacy-feature',
  'legacy-chart-system',
  'legacy-settings-ui',
  'deprecated-user-options',
  'old-metrics-display'
];

function countFlagInFile(filePath, flagName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Count different patterns:
    // - useFeature('flag-name')
    // - gb.is_on("flag-name")  
    // - "flagKey": "flag-name"
    // - Simple string references
    
    const patterns = [
      new RegExp(`useFeature\\(['"\`]${flagName}['"\`]\\)`, 'g'),
      new RegExp(`is_on\\(['"\`]${flagName}['"\`]\\)`, 'g'),
      new RegExp(`get_feature_value\\(['"\`]${flagName}['"\`]`, 'g'),
      new RegExp(`['"\`]flagKey['"\`]\\s*:\\s*['"\`]${flagName}['"\`]`, 'g'),
      new RegExp(`['"\`]${flagName}['"\`]`, 'g')
    ];
    
    let totalCount = 0;
    const matches = [];
    
    patterns.forEach((pattern, index) => {
      const patternMatches = content.match(pattern) || [];
      if (patternMatches.length > 0) {
        matches.push({
          pattern: index,
          count: patternMatches.length,
          matches: patternMatches
        });
        totalCount += patternMatches.length;
      }
    });
    
    return {
      count: totalCount,
      matches: matches,
      lines: content.split('\n').map((line, index) => ({
        number: index + 1,
        content: line,
        hasFlag: line.includes(flagName)
      })).filter(line => line.hasFlag)
    };
  } catch (error) {
    return { count: 0, matches: [], lines: [], error: error.message };
  }
}

function scanDirectory(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const results = {};
  
  function scanRecursive(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanRecursive(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        const relativePath = path.relative(process.cwd(), fullPath);
        results[relativePath] = {};
        
        FLAGS_TO_COUNT.forEach(flag => {
          const flagResult = countFlagInFile(fullPath, flag);
          if (flagResult.count > 0) {
            results[relativePath][flag] = flagResult;
          }
        });
        
        // Remove files with no flags
        if (Object.keys(results[relativePath]).length === 0) {
          delete results[relativePath];
        }
      }
    });
  }
  
  scanRecursive(dir);
  return results;
}

// Main execution
console.log('🔍 Scanning for GrowthBook feature flag references...\n');

const results = scanDirectory('./src');
const summary = {};

// Calculate summary
FLAGS_TO_COUNT.forEach(flag => {
  summary[flag] = {
    totalReferences: 0,
    filesWithFlag: 0,
    files: []
  };
});

Object.keys(results).forEach(filePath => {
  Object.keys(results[filePath]).forEach(flag => {
    const flagData = results[filePath][flag];
    summary[flag].totalReferences += flagData.count;
    summary[flag].filesWithFlag += 1;
    summary[flag].files.push({
      path: filePath,
      references: flagData.count,
      lines: flagData.lines.map(l => l.number)
    });
  });
});

// Print results
console.log('📊 Feature Flag Reference Summary:');
console.log('=' .repeat(50));

let grandTotal = 0;
FLAGS_TO_COUNT.forEach(flag => {
  const flagSummary = summary[flag];
  if (flagSummary.totalReferences > 0) {
    console.log(`\n🚩 ${flag}:`);
    console.log(`   Total references: ${flagSummary.totalReferences}`);
    console.log(`   Files with flag: ${flagSummary.filesWithFlag}`);
    
    flagSummary.files.forEach(file => {
      console.log(`   📄 ${file.path}: ${file.references} references (lines: ${file.lines.join(', ')})`);
    });
    
    grandTotal += flagSummary.totalReferences;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`🎯 TOTAL FEATURE FLAG REFERENCES: ${grandTotal}`);
console.log(`📁 FILES SCANNED: ${Object.keys(results).length}`);
console.log(`🚩 FLAGS WITH REFERENCES: ${FLAGS_TO_COUNT.filter(flag => summary[flag].totalReferences > 0).length}`);

// Special focus on home-page-test-guy
const homePageTestGuy = summary['home-page-test-guy'];
if (homePageTestGuy.totalReferences > 0) {
  console.log('\n🎯 FOCUS: home-page-test-guy Feature');
  console.log('=' .repeat(40));
  console.log(`Total references: ${homePageTestGuy.totalReferences}`);
  console.log(`Files: ${homePageTestGuy.filesWithFlag}`);
  console.log('File breakdown:');
  homePageTestGuy.files.forEach(file => {
    console.log(`  • ${file.path}: ${file.references} references`);
  });
}

// Export for potential use by other tools
if (process.argv.includes('--json')) {
  console.log('\n📋 JSON Export:');
  console.log(JSON.stringify({
    summary: summary,
    totalReferences: grandTotal,
    scanDate: new Date().toISOString()
  }, null, 2));
}

console.log('\n✅ Scan completed!');
console.log('💡 This data should match what the GrowthBook coderefs action finds.');
