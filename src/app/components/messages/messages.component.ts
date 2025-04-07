import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, Message } from '../../services/message.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDetailDialogComponent } from '../message-detail-dialog/message-detail-dialog.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { SendMessageDialogComponent } from '../send-message-dialog/send-message-dialog.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  displayedColumns: string[] = ['id', 'sender', 'content', 'receivedAt'];

  pageIndex: number = 0;
  pageSize: number = 10;
  totalMessages: number = 0;

  constructor(private messageService: MessageService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages(this.pageIndex, this.pageSize).subscribe((data) => {
      this.messages = data.content;
      this.totalMessages = data.totalElements;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }

  openDialog(message: Message): void {
    this.dialog.open(MessageDetailDialogComponent, {
      data: message,
      width: '80%',
      maxWidth: '600px',
      height: 'auto'
    });
  }

  openSendMessageDialog(): void {
    const dialogRef = this.dialog.open(SendMessageDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((sent) => {
      if (sent) {
        this.loadMessages();
      }
    });
  }
}
