import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PartnerService } from '../../services/partner.service';

@Component({
  selector: 'app-add-partner-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-partner-dialog.component.html',
})
export class AddPartnerDialogComponent {
  partnerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPartnerDialogComponent>,
    private partnerService: PartnerService,
  ) {
    this.partnerForm = this.fb.group({
      alias: ['', [Validators.required, this.noWhitespaceValidator]],
      type: ['', [Validators.required, this.noWhitespaceValidator]],
      direction: ['INBOUND'],
      application: [''], // facultatif, sans validator
      processedFlowType: ['MESSAGE'],
      description: ['', [Validators.required, this.noWhitespaceValidator]],
    });
  }

  onSubmit(): void {
    if (this.partnerForm.valid) {
      this.partnerService.addPartner(this.partnerForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du partenaire', err);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
}
