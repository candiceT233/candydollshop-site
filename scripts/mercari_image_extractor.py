#!/usr/bin/env python3
"""
Mercari Image Extractor
A helper script to extract product images from your Mercari store page.

Note: This script is for extracting YOUR OWN images from YOUR OWN store.
Mercari's ToS prohibits scraping, but since you own the content, this is a practical solution.

Usage:
    python3 mercari_image_extractor.py

Requirements:
    pip install requests beautifulsoup4 selenium

Alternative: Use browser extension "Mercari Product Image Download Assistant"
"""

import os
import sys
import requests
from urllib.parse import urljoin, urlparse
import json
import time

# Try to import required libraries
try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Error: beautifulsoup4 is not installed.")
    print("Install it with: pip install beautifulsoup4")
    sys.exit(1)

try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False
    print("Note: Selenium not available. Will try basic requests method.")
    print("For JavaScript-heavy pages, install: pip install selenium")


def download_image(img_url, save_path):
    """Download an image from URL and save it locally."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(img_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"  Failed to download {img_url}: {e}")
        return False


def extract_with_selenium(store_url, output_dir):
    """
    Extract images using Selenium (for JavaScript-rendered pages).
    This is more reliable for modern web apps.
    """
    if not SELENIUM_AVAILABLE:
        return []
    
    print("Using Selenium to extract images...")
    print("Note: This will open a browser window.")
    
    # Setup Chrome options
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # Run in background
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = None
    try:
        driver = webdriver.Chrome(options=options)
        driver.get(store_url)
        
        # Wait for page to load
        time.sleep(5)
        
        # Find all product images
        # Mercari typically uses specific classes/selectors for product images
        # These selectors may need to be updated based on Mercari's current HTML structure
        images = []
        
        # Try multiple selectors that Mercari might use
        selectors = [
            'img[src*="mercari"]',
            '.item-image img',
            '.product-image img',
            '[data-testid*="image"] img',
            'img[alt*="商品"]',  # Japanese for "product"
        ]
        
        for selector in selectors:
            try:
                elements = driver.find_elements(By.CSS_SELECTOR, selector)
                if elements:
                    for elem in elements:
                        img_url = elem.get_attribute('src') or elem.get_attribute('data-src')
                        if img_url and 'mercari' in img_url.lower():
                            images.append(img_url)
                    break
            except:
                continue
        
        # Also try to get images from page source
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')
        img_tags = soup.find_all('img', src=True)
        
        for img in img_tags:
            src = img.get('src') or img.get('data-src')
            if src and ('mercari' in src.lower() or 'product' in src.lower()):
                if src not in images:
                    images.append(src)
        
        return list(set(images))  # Remove duplicates
        
    except Exception as e:
        print(f"Error with Selenium: {e}")
        print("Make sure ChromeDriver is installed: https://chromedriver.chromium.org/")
        return []
    finally:
        if driver:
            driver.quit()


def extract_with_requests(store_url, output_dir):
    """
    Extract images using requests and BeautifulSoup.
    Works for static HTML pages.
    """
    print("Using requests to extract images...")
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(store_url, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        images = []
        
        # Find all img tags
        img_tags = soup.find_all('img')
        
        for img in img_tags:
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
            if src:
                # Make absolute URL if relative
                if src.startswith('//'):
                    src = 'https:' + src
                elif src.startswith('/'):
                    src = urljoin(store_url, src)
                
                # Filter for product images (Mercari typically uses specific domains)
                if 'mercari' in src.lower() and ('jpg' in src.lower() or 'png' in src.lower() or 'webp' in src.lower()):
                    if src not in images:
                        images.append(src)
        
        return images
        
    except Exception as e:
        print(f"Error fetching page: {e}")
        return []


def main():
    # Configuration
    STORE_URL = input("Enter your Mercari store URL (e.g., https://www.mercari.com/mypage/listings/active/): ").strip()
    if not STORE_URL:
        STORE_URL = "https://www.mercari.com/mypage/listings/active/"
        print(f"Using default URL: {STORE_URL}")
    
    # Create output directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    output_dir = os.path.join(project_root, 'img', 'products')
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"\nExtracting images from: {STORE_URL}")
    print(f"Output directory: {output_dir}\n")
    
    # Try Selenium first (more reliable for JS-heavy pages)
    images = []
    if SELENIUM_AVAILABLE:
        images = extract_with_selenium(STORE_URL, output_dir)
    
    # Fallback to requests if Selenium didn't work or isn't available
    if not images:
        images = extract_with_requests(STORE_URL, output_dir)
    
    if not images:
        print("\n⚠️  No images found. Possible reasons:")
        print("   1. The page requires authentication (login)")
        print("   2. The page uses JavaScript that requires Selenium")
        print("   3. Mercari's HTML structure has changed")
        print("\n💡 Alternative: Use browser extension 'Mercari Product Image Download Assistant'")
        print("   https://chromewebstore.google.com/detail/mercari-product-image-dow/lppjeacdgjfbmkpkkplcgjibhpnjkebh")
        return
    
    print(f"\nFound {len(images)} unique image URLs")
    print("\nDownloading images...")
    
    downloaded = []
    for i, img_url in enumerate(images, 1):
        # Extract filename from URL
        parsed = urlparse(img_url)
        filename = os.path.basename(parsed.path)
        if not filename or '.' not in filename:
            filename = f"product_{i}.jpg"
        
        save_path = os.path.join(output_dir, filename)
        
        print(f"[{i}/{len(images)}] Downloading: {filename}")
        if download_image(img_url, save_path):
            downloaded.append(save_path)
    
    print(f"\n✅ Successfully downloaded {len(downloaded)} images to {output_dir}")
    
    # Create a JSON file with image paths for easy reference
    image_list = [os.path.relpath(path, project_root) for path in downloaded]
    json_path = os.path.join(output_dir, 'images.json')
    with open(json_path, 'w') as f:
        json.dump(image_list, f, indent=2)
    
    print(f"📝 Image list saved to: {json_path}")
    print("\nNext steps:")
    print("1. Review the downloaded images")
    print("2. Update script.js to include these image paths")
    print("3. Test the slideshow locally")


if __name__ == "__main__":
    main()

