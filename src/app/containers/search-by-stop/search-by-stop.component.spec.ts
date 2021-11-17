import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByStopComponent } from './search-by-stop.component';

describe('SearchByStopComponent', () => {
  let component: SearchByStopComponent;
  let fixture: ComponentFixture<SearchByStopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByStopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
