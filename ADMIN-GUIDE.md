# Admin Portal Guide

## 🎉 Welcome to Your Admin Portal!

You now have a fully functional CMS (Content Management System) to manage your website content without touching any code!

---

## 🚀 Quick Start

### Accessing the Admin Portal

1. **Start your development server**: `npm run dev`
2. **Navigate to**: `http://localhost:4321/admin/login`
3. **Login with default credentials**:
   - **Username**: `admin`
   - **Password**: `admin123`
   - ⚠️ **Important**: Change these credentials in production!

### After Login

You'll be redirected to the admin dashboard at `/admin/dashboard` where you can manage all your site content.

---

## 📋 Features

### What You Can Edit:

#### 1. **Hero Section**
- Main title
- Subtitle description
- 3 statistics (number + label)
- Updates appear instantly on the homepage

#### 2. **Services** (Coming soon)
- Add/edit/remove services
- Change service descriptions
- Reorder services

#### 3. **Portfolio** (Coming soon)
- Add/edit/remove projects
- Upload project images
- Set featured projects

#### 4. **Site Settings**
- Site name
- Tagline
- Contact email
- Phone number

---

## 🎯 How to Use

### Making Changes

1. **Click on any section** in the sidebar (Hero, Services, Portfolio, Settings)
2. **Edit the content** in the form fields
3. **Click "Save Changes"** button at the top
4. **Success!** Changes appear on your live site immediately

### Viewing Changes

1. Open your website in a new tab: `http://localhost:4321`
2. Make changes in the admin portal
3. Refresh the homepage to see updates
4. Content loads dynamically from the API

---

## 🔐 Security Features

### Current Implementation (Development)

- Simple token-based authentication
- In-memory content storage
- Session management via localStorage

### For Production (Recommended)

1. **Enable Cloudflare D1 Database**
   ```bash
   # Create database
   wrangler d1 create agency-db
   
   # Run migrations
   wrangler d1 execute agency-db --file=./schema.sql
   
   # Update wrangler.toml with database ID
   ```

2. **Change Default Password**
   - Update password in `schema.sql` before running migrations
   - Use strong, unique passwords
   - Consider implementing password change functionality

3. **Add Proper Authentication**
   - Implement bcrypt for password hashing
   - Add session expiration
   - Consider 2FA for added security

---

## 📁 File Structure

```
agency-website/
├── src/
│   ├── pages/
│   │   └── admin/
│   │       ├── login.astro          # Login page
│   │       └── dashboard.astro      # Admin dashboard
│   ├── components/
│   │   ├── Hero.astro               # Static hero (backup)
│   │   └── HeroDynamic.astro        # Dynamic hero (CMS)
├── functions/
│   └── api/
│       └── admin/
│           ├── login.ts             # Authentication API
│           └── content.ts           # Content management API
└── schema.sql                       # Database schema
```

---

## 🔧 API Endpoints

### Authentication

**POST** `/api/admin/login`
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "uuid-token-here",
  "user": {
    "username": "admin",
    "email": "admin@yoursite.com"
  }
}
```

### Content Management

**GET** `/api/admin/content`
- Fetches all site content
- No authentication required (add in production!)

**POST** `/api/admin/content`
- Updates site content
- Requires `Authorization: Bearer {token}` header
```json
{
  "content": {
    "hero_title": "New Title",
    "hero_subtitle": "New subtitle",
    "hero_stat1_number": "1000+",
    ...
  }
}
```

---

## 🎨 Customizing the Admin Portal

### Adding New Content Fields

1. **Add to database schema** (`schema.sql`):
   ```sql
   INSERT INTO site_content (content_key, content_value, content_type, updated_at)
   VALUES ('new_field', 'default value', 'text', datetime('now'));
   ```

2. **Add form field** in `dashboard.astro`:
   ```html
   <div class="form-group">
     <label>New Field</label>
     <input type="text" id="new_field" placeholder="Enter value" />
   </div>
   ```

3. **Update save function** in dashboard script:
   ```javascript
   content.new_field = document.getElementById('new_field').value;
   ```

4. **Use in frontend** components:
   ```javascript
   const newFieldElement = document.getElementById('new-field-display');
   newFieldElement.textContent = content.new_field;
   ```

### Adding New Sections

1. Create a new section in the dashboard
2. Add navigation item in sidebar
3. Create corresponding API endpoints
4. Update frontend components to fetch from API

---

## 🐛 Troubleshooting

### Can't Login?
- Check console for errors (F12)
- Verify API endpoint is accessible: `/api/admin/login`
- Ensure dev server is running

### Changes Not Appearing?
- Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
- Check browser console for JavaScript errors
- Verify API response is successful
- Clear browser cache

### Lost Admin Access?
- Default credentials: `admin` / `admin123`
- If using database, run migrations again to reset
- Check `functions/api/admin/login.ts` for credentials

---

## 🚀 Deployment to Production

### Step 1: Set Up Database

```bash
# Create Cloudflare D1 database
wrangler d1 create agency-db

