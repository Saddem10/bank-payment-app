import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Message } from '../../services/message.service';

@Component({
  selector: 'app-message-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './message-detail-dialog.component.html',
})
export class MessageDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
