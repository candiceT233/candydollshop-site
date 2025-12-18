# CandyDollShop Website

**Live site**: [https://candiceT233.github.io/candydollshop-site/](https://candiceT233.github.io/candydollshop-site/)

A simple, mobile-first scrolling website with a kawaii aesthetic featuring a TV-style image slideshow, store links, and social media integration.

## Local Testing & Development

### Testing the Website Locally

Before deploying to GitHub Pages, you should test the website locally to preview the design and functionality. Here are several methods:

#### Method 1: Python HTTP Server (Recommended - Simple)
1. **Navigate to project directory**:
   ```bash
   cd /path/to/candydollshop-site
   ```

2. **Start a local server**:
   - **Python 3** (most common):
     ```bash
     python3 -m http.server 8000
     ```
   - **Python 2** (if Python 3 not available):
     ```bash
     python -m SimpleHTTPServer 8000
     ```

3. **Open in browser**:
   - Open your browser and go to: `http://localhost:8000`
   - The website will be served from the project root
   - You can see `index.html` at `http://localhost:8000/index.html` or just `http://localhost:8000`

4. **Stop the server**:
   - Press `Ctrl+C` in the terminal

#### Method 2: Node.js HTTP Server
If you have Node.js installed:

1. **Install a simple server** (one-time setup):
   ```bash
   npm install -g http-server
   ```

2. **Navigate to project directory**:
   ```bash
   cd /path/to/candydollshop-site
   ```

3. **Start the server**:
   ```bash
   http-server -p 8000
   ```

4. **Open in browser**: `http://localhost:8000`

#### Method 3: VS Code Live Server Extension
If using Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The page will automatically open in your browser and reload on changes

#### Method 4: Direct File Opening (Limited)
- **Note**: Opening `index.html` directly in a browser (`file://` protocol) may cause issues with:
  - Loading external resources (CORS restrictions)
  - JavaScript modules
  - Some CSS features
- **Recommendation**: Use a local server (Method 1-3) for proper testing

### Testing Checklist

Before deploying, test locally:

- [ ] **Visual Design**:
  - [ ] Colors and styling match kawaii theme
  - [ ] All rounded corners display correctly
  - [ ] Spacing and padding look good

- [ ] **Functionality**:
  - [ ] Slideshow auto-plays correctly
  - [ ] Images transition smoothly
  - [ ] All buttons are clickable
  - [ ] Links open correctly (test in new tabs)

- [ ] **Responsive Design**:
  - [ ] Test on mobile viewport (use browser DevTools)
  - [ ] Test on tablet viewport
  - [ ] Test on desktop viewport
  - [ ] Check that elements don't overflow
  - [ ] Verify touch targets are large enough (44x44px minimum)

- [ ] **Browser Compatibility**:
  - [ ] Test in Chrome/Edge
  - [ ] Test in Safari
  - [ ] Test in Firefox
  - [ ] Test on actual mobile device (if possible)

- [ ] **Performance**:
  - [ ] Page loads quickly
  - [ ] Images load without delay
  - [ ] No console errors

### Mobile Device Testing

To test on your actual phone:

1. **Find your computer's IP address**:
   - **Mac/Linux**: Run `ifconfig` or `ip addr` in terminal
   - **Windows**: Run `ipconfig` in command prompt
   - Look for your local network IP (e.g., `192.168.1.100`)

2. **Start local server** (use Method 1 or 2 above)

3. **Access from phone**:
   - Make sure your phone is on the same Wi-Fi network
   - Open browser on phone
   - Go to: `http://YOUR_IP_ADDRESS:8000`
   - Example: `http://192.168.1.100:8000`

4. **Test scrolling, buttons, and interactions** on the actual device

### Development Workflow

1. **Make changes** to HTML/CSS/JS files
2. **Save files**
3. **Refresh browser** (or use Live Server for auto-refresh)
4. **Check changes** visually and functionally
5. **Repeat** until satisfied
6. **Test thoroughly** before committing to git
7. **Deploy to GitHub Pages** only after local testing passes

