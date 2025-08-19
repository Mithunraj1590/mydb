#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/works.json');
const DETAILS_FILE = path.join(__dirname, '../data/work-details.json');

console.log('🔄 Checking for data changes...');

try {
  // Check if data files exist
  if (!fs.existsSync(DATA_FILE) || !fs.existsSync(DETAILS_FILE)) {
    console.log('❌ Data files not found. Please create works first through the admin panel.');
    process.exit(1);
  }

  // Check git status
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  const dataFilesChanged = status.includes('data/works.json') || status.includes('data/work-details.json');

  if (!dataFilesChanged) {
    console.log('✅ No data changes detected.');
    return;
  }

  console.log('📝 Data files have changed. Committing to GitHub...');

  // Add data files to git
  execSync('git add data/works.json data/work-details.json', { stdio: 'inherit' });

  // Commit with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const commitMessage = `Update portfolio data - ${timestamp}`;
  
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  console.log('🚀 Pushing to GitHub...');
  execSync('git push', { stdio: 'inherit' });

  console.log('✅ Data successfully committed and pushed to GitHub!');
  console.log('💾 Your works are now permanently saved in the repository.');

} catch (error) {
  console.error('❌ Error committing data:', error.message);
  console.log('💡 You can manually commit the data files:');
  console.log('   git add data/works.json data/work-details.json');
  console.log('   git commit -m "Update portfolio data"');
  console.log('   git push');
}
