import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `

  <form [formGroup]="formularioContacto" novalidate>
  <div class="content card card-body">
  <div class="col-6 mb-4">
        <label for="name">Nombre Completo</label>
        <div class="col-6">
          <input type="text" class="form-control" id="name" aria-describedby="nameRequired" placeholder="Ingresar Nombre" formControlName="name" required>
          <small id="nameRequired" class="form-text text-muted">Debe ingresar el nombre del contacto. Al Menos 10 caracteres</small>
        </div>
      </div>
  <div class="col-6 mb-4">
        <label for="email">Email</label>
        <div class="col-6">
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingrese Email" formControlName="email" required>
          <small id="emailHelp" class="form-text text-muted">No vamos a compartir nunca tu email con nadie.</small>
        </div>
      </div>
      <div class="col-6 mb-4">
        <label for="message">Mensaje</label>
        <div class="col-6">
          <textarea class="form-control" rows="10" cols="70" id="message" formControlName="message" placeholder="Mensaje" required [maxLength]="500"></textarea>
          <small id="countMensaje" class="form-text text-muted">Máximo 500 caracteres</small>
        </div>
      </div>
    <button type="button" class="btn btn-primary col-3" (click)="submit()">Submit</button>
    </div>
    </form>
  `,
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  isSubmitted = false;
  constructor(private toastr: ToastrService, private readonly formBuilder: FormBuilder) {}
  private api: ApiService = inject(ApiService);

  formularioContacto : FormGroup = this.formBuilder.group({
    createdAt: new FormControl(new Date()),
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.maxLength(500)])
  });

  submit() {
    this.isSubmitted = true;
    this.formularioContacto.markAllAsTouched();

    if (this.formularioContacto.valid){
      this.api.addContact(this.formularioContacto).subscribe({
        next: () =>
        {
          this.toastr.success("Todos los datos son válidos", "Enviado");
            this.formularioContacto.reset();
        },
        error: () => this.toastr.error("No se pudo enviar el mensaje", "Error")
      });
    }
    else{
      this.toastr.error("Hay datos inválidos en el formulario", "Error")
    }
  }
}
