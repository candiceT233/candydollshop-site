# Mercari Image Extraction Scripts

This directory contains helper scripts to extract product images from your Mercari store.

## ⚠️ Important Notes

- **These scripts are for extracting YOUR OWN images from YOUR OWN store**
- Mercari's Terms of Service prohibit automated scraping
- Since you own the content, this is ethically acceptable, but be aware of ToS restrictions
- Use responsibly and at your own risk

## Method 1: Browser Console Script (Easiest - Recommended)

### Steps

1. **Go to your Mercari store page**:
   - Open: https://www.mercari.com/mypage/listings/active/
   - Make sure you're logged in

2. **Open browser console**:
   - **Chrome/Edge**: Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - **Safari**: Enable Developer menu first, then `Cmd+Option+C`
   - **Firefox**: Press `F12` or `Cmd+Option+K` (Mac) / `Ctrl+Shift+K` (Windows)

3. **Run the script**:
   - Open the `browser_extractor.js` file
   - Copy the entire contents
   - Paste into the browser console
   - Press Enter

4. **Wait for downloads**:
   - The script will find all product images
   - Images will download automatically
   - Your browser may ask for permission to download multiple files (click "Allow")

5. **Move images**:
   - Find downloaded images in your Downloads folder
   - Move them to `img/products/` folder in this project

### Advantages

- ✅ No installation required
- ✅ Works while logged into Mercari
- ✅ Bypasses CORS restrictions
- ✅ Can see what's happening in real-time
- ✅ Gets images that are already loaded on the page

## Method 2: Python Script (Automated)

### Setup

1. **Install Python dependencies**:
   ```bash
   pip install requests beautifulsoup4 selenium
   ```

2. **Install ChromeDriver** (for Selenium):
   - Download from: https://chromedriver.chromium.org/
   - Or use: `brew install chromedriver` (on Mac)
   - Or: `pip install webdriver-manager` (auto-manages driver)

### Usage

```bash
cd scripts
python3 mercari_image_extractor.py
```

The script will:
1. Ask for your Mercari store URL (or use default)
2. Extract product image URLs
3. Download images to `img/products/` directory
4. Create a `images.json` file with paths

### Troubleshooting

- **If authentication is required**: You may need to manually log into Mercari in a browser first, or use Selenium with your session cookies
- **If no images found**: Mercari's HTML structure may have changed - you may need to update the selectors in the script
- **CORS errors**: These scripts run locally, so CORS shouldn't be an issue

## Method 3: Browser Extension

### Recommended Extension

**Mercari Product Image Download Assistant**
- Chrome Web Store: https://chromewebstore.google.com/detail/mercari-product-image-dow/lppjeacdgjfbmkpkkplcgjibhpnjkebh

### Steps

1. Install the extension
2. Go to your Mercari store page
3. Use the extension to download all product images
4. Move downloaded images to `img/products/` folder
5. Update `script.js` with the image paths

## Method 4: Manual Download

1. Open your Mercari store page in browser
2. Right-click on each product image
3. "Save image as..." to `img/products/` folder
4. Update `script.js` with the image paths

## After Extracting Images

Once you have images in `img/products/`:

1. **Review the images** - make sure they're the ones you want
2. **Update `script.js`** - add the image paths to the slideshow array
3. **Test locally** - use the local testing instructions in the main README
4. **Optimize if needed** - compress large images for faster loading

## Example script.js Update

After extracting images, update your slideshow array:

```javascript
const productImages = [
    'img/products/product_1.jpg',
    'img/products/product_2.jpg',
    'img/products/product_3.jpg',
    // ... etc
];
```

