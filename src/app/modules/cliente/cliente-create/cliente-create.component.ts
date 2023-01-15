import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ValidatorService } from 'src/app/services/validator/validator.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss'],
  host: { class: 'content' }
})
export class ClienteCreateComponent implements OnInit, AfterViewInit {
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
      nome: {
        required: 'Nome do cliente é requerido'
      },
      email: {
        required: 'Email é requerido',
        email: 'Email inválido'
      },
      dddTelefone: {
        required: 'DDD do telefone é requerido',
        minLength: 'DDD do telefone inválido'
      },
      numeroTelefone: {
        required: 'Número do telefone é requerido',
        minLength: 'Número do telefone inválido'
      },
      dddWhatsApp: {
        required: 'DDD do whatsApp é requerido',
        minLength: 'DDD do whatsApp inválido'
      },
      numeroWhatsApp: {
        required: 'Número do whatsApp é requerido',
        minLength: 'Número do whatsApp inválido'
      }
    }

    this.clienteForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    var { data } = this.location.getState() as any;
    this.cliente = data;

    this.clienteForm = this.formBuilder.group({
      nome: [undefined, [Validators.required]],
      dddTelefone: [undefined, [Validators.required, Validators.minLength(2)]],
      numeroTelefone: [undefined, [Validators.required, Validators.minLength(9)]],
      email: [undefined, [Validators.required,Validators.email]],
      dddWhatsApp: [undefined, [Validators.required, Validators.minLength(2)]],
      numeroWhatsApp: [undefined, [Validators.required,Validators.minLength(9)]],
    });
  }

  ngAfterViewInit(): void {
    const controlChanges: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'change'));

    merge(this.clienteForm.valueChanges, ...controlChanges).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm, this.validationMessages);
    });

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.clienteForm.valueChanges, ...controlBlurs).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.clienteForm, this.validationMessages);
    });
  }

  handleCancelar(): void {
    this.location.back();
  }

  handleCadastrar(): void {
    if (this.clienteForm.invalid) return;

    var cliente: any = { nome: this.clienteForm.get('nome')?.value};

    if (this.clienteForm.get('email')?.value) {
      cliente['email'] = this.clienteForm.get('email')?.value;
    }

    if (this.clienteForm.get('dddTelefone')?.value || this.clienteForm.get('dddTelefone')?.value) {
      cliente['telefone'] =  {
        codigoDiscagem: this.clienteForm.get('dddTelefone')?.value,
        numero: this.clienteForm.get('numeroTelefone')?.value,
      }
    }

    if (this.clienteForm.get('dddTelefone')?.value || this.clienteForm.get('dddTelefone')?.value) {
      cliente['whatsApp'] =  {
        codigoDiscagem: this.clienteForm.get('dddWhatsApp')?.value,
        numero: this.clienteForm.get('numeroWhatsApp')?.value,
      }
    }
    
    this.clienteService.CadastrarCliente(cliente).subscribe(newCliente => {
      this.router.navigate(['clientes']);
    })
  }
}
