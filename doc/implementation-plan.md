# CandyDollShop Website - Implementation Plan

## Project Overview
A simple, mobile-first scrolling website with a kawaii aesthetic featuring a TV-style image slideshow, store links, and social media integration.

## Design Requirements

### Color Scheme
- **Primary Colors**: Soft pastels (pink #FFB6C1, lavender #E6E6FA, peach #FFDAB9)
- **Accent Colors**: Light yellow (#FFFACD), mint green (#F0FFF0)
- **Background**: Off-white or very light pastel (#FFFEFE or #FFF5F5)
- **Text**: Dark gray (#4A4A4A) or soft black (#2C2C2C)
- **Cards**: White with soft shadows, rounded corners (border-radius: 20-30px)

### Visual Style
- **Layout**: Vertical scrolling, mobile-first design
- **Typography**: Rounded, friendly sans-serif fonts (e.g., "Comic Sans MS", "Nunito", or "Quicksand")
- **Elements**: 
  - All cards and containers with rounded edges (border-radius: 20-30px)
  - Soft shadows (box-shadow: 0 4px 15px rgba(0,0,0,0.1))
  - Generous padding and spacing
  - Cute emoji or icon accents where appropriate

## Page Structure

### 1. Main Content - TV Box Slideshow
- **Design**: 
  - Square/rectangular container with TV-like frame
  - Rounded corners (border-radius: 15-20px)
  - Inner border or shadow to simulate TV screen
  - Centered on mobile viewport
  - Auto-playing image slideshow
- **Images**:
  - **Challenge**: Mercari store image crawling may not be feasible due to:
    - CORS restrictions
    - No public API
    - Anti-scraping measures
  - **Solution Options**:
    1. **Manual Upload**: Create `img/products/` folder, manually add product images
    2. **Placeholder Images**: Use cute placeholder images initially
    3. **Hybrid Approach**: Start with placeholders, add manual uploads later
  - **Recommendation**: Start with placeholder images, document manual upload process

### 2. Mercari Shop Button
- **Design**: 
  - Large, rounded button
  - Kawaii styling (pink/peach background, rounded edges)
  - Hover effects (slight scale or color change)
  - Icon: Use existing `img/mercari-logo.png` or text button
- **Link**: https://www.mercari.com/mypage/listings/active/
- **Placement**: Below TV box with generous spacing

### 3. Instagram Section
- **Design**:
  - Card-style container
  - Instagram logo (use existing `img/instagram-6338393_1280.webp`)
  - Text: "Follow us on Instagram" or similar
  - Rounded edges, kawaii styling
- **Link**: https://www.instagram.com/candicedeepspacehunter?igsh=MWRna29ldGloYXVqaQ%3D%3D&utm_source=qr
- **Placement**: Below Mercari button

## Technical Implementation

### File Structure
```
candydollshop-site/
├── index.html          # Main HTML file
├── styles.css          # All styling (or can be inline)
├── script.js           # Slideshow functionality
├── img/
│   ├── shop-logo-1.JPG
│   ├── mercari-logo.png
│   ├── instagram-6338393_1280.webp
│   └── products/       # Product images for slideshow (to be created)
├── doc/
│   └── implementation-plan.md
└── README.md           # GitHub repository documentation
```

### Technologies
- **HTML5**: Semantic structure
- **CSS3**: 
  - Flexbox/Grid for layout
  - CSS animations for slideshow transitions
  - Media queries for responsive design
- **JavaScript (Vanilla)**: 
  - Image slideshow logic
  - Auto-play functionality
  - Smooth transitions

### Key Features Implementation

#### Slideshow Functionality
- Auto-advance every 3-5 seconds
- Smooth fade or slide transitions
- Loop infinitely
- Touch/swipe support for mobile (optional enhancement)
- Fallback: If no images, show placeholder

#### Responsive Design
- Mobile-first approach
- Maximum width constraints for larger screens
- Touch-friendly button sizes (min 44x44px)
- Proper viewport meta tag

## GitHub Pages Setup

### Repository Configuration
1. **Repository Name**: `candydollshop-site` (or user's preference)
2. **Branch**: `main` or `gh-pages`
3. **Settings**: Enable GitHub Pages in repository settings
4. **Source**: Root directory or `/docs` folder

### Required Files
- `index.html` (must be in root or specified folder)
- `.gitignore` (exclude unnecessary files)
- `README.md` (project description)

## Implementation Steps

### Phase 1: Basic Structure
1. Create `index.html` with semantic HTML structure
2. Set up basic CSS with kawaii color scheme
3. Create responsive container layout
4. Add viewport meta tag for mobile

### Phase 2: TV Box Slideshow
1. Design TV-like frame container
2. Implement image slideshow with CSS/JS
3. Add placeholder images or manual image setup
4. Test auto-play and transitions

### Phase 3: Interactive Elements
1. Create Mercari shop button with styling
2. Add Instagram section with logo
3. Implement hover effects and interactions
4. Test all links

### Phase 4: Polish & Deploy
1. Final styling adjustments
2. Test on multiple devices/screen sizes
3. Create README.md
4. Initialize git repository
5. Push to GitHub
6. Configure GitHub Pages

## Image Management Strategy

### Initial Approach
- Use placeholder images or sample kawaii images for slideshow
- Document the process for adding product images manually

### Future Enhancement Options
1. **Manual Upload Process**:
   - Create `img/products/` directory
   - Add images with descriptive names
   - Update JavaScript array with image paths

2. **Alternative Solutions** (if Mercari crawling becomes possible):
   - Server-side scraping script (requires backend)
   - Browser extension for manual image collection
   - Third-party service integration

## Browser Compatibility
- Modern browsers (Chrome, Safari, Firefox, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Performance Considerations
- Optimize images (compress, use appropriate formats)
- Lazy loading for slideshow images
- Minimal JavaScript for fast load times
- CSS-only animations where possible

## Accessibility
- Semantic HTML elements
- Alt text for all images
- Proper button/link labels
- Adequate color contrast
- Keyboard navigation support

## Notes
- Store logo (`img/shop-logo-1.JPG`) will not be included in the initial implementation
- Mercari image crawling is unlikely to work client-side; manual image management is recommended
- Design should feel playful but not overwhelming
- Keep code simple and maintainable

