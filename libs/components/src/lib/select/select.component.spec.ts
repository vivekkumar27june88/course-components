import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CtSelectComponent } from './select.component';

describe('CtSelectComponent', () => {
  let component: CtSelectComponent;
  let fixture: ComponentFixture<CtSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CtSelectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
