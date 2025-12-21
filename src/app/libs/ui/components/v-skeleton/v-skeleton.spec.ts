import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VSkeletonComponent } from "./v-skeleton";

describe("VSkeletonComponent", () => {
  let component: VSkeletonComponent;
  let fixture: ComponentFixture<VSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VSkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
