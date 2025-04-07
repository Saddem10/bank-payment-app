import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../services/message.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-send-message-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './send-message-dialog.component.html',
})
export class SendMessageDialogComponent {
  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SendMessageDialogComponent>,
    private messageService: MessageService
  ) {
    this.messageForm = this.fb.group({
      sender: ['', [Validators.required, this.noWhitespaceValidator]],
      content: ['', [Validators.required, this.noWhitespaceValidator]],
    });
  }

  onSubmit(): void {
    if (this.messageForm.valid) {
      this.messageService.sendMessage(this.messageForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erreur lors de l\'envoi du message', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
}