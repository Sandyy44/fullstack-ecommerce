import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProfileComponent } from './Components/profile/profile.component';
// ❌ شيلي OrdersComponent لحد ما تعمليه

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,  // ✅ هنا declarations
    CartComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule   // ✅ هنا ماينفعش تحطي ProductsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
