import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { takeWhile } from 'rxjs/internal/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() pageSizeOptions: number[];
  @Input() pageSize: number;
  @Input() dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  itemCount = 0;
  componentActive = true;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkExistAndHandling();
    this.setIndexPage();
    this.setLengthItems();
  }

  checkExistAndHandling() {
    if (this.paginator) {
      this.handlingChangPagination();
    }
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
  setIndexPage() {
    this.dataSource.changeSearch$
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe((val: number) => {
        this.paginator.pageIndex = val;
      });
  }

  /**
   * set length of all items
   * */

  setLengthItems() {
    this.dataSource
      .length$
      .subscribe((val: number) => {
        this.itemCount = val;
      });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}