# Note the database ID from output
# Update wrangler.toml with the ID

# Run migrations
wrangler d1 execute agency-db --file=./schema.sql --remote
```

### Step 2: Update Configuration

1. Edit `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "agency-db"
   database_id = "your-actual-database-id"
   ```

2. Uncomment database code in API files:
   - `functions/api/admin/login.ts`
   - `functions/api/admin/content.ts`

### Step 3: Deploy

```bash
# Build the site
npm run build

# Deploy to Cloudflare Pages
# Push to GitHub and connect to Cloudflare Pages
# Or use Wrangler CLI:
wrangler pages deploy dist
```

### Step 4: Change Default Password

1. Generate a secure password hash
2. Update the admin user in the database
3. Test login with new credentials

---

## 🎓 Best Practices

### Content Management

- ✅ Save changes frequently
- ✅ Preview changes before publishing (refresh homepage)
- ✅ Keep backup of original content
- ✅ Use descriptive, SEO-friendly text

### Security

- ✅ Change default credentials immediately
- ✅ Use strong passwords (12+ characters)
- ✅ Enable HTTPS in production
- ✅ Regularly update dependencies
- ✅ Monitor access logs

### Performance

- ✅ Optimize images before uploading
- ✅ Keep text concise and readable
- ✅ Test on mobile devices
- ✅ Monitor page load times

---

## 📚 Next Steps

### Immediate

1. ✅ Log in to admin portal
2. ✅ Edit hero content
3. ✅ Update site settings
4. ✅ Change default password

### Short Term

1. Add more editable sections (Services, Portfolio)
2. Implement image upload functionality
3. Add content preview before saving
4. Create backup/restore functionality

### Long Term

1. Multi-user support with roles
2. Content versioning/history
3. Scheduled publishing
4. Advanced SEO tools
5. Analytics integration

---

## 💡 Tips & Tricks

### Keyboard Shortcuts

- `Ctrl/Cmd + S`: Save changes (implement this)
- `Ctrl/Cmd + R`: Refresh preview
- `Ctrl/Cmd + Shift + R`: Hard refresh

### Content Writing

- Keep headlines under 60 characters
- Use bullet points for readability
- Include relevant keywords naturally
- Make CTAs action-oriented

### Testing

- Test on different browsers
- Check mobile responsiveness
- Verify all links work
- Test form submissions

---

## 🆘 Support & Resources

### Documentation

- [Astro Docs](https://docs.astro.build)
- [Cloudflare Pages](https://developers.cloudflare.com/pages)
- [Cloudflare D1](https://developers.cloudflare.com/d1)

### Common Questions

**Q: Can I add more admin users?**  
A: Yes, add records to the `admin_users` table in the database.

**Q: How do I backup my content?**  
A: Export data from D1 database or use Cloudflare dashboard.

**Q: Can I schedule content changes?**  
A: Not currently - this feature needs custom implementation.

**Q: Is my content stored securely?**  
A: Yes, Cloudflare D1 includes encryption at rest and in transit.

---

## 🎉 Congratulations!

You now have a powerful, easy-to-use admin portal for managing your website. No more editing code files - just log in, make changes, and publish instantly!

**Happy content managing! 🚀**

