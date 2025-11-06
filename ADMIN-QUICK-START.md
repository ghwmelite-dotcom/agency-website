# Admin Portal - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### 1. Access the Admin Portal

```
URL: http://localhost:4321/admin/login
Username: admin
Password: admin123
```

### 2. Make Your First Edit

1. Log in with the credentials above
2. You'll see the **Hero Section** editor
3. Edit any field (title, subtitle, stats)
4. Click **"Save Changes"** at the top
5. Open `http://localhost:4321` in a new tab
6. Refresh to see your changes! 🎉

---

## 📱 What Can You Edit?

### ✅ Currently Available

- **Hero Section**
  - Main title
  - Subtitle/description
  - 3 statistics with numbers and labels
  
- **Site Settings**
  - Site name
  - Tagline
  - Email
  - Phone number

### 🔜 Coming Soon

- Services management
- Portfolio projects
- Blog posts
- Team members
- Contact page content

---

## 🎯 How It Works

```
┌─────────────┐
│ Admin Login │  → Enter credentials
└──────┬──────┘
       ↓
┌─────────────┐
│  Dashboard  │  → Edit content in forms
└──────┬──────┘
       ↓
┌─────────────┐
│ Save Button │  → Saves to API/Database
└──────┬──────┘
       ↓
┌─────────────┐
│   Website   │  → Loads content from API
└─────────────┘
```

**Your changes appear instantly on the live site!**

---

## 🔧 Development vs Production

### Development (Current Setup)
- ✅ Content stored in memory
- ✅ Simple authentication
- ✅ Perfect for testing
- ❌ Content resets on server restart

### Production (Recommended)
- ✅ Content stored in Cloudflare D1 database
- ✅ Persistent storage
- ✅ Secure authentication
- ✅ Scalable

**See `ADMIN-GUIDE.md` for production deployment instructions.**

---

## ⚠️ Important Notes

### Security

- **Change the default password** before deploying to production
- Default credentials are: `admin` / `admin123`
- These are only for development/testing

### Saving Changes

- Always click **"Save Changes"** after editing
- Green success message confirms save
- Refresh your website to see updates

### Browser Compatibility

- Works best in Chrome, Firefox, Safari, Edge
- Use latest browser version for best experience

---

## 📚 Files Created

```
agency-website/
├── ADMIN-GUIDE.md                    # Detailed documentation
├── ADMIN-QUICK-START.md              # This file
├── schema.sql                        # Database schema
├── src/
│   ├── pages/
│   │   └── admin/
│   │       ├── login.astro           # Login page
│   │       └── dashboard.astro       # Admin dashboard
│   └── components/
│       └── HeroDynamic.astro         # Dynamic hero component
└── functions/
    └── api/
        └── admin/
            ├── login.ts              # Auth API
            └── content.ts            # Content API
```

---

## 💡 Quick Tips

1. **Test Before Saving**: Make sure your text looks good before saving
2. **Keep It Concise**: Shorter text is more impactful
3. **Use Numbers**: Stats with numbers build trust (e.g., "500+ Projects")
4. **Mobile Check**: Your changes work on all devices automatically

---

## 🆘 Troubleshooting

### Can't see changes?
→ Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Login not working?
→ Make sure dev server is running: `npm run dev`

### Content disappeared?
→ In development mode, content resets on restart (expected)

---

## 🎓 Next Steps

1. ✅ Log in and explore the dashboard
2. ✅ Edit the hero section
3. ✅ Update site settings
4. 📖 Read `ADMIN-GUIDE.md` for advanced features
5. 🚀 Deploy to production when ready

---

**Ready to manage your content? Log in now!**

👉 http://localhost:4321/admin/login

