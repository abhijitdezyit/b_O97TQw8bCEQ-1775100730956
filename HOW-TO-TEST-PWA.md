# How to Test Your PWA Installation

PWAs (Progressive Web Apps) are installed through the browser, not via command line. Here's how to test your GymFlow PWA:

## Step 1: Build the Production Version

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with the service worker and manifest.

## Step 2: Serve the Production Build

```bash
npm run preview
```

This will start a local server (usually at `http://localhost:4173`). The PWA features work in preview mode.

## Step 3: Install the PWA

### On Desktop (Chrome/Edge):

1. Open the app in Chrome or Edge browser
2. Look for the **install icon** (⊕ or computer icon) in the address bar
3. Click it and select "Install"

**OR**

1. Click the browser menu (⋮)
2. Select "Install GymFlow" or "Install app"

**OR**

1. Go to Settings page in the app
2. Click the "Install App" button (if the browser supports it)

### On Mobile (Chrome Android):

1. Open the app in Chrome
2. Tap the menu (⋮)
3. Select "Install app" or "Add to Home Screen"
4. Confirm installation

### On iOS (Safari):

1. Open the app in Safari
2. Tap the Share button (□↑)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

**Note:** iOS requires iOS 16.4+ for full PWA support

## Step 4: Verify Installation

Once installed, the app will:
- ✅ Open in its own window (no browser UI)
- ✅ Appear in your app launcher/home screen
- ✅ Work offline (after first load)
- ✅ Show "GymFlow" as the app name
- ✅ Use your gym logo as the icon

## Troubleshooting

### "Install" button is disabled or not showing?

This is normal! The browser's `beforeinstallprompt` event only fires when:
- App is served over HTTPS (or localhost)
- App meets PWA criteria (manifest, service worker, icons)
- App is not already installed
- User hasn't dismissed the prompt recently

**Solution:** Use the manual installation method from the browser menu instead.

### Can't see install option in browser menu?

**Check:**
1. Are you using `npm run preview` (not `npm run dev`)?
2. Is the browser supported? (Chrome, Edge, Safari iOS 16.4+)
3. Is the app already installed? Check your app drawer/home screen
4. Try in an incognito/private window

### Service worker not updating?

1. Open DevTools (F12)
2. Go to Application → Service Workers
3. Click "Unregister" on old service workers
4. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Icons not showing correctly?

The placeholder icons are simple colored squares. To use your gym logo:
1. Create 192x192 and 512x512 PNG versions of your logo
2. Replace `public/icon-192.png` and `public/icon-512.png`
3. Rebuild: `npm run build`
4. Uninstall and reinstall the app

## Testing Offline Mode

1. Install the app
2. Open DevTools (F12)
3. Go to Network tab
4. Check "Offline" checkbox
5. Refresh the app - it should still work!

## Deployment for Real Testing

For the best PWA experience, deploy to a real server with HTTPS:

**Free Options:**
- Vercel: `npm i -g vercel && vercel`
- Netlify: Drag & drop the `dist/` folder
- GitHub Pages: Push to GitHub and enable Pages
- Cloudflare Pages: Connect your repo

Once deployed with HTTPS, the PWA install prompt will work more reliably.

## Debug Information

Open the browser console to see PWA debug info:
- Is the app in standalone mode?
- Is HTTPS enabled?
- Is it localhost?
- Browser user agent

Look for: `PWA Debug Info: { ... }`

## Common Questions

**Q: Why can't I install via npm command?**
A: PWAs are web apps that run in browsers. They're installed through the browser UI, not command line.

**Q: Do I need to publish to app stores?**
A: No! PWAs are distributed via URL. Users visit your website and install directly from their browser.

**Q: Will it work on all devices?**
A: Most modern browsers support PWAs:
- ✅ Chrome/Edge (Android & Desktop)
- ✅ Safari (iOS 16.4+)
- ✅ Firefox (Android)
- ⚠️ Limited support on older iOS versions

**Q: How do users update the app?**
A: Automatically! When you deploy a new version, the service worker detects it and prompts users to refresh.

## Next Steps

1. Replace placeholder icons with your gym logo
2. Deploy to a hosting service with HTTPS
3. Share the URL with users
4. Users can install directly from their browser!

Enjoy your PWA! 🎉
