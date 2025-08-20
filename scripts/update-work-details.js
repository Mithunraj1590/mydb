const fs = require('fs');
const path = require('path');

// Function to parse longDescription and format it with HTML tags (CMS-style)
function parseLongDescription(longDescription) {
  if (!longDescription) return "";
  
  // Split by double newlines to separate paragraphs
  const paragraphs = longDescription.split('\n\n');
  
  let htmlContent = '';
  
  paragraphs.forEach(paragraph => {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) return;
    
    // Check if this paragraph starts with an emoji and looks like a section header
    if (trimmedParagraph.match(/^[🎯👥💼🎨🔧🌍]/)) {
      // This is a section header with emoji
      htmlContent += `<h3>${trimmedParagraph}</h3>`;
    } else if (trimmedParagraph.match(/^[A-Z][A-Z\s]+:$/)) {
      // This is a section header in ALL CAPS with colon
      htmlContent += `<h3>${trimmedParagraph}</h3>`;
    } else if (trimmedParagraph.includes('\n') && trimmedParagraph.includes(':')) {
      // This might be a list section with header
      const lines = trimmedParagraph.split('\n');
      const header = lines[0];
      const listItems = lines.slice(1).filter(line => line.trim());
      
      htmlContent += `<h4>${header}</h4>`;
      if (listItems.length > 0) {
        htmlContent += '<ul>';
        listItems.forEach(item => {
          const cleanItem = item.replace(/^[-•*]\s*/, '').trim();
          if (cleanItem) {
            htmlContent += `<li>${cleanItem}</li>`;
          }
        });
        htmlContent += '</ul>';
      }
    } else if (trimmedParagraph.includes('\n')) {
      // This is a list section without a header
      const lines = trimmedParagraph.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        // Check if it's a list (starts with bullet points or has multiple lines)
        const isList = lines.some(line => line.match(/^[-•*]/)) || lines.length > 2;
        
        if (isList) {
          htmlContent += '<ul>';
          lines.forEach(line => {
            const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
            if (cleanLine) {
              htmlContent += `<li>${cleanLine}</li>`;
            }
          });
          htmlContent += '</ul>';
        } else {
          // Multiple lines but not a list - treat as paragraphs
          lines.forEach(line => {
            if (line.trim()) {
              htmlContent += `<p>${line.trim()}</p>`;
            }
          });
        }
      }
    } else {
      // This is a regular paragraph
      htmlContent += `<p>${trimmedParagraph}</p>`;
    }
  });
  
  return htmlContent;
}

// Read the works data to get longDescription
const worksData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/works.json'), 'utf8'));
const workDetailsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/work-details.json'), 'utf8'));

// Update each work detail with parsed HTML content
Object.keys(workDetailsData).forEach(slug => {
  const workDetail = workDetailsData[slug];
  const work = worksData.find(w => w.slug === slug);
  
  if (work && work.longDescription) {
    // Find the WorkDetail widget and update its description
    workDetail.data.widgets.forEach(widget => {
      if (widget.widget_type === 'WorkDetail') {
        widget.data.description = parseLongDescription(work.longDescription);
      }
    });
  }
});

// Write the updated work details back to file
fs.writeFileSync(
  path.join(__dirname, '../data/work-details.json'), 
  JSON.stringify(workDetailsData, null, 2)
);

console.log('✅ Updated work details with parsed HTML content');
console.log('📝 Each work detail now uses the longDescription with proper HTML formatting');
