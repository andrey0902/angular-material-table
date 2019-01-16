import { AfterContentInit, Component, ContentChild, Input, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from '../search/search/search.component';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersSource } from '../users-source';
import { takeWhile, tap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    UsersSource
  ]
})
export class TableComponent implements OnInit, AfterContentInit {

  @Input() displayedColumns: any[];

  @ViewChild(MatSort) sort: MatSort;

  componentActive = true;

  // hardcode but need get from the server
  course = {
    id: 3,
    lessonsCount: 8
  };
  constructor(public dataSource: UsersSource) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.sort);
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
