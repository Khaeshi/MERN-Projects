frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # ROOT LAYOUT (see below)
│   │   ├── globals.css
│   │   │
│   │   ├── (public)/                     # 👥 CUSTOMER ROUTES
│   │   │   ├── layout.tsx                # PUBLIC LAYOUT (see below)
│   │   │   │
│   │   │   ├── page.tsx                  # HOME PAGE (metadata)
│   │   │   ├── HomeClient.tsx            # Home client component
│   │   │   │
│   │   │   └── shop/
│   │   │       ├── page.tsx              # SHOP PAGE (metadata)
│   │   │       └── ShopClient.tsx        # Shop client component
│   │   │
│   │   ├── (auth)/                       # 🔐 AUTH ROUTES
│   │   │   ├── layout.tsx                # AUTH LAYOUT (minimal)
│   │   │   └── auth/
│   │   │       └── success/
│   │   │           └── page.tsx          # OAuth success page
│   │   │
│   │   └── (admin)/                      # 👨‍💼 ADMIN ROUTES
│   │       ├── layout.tsx                # ADMIN LAYOUT (protected)
│   │       └── admin/
│   │           ├── login/
│   │           │   └── page.tsx          # Admin login (no metadata needed)
│   │           │
│   │           ├── dashboard/
│   │           │   ├── page.tsx          # Dashboard (metadata)
│   │           │   └── DashboardClient.tsx
│   │           │
│   │           ├── menu/
│   │           │   ├── page.tsx
│   │           │   └── MenuClient.tsx
│   │           │
│   │           ├── orders/
│   │           │   ├── page.tsx
│   │           │   └── OrdersClient.tsx
│   │           │
│   │           └── users/
│   │               ├── page.tsx
│   │               └── UsersClient.tsx
│   │
│   ├── components/
│   │   ├── public/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoginModal.tsx
│   │   │   └── GoogleLoginButton.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminSidebar.tsx
│   │   │
│   │   ├── features/
│   │   │   └── Cart/
│   │   │       ├── CartModal.tsx
│   │   │       └── CartSidebar.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── AdminAuthContext.tsx
│   │   └── CartContext.tsx
│   │
│   └── lib/       
│       └── auth.ts