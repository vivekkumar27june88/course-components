import { Component } from '@angular/core';

@Component({
  selector: 'course-components-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'component-sandbox';
  public options = [
    {
      label: 'Option 1',
      value: 'option-1'
    },
    {
      label: 'Option 2',
      value: 'option-2'
    },
    {
      label: 'Option 3 Option 3 Option 3Option 3 Option 3',
      value: 'option-3'
    },
    {
      label: 'Option4Option4Option4Option4Option4Option4Option4Option4',
      value: 'option-4'
    },
    {
      label: 'Option 5',
      value: 'option-5'
    },
    {
      label: 'Option 6',
      value: 'option-6'
    },
    {
      label: 'Option 7',
      value: 'option-7'
    },
    {
      label: 'Option 8',
      value: 'option-8'
    },
    {
      label: 'Option 9',
      value: 'option-9'
    },
    {
      label: 'Option 10',
      value: 'option-10'
    },
    {
      label: 'Option 11',
      value: 'option-11'
    },
    {
      label: 'Option 12',
      value: 'option-12'
    },
    {
      label: 'Option 13',
      value: 'option-13'
    },
    {
      label: 'Option 14',
      value: 'option-14'
    },
    {
      label: 'Option 15',
      value: 'option-15'
    },
    {
      label: 'Option 16',
      value: 'option-16'
    },
    {
      label: 'Option 17',
      value: 'option-17'
    }
  ];
  public value = ['option-1', 'option-10'];

  public onSelectionChange(v) {
    console.log(v);
  }
}
