import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miFormularioRegistro: FormGroup = this.fb.group({
    name: ['', [Validators.required]], 
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  })


  constructor(
    private fb: FormBuilder
  ){

  }

  registro(){
    console.log(this.miFormularioRegistro.value);
    console.log(this.miFormularioRegistro.valid);

  }
}
