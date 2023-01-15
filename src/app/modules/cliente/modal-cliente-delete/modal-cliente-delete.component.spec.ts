import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClienteDeleteComponent } from './modal-cliente-delete.component';

describe('ModalClienteDeleteComponent', () => {
  let component: ModalClienteDeleteComponent;
  let fixture: ComponentFixture<ModalClienteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClienteDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalClienteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
