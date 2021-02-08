import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './pages/user-list/user-list.component';
import {UserRoutingModule} from './user-routing.module';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {DirectiveModule} from '../../shared/directives/directive.module';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [UserListComponent, TableComponent, ModalComponent],
  imports: [
    NzTypographyModule,
    NzSelectModule,
    NzRadioModule,
    NzGridModule,
    NzModalModule,
    CommonModule,
    UserRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzInputModule,
    DirectiveModule,
  ]
})
export class UserModule {
}
