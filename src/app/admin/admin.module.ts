import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'ng2-file-upload';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule} from '@angular/material/badge';
import { MatDividerModule} from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { NewProductComponent } from './new-product/new-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AdminDashComponent,
    AdminEditComponent,
    AdminHomeComponent,
    NewProductComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatRippleModule,
    MatGridListModule
 
  ]
})
export class AdminModule { }
