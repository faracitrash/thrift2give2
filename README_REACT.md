# 🚀 Panduan Menjalankan KariaKita React.js

## Prerequisites yang Dibutuhkan

### 1. Install Node.js & npm
```bash
# Download dan install dari https://nodejs.org/
# Minimal Node.js version 18.0.0
# Check version
node --version
npm --version
```

### 2. Install Git (Optional tapi recommended)
```bash
# Download dari https://git-scm.com/
git --version
```

## 🛠️ Setup Development Environment

### 1. Clone atau Download Project
```bash
# Jika menggunakan Git
git clone <repository-url>
cd kariakita-marketplace

# Atau download ZIP dan extract
```

### 2. Install Dependencies
```bash
# Install semua package yang dibutuhkan
npm install

# Atau menggunakan yarn
yarn install
```

### 3. Jalankan Development Server
```bash
# Start development server
npm run dev

# Atau dengan yarn
yarn dev
```

### 4. Buka Browser
```bash
# Aplikasi akan otomatis terbuka di:
http://localhost:3000
```

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build untuk production
npm run preview      # Preview production build
npm run lint         # Check code quality
npm run type-check   # Check TypeScript types
```

### Build untuk Production
```bash
npm run build        # Creates /dist folder
npm run preview      # Preview production build locally
```

## 🔧 VS Code Setup (Recommended)

### 1. Install Recommended Extensions
```bash
# Extensions yang sudah dikonfigurasi di .vscode/extensions.json:
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense  
- Auto Rename Tag
- Prettier - Code formatter
- ESLint
- GitLens
```

### 2. VS Code Settings
File `.vscode/settings.json` sudah dikonfigurasi dengan:
- Auto format on save
- TypeScript auto imports
- Tailwind CSS IntelliSense
- Error highlighting

### 3. Keyboard Shortcuts
```bash
Ctrl+` (backtick)    # Open integrated terminal
Ctrl+Shift+P         # Command palette
Ctrl+S               # Save (auto format)
F5                   # Start debugging
Ctrl+Shift+`         # New terminal
```

## 🌐 Development URLs

```bash
# Local Development
http://localhost:3000

# Network (untuk test di HP/device lain)
http://192.168.x.x:3000  # IP akan muncul di terminal

# Production Preview
http://localhost:4173    # Setelah npm run preview
```

## 📁 Project Structure

```
KariaKita/
├── public/              # Static assets
│   ├── favicon.svg
│   └── manifest.json
├── components/          # React components
│   ├── ui/             # UI components (buttons, inputs, etc)
│   └── figma/          # Figma imported components
├── styles/             # CSS files
│   └── globals.css     # Global Tailwind styles
├── main.tsx            # React entry point
├── App.tsx             # Main app component
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS config
├── tsconfig.json       # TypeScript config
└── package.json        # Dependencies & scripts
```

## 🐛 Troubleshooting

### Issue: Port 3000 sudah digunakan
```bash
# Solusi: Ganti port
npm run dev -- --port 3001

# Atau set environment variable
PORT=3001 npm run dev
```

### Issue: Module not found
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install

# Atau dengan yarn
rm -rf node_modules yarn.lock
yarn install
```

### Issue: TypeScript errors
```bash
# Check TypeScript
npm run type-check

# Fix auto-fixable issues
npm run lint -- --fix
```

### Issue: Build errors
```bash
# Clear cache dan rebuild
rm -rf dist
npm run build

# Check bundle size
npm run preview
```

## 🎯 Development Workflow

### 1. Edit Components
```bash
# Edit files di folder components/
# Hot reload akan otomatis refresh browser
# Check console untuk errors
```

### 2. Add New Components
```bash
# Create file di components/
# Import di App.tsx atau parent component
# Follow TypeScript types
```

### 3. Styling dengan Tailwind
```bash
# Gunakan Tailwind classes
# Custom utilities tersedia di globals.css
# Tailwind IntelliSense akan auto-suggest
```

### 4. Debug Tools
```bash
# Browser DevTools (F12)
# React Developer Tools extension
# VS Code debugger (F5)
```

## 🚀 Deployment Options

### Netlify (Recommended)
```bash
1. npm run build
2. Upload /dist folder ke Netlify
3. Set build command: npm run build
4. Set publish directory: dist
```

### Vercel
```bash
1. Connect GitHub repository
2. Auto-deploy on push
3. Zero configuration needed
```

### GitHub Pages
```bash
1. npm run build
2. Push /dist ke gh-pages branch
3. Enable GitHub Pages
```

### Self-hosted
```bash
1. npm run build
2. Upload /dist to web server
3. Configure server untuk SPA routing
```

## 📚 Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety  
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling Framework
- **Radix UI** - Headless UI Components
- **Lucide React** - Icon Library
- **ESLint** - Code Linting
- **PostCSS** - CSS Processing

## 💡 Tips Development

### Performance
```bash
# Use React.memo untuk heavy components
# Lazy load components dengan React.lazy
# Optimize images dengan format webp
```

### Code Quality
```bash
# Follow TypeScript strict mode
# Use ESLint rules
# Format code dengan Prettier
```

### Best Practices
```bash
# Use semantic HTML
# Follow accessibility guidelines  
# Test di multiple browsers
# Mobile-first responsive design
```

## 📞 Support

Jika mengalami masalah:

1. **Check terminal output** untuk error messages
2. **Clear browser cache** (Ctrl+Shift+R)
3. **Restart development server** (Ctrl+C, npm run dev)
4. **Check package.json** untuk dependencies
5. **Update packages** jika perlu: `npm update`

---

**Happy Coding! 🌱✨**

*KariaKita - Sustainable Living for Better Future*