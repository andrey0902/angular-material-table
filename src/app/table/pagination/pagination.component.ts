import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { UsersSource } from '../users-source';
import { MatPaginator } from '@angular/material';
import { takeWhile } from 'rxjs/internal/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {

  @Input() pageSizeOptions: number[];
  @Input() pageSize: number;
  @Input() dataSource: UsersSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  componentActive = true;
  course = {
    lessonsCount: 8
  }
  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.handlingChangPagination();
    this.setPagination();
  }

  /**
  * subscribe on change pagination and handling chang pagination
  * */
  handlingChangPagination() {
    this.paginator.page
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe(() => {
        this.dataSource.pagination = {
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        };
      });
  }

  /**
   * set pagination 0 after filtration or sort
   * */
  setPagination() {
    this.dataSource.changeSearch$
      .subscribe((val: number) => {
        this.paginator.pageIndex = val;
      });
  }

}
