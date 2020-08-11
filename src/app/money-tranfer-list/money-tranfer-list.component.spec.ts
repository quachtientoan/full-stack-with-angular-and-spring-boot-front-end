import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTranferListComponent } from './money-tranfer-list.component';

describe('MoneyTranferListComponent', () => {
  let component: MoneyTranferListComponent;
  let fixture: ComponentFixture<MoneyTranferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyTranferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyTranferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
