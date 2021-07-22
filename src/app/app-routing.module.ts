import { ErrorsComponent } from './common/errors/errors.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { BlogDetailsComponent } from './views/page/blog-details/blog-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/page/home/home.component';

import { DefaultLayoutComponent } from './views/theme/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'blogs/:id',
        component: BlogDetailsComponent
      },
      {
        path: 'error',
        component: ErrorsComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
