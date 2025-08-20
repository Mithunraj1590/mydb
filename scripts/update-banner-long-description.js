const fs = require('fs');
const path = require('path');

// Read the current work details
const workDetailsPath = path.join(__dirname, '../data/work-details.json');
const workDetails = JSON.parse(fs.readFileSync(workDetailsPath, 'utf8'));

// Function to update WorkDetailBanner widgets
function updateWorkDetailBanner(workDetail) {
  if (workDetail.data && workDetail.data.widgets) {
    workDetail.data.widgets.forEach(widget => {
      if (widget.widget_type === 'WorkDetailBanner') {
        // Add longDescription if it doesn't exist
        if (!widget.data.longDescription) {
          // Try to get longDescription from WorkDetail widget if available
          const workDetailWidget = workDetail.data.widgets.find(w => w.widget_type === 'WorkDetail');
          if (workDetailWidget && workDetailWidget.data.longDescription) {
            widget.data.longDescription = workDetailWidget.data.longDescription;
          } else {
            // Fallback to description if no longDescription available
            widget.data.longDescription = widget.data.description || '';
          }
        }
      }
    });
  }
}

// Update all work details
Object.keys(workDetails).forEach(slug => {
  updateWorkDetailBanner(workDetails[slug]);
});

// Write back to file
fs.writeFileSync(workDetailsPath, JSON.stringify(workDetails, null, 2));

console.log('✅ Updated all WorkDetailBanner widgets with longDescription field');
console.log(`📝 Updated ${Object.keys(workDetails).length} work detail pages`);
