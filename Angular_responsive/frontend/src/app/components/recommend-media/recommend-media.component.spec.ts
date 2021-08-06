import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendMediaComponent } from './recommend-media.component';

describe('RecommendMediaComponent', () => {
  let component: RecommendMediaComponent;
  let fixture: ComponentFixture<RecommendMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
