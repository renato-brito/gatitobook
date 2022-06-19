import { Router } from '@angular/router';
import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais-validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuider: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private UsuarioExisteService: UsuarioExisteService,
    private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuider.group({
      email: ['', [Validators.required,Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator], [this.UsuarioExisteService.usuarioJaExiste()]],
      password: ['']
    },
    {
      validators: [usuarioSenhaIguaisValidator]
    });
  }

  cadastrar() {
    if(this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          alert('requisição inválida');
          console.log(error);
        }
      );
    }
  }
}
