import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
<<<<<<< HEAD
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
=======
<<<<<<< HEAD
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
=======
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
>>>>>>> de9a267de73261afdf4420689530616685815c58
import { CreateProductComponent } from './Components/create-product/create-product.component';
import { authGuard } from './Guards/auth.guard';
import { adminGuard } from './Guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent , canActivate: [authGuard]},
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> de9a267de73261afdf4420689530616685815c58
  { path: 'admin', component: AdminPanelComponent, canActivate: [authGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/create-product', component: CreateProductComponent, canActivate: [adminGuard] },
  { path: 'admin/edit-product/:id', component: CreateProductComponent, canActivate: [adminGuard] },

<<<<<<< HEAD
=======
=======
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/create-product', component: CreateProductComponent, canActivate: [adminGuard] },
  { path: 'admin/edit-product/:id', component: CreateProductComponent, canActivate: [adminGuard] },
>>>>>>> 76dda69e9c1c91ac722eb28637b3dbb16009bdd2
>>>>>>> de9a267de73261afdf4420689530616685815c58
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
