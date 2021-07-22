import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// component
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './views/theme/default-layout/default-layout.component';
import { HeaderComponent } from './views/theme/header/header.component';
import { FooterComponent } from './views/theme/footer/footer.component';
import { HomeComponent } from './views/page/home/home.component';
import { BlogDetailsComponent } from './views/page/blog-details/blog-details.component';
import { NotifyComponent } from './common/notify/notify.component';
import { PanigationComponent } from './common/panigation/panigation.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { ErrorsComponent } from './common/errors/errors.component';
import { ErrorInterceptor } from './common/auth/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BlogDetailsComponent,
    NotifyComponent,
    PanigationComponent,
    PageNotFoundComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  entryComponents: [NotifyComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
