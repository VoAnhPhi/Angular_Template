import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { HeaderAdminComponent } from '../../components/header-admin/header-admin.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SideBarComponent, HeaderAdminComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
