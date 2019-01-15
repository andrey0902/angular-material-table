import {Component, OnInit} from '@angular/core';
import {CoursesService} from './courses.service';
import {LessonsDataSource} from './data-source';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataSource: LessonsDataSource;
  title = 'materialTable';
  displayedColumns = ['seqNo', 'description', 'duration'];


  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.dataSource = new LessonsDataSource(this.coursesService);
    this.dataSource.loadLessons(1);
  }

  onRowClicked(row) {
    console.log('click on the row', row);
  }

}
