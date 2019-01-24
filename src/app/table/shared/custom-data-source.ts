import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { DataResponse } from './model/data-response.mode';
import { SortModel } from './model/sort.model';


@Injectable()
export class CustomDataSource implements DataSource<any> {

  private dataSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private changeFilterSearch = new BehaviorSubject<number>(0);
  private lengthData = new BehaviorSubject<number>(0);

  // default items on the page
  pageSize = 3;

  private _sort: any;
  private _filter: any;

  // used for setUp pagination index page to 0 when searching
  public changeSearch$ = this.changeFilterSearch.asObservable();
  // used for toggle spiner loading
  public loading$ = this.loadingSubject.asObservable();
  // used for set all length items the pagination component
  public length$ = this.lengthData.asObservable();

  get sort() {
    return this._sort;
  }

  set sort(val: SortModel) {
    this._sort = val;
    this.changeFilterSearch.next(0);

    this.loadingData();
  }

  get filter() {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.changeFilterSearch.next(0);

    this.loadingData();
  }

  set pagination(value) {

    this.loadingData(value);
  }

  constructor(private userService: UsersService) {
    this.loadingData();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
    return this.dataSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.changeFilterSearch.complete();
    this.loadingSubject.complete();
    this.lengthData.complete();
  }

  loadingData(pagination?: any) {
    const dataFilter = {
      filter: this.filter,
      pageIndex: pagination ? pagination.pageIndex : 0,
      pageSize: pagination ? pagination.pageSize : this.pageSize,
      ...this.sortPrepare(this.sort)
    };
    this.loadingSubject.next(true);
    this.userService.getUsers(dataFilter)
      .subscribe((res: DataResponse) => {
        this.dataSubject.next(res.users);
        this.lengthData.next(res.count);
        this.loadingSubject.next(false);
      }, error => {
        this.dataSubject.next([]);
        this.lengthData.next(0);
        this.loadingSubject.next(false);
        console.warn('error', error);
      });
  }

  private sortPrepare(sort: SortModel) {
    if (sort && sort.direction !== '') {
      return {
        field: sort.active,
        order: sort.direction
      };
    }
    return {sort: null};
  }

}
