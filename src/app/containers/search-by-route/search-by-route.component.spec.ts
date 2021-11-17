import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByRouteComponent } from './search-by-route.component';

describe('SearchByRouteComponent', () => {
  let component: SearchByRouteComponent;
  let fixture: ComponentFixture<SearchByRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
