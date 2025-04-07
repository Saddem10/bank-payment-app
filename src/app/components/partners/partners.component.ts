import { Component, OnInit } from '@angular/core';
import { PartnerService, Partner } from '../../services/partner.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddPartnerDialogComponent } from '../add-partner-dialog/add-partner-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './partners.component.html',
})
export class PartnersComponent implements OnInit {
  partners: Partner[] = [];
  displayedColumns: string[] = ['id', 'alias', 'type', 'application', 'direction', 'processedFlowType', 'description', 'actions'];

  pageIndex: number = 0;
  pageSize: number = 10;
  totalPartners: number = 0;

  partnerForm: FormGroup;

  constructor(private partnerService: PartnerService, private fb: FormBuilder, private dialog: MatDialog) {
    this.partnerForm = this.fb.group({
      alias: ['', Validators.required],
      type: ['', Validators.required],
      direction: ['IN'],
      application: [''],
      processedFlowType: ['SYNCHRONOUS'],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners() {
    this.partnerService.getPartners(this.pageIndex, this.pageSize).subscribe(res => {
      this.partners = res.content;
      this.totalPartners = res.totalElements;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPartners();
  }
  
  onSubmit() {
    if (this.partnerForm.valid) {
      this.partnerService.addPartner(this.partnerForm.value).subscribe(() => {
        this.partnerForm.reset({ direction: 'IN', processedFlowType: 'SYNCHRONOUS' });
        this.loadPartners();
      });
    }
  }

  openAddPartnerDialog(): void {
      const dialogRef = this.dialog.open(AddPartnerDialogComponent, {
        width: '400px',
      });
    
      dialogRef.afterClosed().subscribe((sent) => {
        if (sent) {
          this.loadPartners();
        }
      });
    }

    deletePartner(id: number) {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '400px',
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.partnerService.deletePartner(id).subscribe(() => {
            this.loadPartners();
          });
        }
      });
    }
}
