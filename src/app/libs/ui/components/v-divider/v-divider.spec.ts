import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VDivider } from './v-divider';

describe('VDivider', () => {
  let component: VDivider;
  let fixture: ComponentFixture<VDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VDivider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
