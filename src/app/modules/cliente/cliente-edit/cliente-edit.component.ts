import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss'],
  host: { class: 'content' }
})
export class ClienteEditComponent implements OnInit, AfterViewInit {
  cliente: any;
  
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];
  clienteForm: FormGroup;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private genericValidator: ValidatorService,
              private formBuilder: FormBuilder,
              private clienteService: ClienteService) {
    this.validationMessages = {
      identificador: {
        required: 'identificador do cliente é requirido'
      },
      nome: {
        required: 'Nome do cliente é requerido'
      }
    }

    this.clienteForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    var { data } = this.location.getState() as any;
    this.cliente = data;

    this.clienteForm = this.formBuilder.group({
      identificador: [this.cliente.identificador, [Validators.required]],
      nome: [this.cliente.nome, [Validators.required]],
      dddTelefone: [this.cliente.telefone?.codigoDiscagem],
      numeroTelefone: [this.cliente.telefone?.numero],
      email: [this.cliente.email],
      dddWhatsApp: [this.cliente.whatsApp?.codigoDiscagem],
      numeroWhatsApp: [this.cliente.whatsApp?.numero],
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.clienteForm.valueChanges, ...controlBlurs).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm, this.validationMessages);
    });
  }

  handleVoltar(): void {
    this.location.back();
  }

  handleEditar(): void {
    if (this.clienteForm.invalid) return;

    var cliente = {
      identificador: this.clienteForm.get('identificador')?.value,
      nome: this.clienteForm.get('nome')?.value,
      telefone: {
        codigoDiscagem: this.clienteForm.get('dddTelefone')?.value,
        numero: this.clienteForm.get('numeroTelefone')?.value,
      },
      email: this.clienteForm.get('email')?.value,
      whatsApp: {
        codigoDiscagem: this.clienteForm.get('dddWhatsApp')?.value,
        numero: this.clienteForm.get('numeroWhatsApp')?.value,
      }
    };

    this.clienteService.EditarCliente(cliente).subscribe(() => {
      this.router.navigate(['details'], { relativeTo: this.route.parent, state: { data: cliente} })
    })
  }

  
}
