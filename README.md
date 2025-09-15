# KariaKita - Marketplace Ramah Lingkungan 🌱

Platform marketplace jual-beli barang bekas berkualitas yang mendukung panti asuhan dan lingkungan.

## 🚀 Cara Menjalankan di VS Code

### Prerequisites
- VS Code terbaru
- Browser modern (Chrome, Firefox, Edge, Safari)
- Koneksi internet (untuk load dependencies dari CDN)

### Method 1: Live Server Extension (Recommended)

#### 1. Install Live Server Extension
```bash
# Buka VS Code Extensions (Ctrl+Shift+X)
# Cari "Live Server" by Ritwick Dey
# Klik Install
```

#### 2. Buka Project
```bash
# Buka VS Code
# File > Open Folder
# Pilih folder proyek KariaKita
```

#### 3. Jalankan Aplikasi
```bash
# Klik kanan pada file index.html
# Pilih "Open with Live Server"
# Atau klik "Go Live" di status bar VS Code
```

### Method 2: Python HTTP Server

#### 1. Buka Terminal di VS Code
```bash
# Terminal > New Terminal (Ctrl+Shift+`)
```

#### 2. Jalankan Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2 (jika Python 3 tidak tersedia)
python -m SimpleHTTPServer 8000
```

#### 3. Buka Browser
```bash
# Akses: http://localhost:8000
```

### Method 3: Node.js HTTP Server

#### 1. Install http-server globally
```bash
npm install -g http-server
```

#### 2. Jalankan di terminal VS Code
```bash
http-server -p 8000
```

#### 3. Buka Browser
```bash
# Akses: http://localhost:8000
```

## 🛠️ Setup Development Environment

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ritwickdey.liveserver",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

### VS Code Settings (Optional)
```json
{
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.port": 3000,
  "liveServer.settings.CustomBrowser": "chrome",
  "liveServer.settings.root": "/",
  "liveServer.settings.file": "index.html"
}
```

## 📁 Struktur Proyek

```
KariaKita/
├── index.html              # Entry point HTML
├── App.tsx                 # Main React component
├── components/             # React components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── Marketplace.tsx
│   ├── CartContext.tsx
│   └── ...
├── styles/
│   └── globals.css         # Tailwind + Custom CSS
└── components/ui/          # Shadcn UI components
```

## 🔧 Troubleshooting

### Issue: CORS Error
**Solusi:**
- Gunakan Live Server extension
- Jangan buka file HTML langsung di browser
- Pastikan akses melalui http://localhost

### Issue: Components tidak ter-load
**Solusi:**
```bash
# Pastikan semua file .tsx dalam folder yang benar
# Check import paths di App.tsx
# Pastikan CDN dependencies ter-load
```

### Issue: Styling tidak muncul
**Solusi:**
```bash
# Check file styles/globals.css ter-load
# Pastikan Tailwind CDN ter-load di index.html
# Clear browser cache (Ctrl+F5)
```

### Issue: TypeScript errors
**Solusi:**
```bash
# Install TypeScript extension untuk VS Code
# Restart VS Code
# Check syntax di file .tsx
```

## 🌐 URL Development

- **Local Server**: http://localhost:3000 (Live Server)
- **Python Server**: http://localhost:8000
- **Node Server**: http://localhost:8000

## 📝 Development Workflow

### 1. Edit Code
```bash
# Buka file .tsx di VS Code
# Edit component sesuai kebutuhan
# Save file (Ctrl+S)
```

### 2. Live Reload
```bash
# Live Server akan auto-reload browser
# Perubahan langsung terlihat
```

### 3. Debug
```bash
# Buka browser DevTools (F12)
# Check Console untuk errors
# Inspect Elements untuk styling
```

## 🚀 Production Build

### Build untuk Production
```bash
# Untuk hosting, upload semua files:
# - index.html
# - App.tsx
# - components/
# - styles/
```

### Hosting Options
- **Netlify**: Drag & drop folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push ke GitHub
- **Firebase Hosting**: firebase deploy

## 📚 Additional Resources

### React + TypeScript
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindui.com)

### Shadcn/ui
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Component Library](https://ui.shadcn.com/docs/components)

## 🐛 Common Issues & Solutions

### 1. Module Resolution
```typescript
// Jika ada error import, pastikan path benar:
import { Header } from "./components/Header";
// Bukan:
import { Header } from "components/Header";
```

### 2. Babel Transform
```html
<!-- Pastikan Babel ter-load di index.html: -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

### 3. React Dependencies
```html
<!-- Pastikan React CDN ter-load: -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

## 📞 Support

Jika mengalami masalah:
1. Check browser console untuk errors
2. Pastikan semua dependencies ter-load
3. Restart Live Server
4. Clear browser cache
5. Check file permissions

---

**Happy Coding! 🌱✨**

*KariaKita - Sustainable Living for Better Future*