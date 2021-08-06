import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimiliarMediaComponent } from './similiar-media.component';

describe('SimiliarMediaComponent', () => {
  let component: SimiliarMediaComponent;
  let fixture: ComponentFixture<SimiliarMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimiliarMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimiliarMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
