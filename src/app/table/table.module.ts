import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchModule } from './search/search.module';
import { MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';
import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,

    SearchModule,
    PaginationModule,

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
