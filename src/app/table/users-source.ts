import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs/index';
import { CoursesService } from '../courses.service';
import { Injectable } from '@angular/core';
import { catchError, finalize } from 'rxjs/internal/operators';

@Injectable()
export class UsersSource implements DataSource<any> {
  /*TODO: need implement get count all items after getting request for pagination
  * now is hardcod
  * */

  private usersSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private changeFilterSearch = new BehaviorSubject<number>(0);

  public changeSearch$ = this.changeFilterSearch.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  // нужно сортировку добавить
  private _sort: any;

  get sort() {
    this._sort;
  }
  set sort(val: {active: string, direction: string}) {
    this._sort = val;
    this.changeFilterSearch.next(0);
    this.loadingData(3, this.filter, val);
  }
  private _filter: string;

  get filter() {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.changeFilterSearch.next(0);
    this.loadingData(3, value);
  }

  set pagination(value) {
    const {pageIndex, pageSize } = value;
    this.loadingData(3, this.filter, this.sort, pageIndex, pageSize);
  }

  constructor(private coursesService: CoursesService) {
    this.loadingData(3);
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.changeFilterSearch.complete();
    this.loadingSubject.complete();
  }

  search() {

  }

  loadingData(
              courseId: number,
              filter = this.filter,
              sort: {active: string, direction: string}  = {active: 'seqNo', direction: 'asc'},
              pageIndex = 0,
              pageSize = 3
  ) {

    // set load is start for show spinner
    this.loadingSubject.next(true);

    // set filtering data empty string or data;
    const filterString = filter ? this.filter : '';

    this.coursesService.findLessons(
      courseId, filterString, sort, pageIndex, pageSize
    ).pipe(
      catchError(() => of([])),

      // set load is end for hide spinner
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(lessons => this.usersSubject.next(lessons));
  }
}
