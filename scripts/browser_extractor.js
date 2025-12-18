/**
 * Mercari Image Extractor - Browser Console Script
 * 
 * Run this script directly in your browser console while on your Mercari store page.
 * This bypasses CORS issues since it runs in the same context as the page.
 * 
 * Usage:
 * 1. Go to your Mercari store page: https://www.mercari.com/mypage/listings/active/
 * 2. Open browser console (F12 or Cmd+Option+I)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 * 5. Images will be downloaded automatically
 */

(function() {
    'use strict';
    
    console.log('🎨 Mercari Image Extractor - Starting...');
    
    // Find all product images on the page
    const findProductImages = () => {
        const images = new Set();
        
        // Method 1: Find all img tags
        document.querySelectorAll('img').forEach(img => {
            const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
            if (src && (
                src.includes('mercari') || 
                src.includes('mercari-images') ||
                src.includes('s3.amazonaws.com') ||
                src.match(/\.(jpg|jpeg|png|webp)/i)
            )) {
                // Filter out small icons/avatars (likely product images are larger)
                if (img.naturalWidth > 100 || img.width > 100) {
                    images.add(src);
                }
            }
        });
        
        // Method 2: Look for background images in CSS
        document.querySelectorAll('[style*="background-image"]').forEach(el => {
            const style = el.style.backgroundImage;
            const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
            if (match && match[1]) {
                const url = match[1];
                if (url.includes('mercari') || url.match(/\.(jpg|jpeg|png|webp)/i)) {
                    images.add(url);
                }
            }
        });
        
        // Method 3: Look for data attributes that might contain image URLs
        document.querySelectorAll('[data-image], [data-src], [data-product-image]').forEach(el => {
            const src = el.getAttribute('data-image') || 
                       el.getAttribute('data-src') || 
                       el.getAttribute('data-product-image');
            if (src && (src.includes('mercari') || src.match(/\.(jpg|jpeg|png|webp)/i))) {
                images.add(src);
            }
        });
        
        return Array.from(images);
    };
    
    // Download a single image
    const downloadImage = (url, filename) => {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(blobUrl);
                return true;
            })
            .catch(error => {
                console.error(`Failed to download ${url}:`, error);
                return false;
            });
    };
    
    // Extract filename from URL
    const getFilename = (url, index) => {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            const filename = pathname.split('/').pop();
            if (filename && filename.match(/\.(jpg|jpeg|png|webp)/i)) {
                return filename;
            }
        } catch (e) {
            // Invalid URL, use default
        }
        return `mercari_product_${index + 1}.jpg`;
    };
    
    // Main extraction process
    const extractImages = async () => {
        console.log('🔍 Searching for product images...');
        
        // Wait a bit for lazy-loaded images
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Scroll to load more images (if page uses lazy loading)
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.scrollTo(0, 0);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const images = findProductImages();
        
        if (images.length === 0) {
            console.warn('⚠️  No product images found. Try:');
            console.log('   1. Make sure you\'re on a page with product listings');
            console.log('   2. Scroll down to load all images');
            console.log('   3. Check if images are loaded in a different format');
            return;
        }
        
        console.log(`✅ Found ${images.length} image URLs`);
        console.log('📥 Starting downloads...');
        console.log('   (Your browser may ask for permission to download multiple files)');
        
        // Download images one by one with delay to avoid overwhelming the browser
        let successCount = 0;
        for (let i = 0; i < images.length; i++) {
            const url = images[i];
            const filename = getFilename(url, i);
            console.log(`[${i + 1}/${images.length}] Downloading: ${filename}`);
            
            const success = await downloadImage(url, filename);
            if (success) {
                successCount++;
            }
            
            // Small delay between downloads
            if (i < images.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        
        console.log(`\n✅ Successfully downloaded ${successCount}/${images.length} images`);
        console.log('📁 Check your Downloads folder');
        console.log('💡 Next: Move images to img/products/ folder and update script.js');
        
        // Also log the URLs for reference
        console.log('\n📋 Image URLs found:');
        images.forEach((url, i) => {
            console.log(`${i + 1}. ${url}`);
        });
        
        // Copy URLs to clipboard (if possible)
        const urlsText = images.join('\n');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(urlsText).then(() => {
                console.log('\n📋 Image URLs copied to clipboard!');
            });
        }
    };
    
    // Run extraction
    extractImages().catch(error => {
        console.error('❌ Error during extraction:', error);
    });
})();

