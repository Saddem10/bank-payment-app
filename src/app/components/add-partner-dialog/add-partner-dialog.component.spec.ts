import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnerDialogComponent } from './add-partner-dialog.component';

describe('AddPartnerDialogComponent', () => {
  let component: AddPartnerDialogComponent;
  let fixture: ComponentFixture<AddPartnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPartnerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
