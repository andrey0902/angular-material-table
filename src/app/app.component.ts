import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {CoursesService} from './courses.service';
import {LessonsDataSource} from './data-source';
import { MatPaginator, MatSort } from '@angular/material';
import { tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  dataSource: LessonsDataSource;
  title = 'materialTable';
  displayedColumns = ['seqNo', 'description', 'duration'];
  // hardcode but need get from the server
  course = {
    id: 3,
    lessonsCount: 8
  };

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.dataSource = new LessonsDataSource(this.coursesService);
    this.dataSource.loadLessons(1);
  }

  onRowClicked(row) {
    console.log('click on the row', row);
  }

  ngAfterViewInit() {


    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadLessonsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort
      .sortChange
      .subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe((data) => {
        console.log('sort', data);
      });
  }

  loadLessonsPage() {
    console.log('paginator', this.paginator);
      this.dataSource.loadLessons(
        this.course.id,
        this.input.nativeElement.value,
        {active: 'seqNo', direction: 'asc'},
        this.paginator.pageIndex,
        this.paginator.pageSize);
    // this.dataSource.loadLessons(
    //   this.course.id,
    //   '',
    //   'asc',
    //   this.paginator.pageIndex,
    //   this.paginator.pageSize);
  }

}
