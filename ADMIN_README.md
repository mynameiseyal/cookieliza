# Admin Dashboard - קוקי ליזה

## 🔐 Access

Navigate to `/admin` to access the admin panel.

**Default Credentials:**
- Password: `cookie2010`

## 📋 Features

### 1. **Dashboard Overview** (`/admin/dashboard`)
- Real-time statistics (today's orders, monthly revenue, inventory status)
- Recent orders summary
- Product stock overview by category
- Quick action buttons for common tasks

### 2. **Product Management** (`/admin/products`)
- View all products in a searchable table
- Filter by category (cakes, cookies, breads)
- Edit product details (coming soon)
- Delete products (coming soon)
- Add new products (coming soon)
- Product stock status indicators

### 3. **Order Management** (`/admin/orders`)
- View all customer orders
- Filter orders by status (pending, processing, completed, cancelled)
- View detailed order information including:
  - Customer details
  - Order items and quantities
  - Total amount
  - Delivery information
  - Special notes
- Change order status
- Mock data currently showing sample orders

### 4. **Analytics & Reports** (`/admin/analytics`)
- Category performance metrics
- Top selling products
- Monthly sales trends
- Revenue visualization
- Sales analytics and insights

### 5. **Customer Management** (`/admin/customers`)
- View all customers
- Search by name, email, or phone
- Customer statistics:
  - Total orders
  - Total spent
  - Last order date
  - Active/Inactive status
- Contact information access

## 🔒 Security

### Current Implementation
- Simple password-based authentication
- Session stored in localStorage
- Client-side validation

### ⚠️ Important Security Notice

**The current authentication is for demonstration purposes only!**

For production use, you MUST implement proper authentication:

1. **Use NextAuth.js** (Recommended)
   ```bash
   npm install next-auth
   ```
   
2. **Or implement JWT-based authentication**
   - Store tokens securely
   - Use HTTP-only cookies
   - Implement refresh tokens
   - Add rate limiting

3. **Environment Variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Additional Security Measures**
   - Move authentication to server-side (API routes)
   - Add rate limiting for login attempts
   - Implement session timeout
   - Add CSRF protection
   - Use HTTPS only
   - Add IP whitelisting (optional)
   - Enable 2FA (optional)

## 🚀 Development Roadmap

### Phase 1 (Current)
- ✅ Basic admin authentication
- ✅ Dashboard overview
- ✅ Product viewing
- ✅ Order viewing
- ✅ Analytics display
- ✅ Customer viewing

### Phase 2 (Planned)
- [ ] Real database integration
- [ ] Full CRUD operations for products
- [ ] Order status updates (backend)
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Export data functionality

### Phase 3 (Future)
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Multi-user support with roles
- [ ] Activity logs
- [ ] Automated reports
- [ ] API for mobile app

## 📱 Mobile Support

The admin dashboard is fully responsive and works on:
- Desktop (optimized experience)
- Tablets
- Mobile phones

## 🎨 Design

The admin panel follows the same design language as the main site:
- Pink and purple gradient theme
- Hebrew RTL support
- Smooth animations and transitions
- Accessible and WCAG compliant
- Modern, clean interface

## 🛠️ Technical Stack

- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand
- **Icons**: Heroicons
- **Styling**: Tailwind CSS
- **Notifications**: React Hot Toast
- **Language**: TypeScript

## 📝 Usage Tips

1. **Dashboard**: Start here for a quick overview of your business
2. **Products**: Manage your product catalog and inventory
3. **Orders**: Process and track customer orders
4. **Analytics**: Make data-driven decisions
5. **Customers**: Build customer relationships

## 🔄 Data Integration

Currently using mock data for demonstration. To integrate with a real backend:

1. **Create API routes** in `app/api/admin/`
2. **Connect to database** (PostgreSQL, MongoDB, etc.)
3. **Replace mock data** with API calls
4. **Add proper authentication** middleware
5. **Implement data validation**

Example API structure:
```
/api/admin/
  /auth/login
  /products
  /orders
  /customers
  /analytics
```

## 🆘 Support

For issues or questions:
- Email: info@cookieliza.co.il
- Phone: 050-123-4567

---

**Built with ❤️ for Cookie Liza Bakery**

