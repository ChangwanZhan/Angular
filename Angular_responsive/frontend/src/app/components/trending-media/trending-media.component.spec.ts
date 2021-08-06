import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingMediaComponent } from './trending-media.component';

describe('TrendingMediaComponent', () => {
  let component: TrendingMediaComponent;
  let fixture: ComponentFixture<TrendingMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendingMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
