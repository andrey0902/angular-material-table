import { AfterViewInit, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material';
import { takeWhile, tap } from 'rxjs/internal/operators';
import { CustomDataSource } from '../shared/custom-data-source';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    CustomDataSource,
    UsersService
  ]
})
export class TableComponent implements AfterViewInit {

  displayedColumns = ['email', 'registration', 'verification', 'membership', 'lastVisit'];
  pageSize = 3;
  pageSizeOptions = [3, 5, 10];
  @ViewChild(MatSort) sort: MatSort;

  componentActive = true;

  constructor(public dataSource: CustomDataSource) {
  }

  ngAfterViewInit() {
    this.handleSorting();
  }

  handleSorting() {
    if (this.sort) {
      this.sort.sortChange
        .pipe(
          takeWhile(() => this.componentActive),
          tap((val) => {
            console.log('sort', val);
            this.dataSource.sort = val;
          })
        )
        .subscribe();
    }
  }

  onRowClicked(e) {
    console.log( 'click row', e);
  }
}
