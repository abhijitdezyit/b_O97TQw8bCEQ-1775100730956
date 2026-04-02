# PWA Setup Instructions

Your GymFlow app is now configured as a Progressive Web App (PWA)! 

## What's Been Done

✅ Installed `vite-plugin-pwa` and `workbox-window`
✅ Configured PWA plugin in `vite.config.ts`
✅ Added PWA meta tags to `index.html`
✅ Created PWA install prompt component
✅ Registered service worker in `main.tsx`
✅ Added TypeScript declarations for PWA

## Icon Setup Required

You need to create two PNG icons for your PWA:

1. **icon-192.png** - 192x192 pixels
2. **icon-512.png** - 512x512 pixels

### Option 1: Using Online Tools
- Visit [favicon.io](https://favicon.io/favicon-converter/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
- Upload your gym logo
- Generate icons in 192x192 and 512x512 sizes
- Download and replace the placeholder files in `/public/`

### Option 2: Using Design Software
- Open your logo in Figma, Photoshop, or similar
- Export as PNG at 192x192 and 512x512 pixels
- Save as `icon-192.png` and `icon-512.png` in `/public/`

### Option 3: Using ImageMagick (if installed)
```bash
# Convert your logo to required sizes
convert your-logo.png -resize 192x192 public/icon-192.png
convert your-logo.png -resize 512x512 public/icon-512.png
```

## Testing Your PWA

### Development
```bash
npm run dev
```
The PWA will work in development mode with hot reload.

### Production Build
```bash
npm run build
npm run preview
```

### Testing on Mobile
1. Build and deploy your app to a server with HTTPS
2. Open the app in Chrome/Safari on your mobile device
3. You should see an "Install" prompt
4. Install the app to your home screen

### Testing Install Prompt
- The install prompt will appear automatically on supported browsers
- You can dismiss it and it won't show again in that session
- Clear browser data to test the prompt again

## PWA Features

✅ **Offline Support** - App works without internet connection
✅ **Install Prompt** - Users can install app to home screen
✅ **Auto Updates** - Service worker updates automatically
✅ **App-like Experience** - Runs in standalone mode
✅ **Fast Loading** - Assets are cached for quick access
✅ **Mobile Optimized** - Responsive design for all devices

## Customization

### Change Theme Color
Edit `vite.config.ts` and `index.html`:
```typescript
theme_color: '#0f172a', // Your brand color
background_color: '#0f172a',
```

### Change App Name
Edit `vite.config.ts`:
```typescript
name: 'GymFlow - Fitness Management',
short_name: 'GymFlow',
```

### Adjust Caching Strategy
Edit `workbox` configuration in `vite.config.ts` to customize caching behavior.

## Browser Support

- ✅ Chrome/Edge (Android & Desktop)
- ✅ Safari (iOS 16.4+)
- ✅ Firefox (Android)
- ⚠️ iOS Safari requires iOS 16.4+ for full PWA support

## Deployment Notes

- PWAs require HTTPS (except localhost)
- Service workers only work on HTTPS domains
- Test thoroughly on target devices before production release

## Troubleshooting

### Install prompt not showing?
- Clear browser cache and data
- Ensure you're on HTTPS (or localhost)
- Check browser console for errors
- Some browsers require user engagement before showing prompt

### Service worker not updating?
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Clear application cache in DevTools
- Unregister old service workers in DevTools > Application > Service Workers

### Icons not displaying?
- Ensure icon files are exactly 192x192 and 512x512 pixels
- Check file names match configuration
- Verify icons are in `/public/` folder
- Clear cache and reinstall app

## Next Steps

1. Replace placeholder icons with your actual gym logo
2. Test the app on mobile devices
3. Deploy to a production server with HTTPS
4. Share the app URL with users
5. Users can install it directly from their browser!

Enjoy your new PWA! 🎉
