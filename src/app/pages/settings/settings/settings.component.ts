import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../../services/observable-example/observable-example.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private subjectScope: Subject<any>;
  private subjectUnsubscribe: Subscription;

  constructor(private test: ObservableExampleService) {
  }

  ngOnInit(): void {
    this.subjectScope = this.test.getObservable();
    this.subjectUnsubscribe = this.subjectScope.subscribe((data) => {
      // console.log('subjectScope', data)
    })

    this.subjectScope.next('test')
  }

  ngOnDestroy() {
    this.subjectUnsubscribe.unsubscribe()
  }

}
