const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    console.log('Taking full page screenshot...');
    await page.screenshot({ path: 'fullpage.png', fullPage: true });

    // Mobile testing
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: 'mobile.png', fullPage: true });
    
    console.log('Screenshots saved: fullpage.png, mobile.png');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
