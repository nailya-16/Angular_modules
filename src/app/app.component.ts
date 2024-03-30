import {Component} from '@angular/core';
import {ObservableExampleService} from "./services/observable-example/observable-example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';

  constructor(private test: ObservableExampleService) {
    test.initObservable()
  }

  ngOnInit() {
    const myObservable = this.test.getObservable();
    myObservable.subscribe((data) => {
      console.log('first', data)
    })

    myObservable.subscribe((data) => {
      console.log('second', data)
    })
  }
}
