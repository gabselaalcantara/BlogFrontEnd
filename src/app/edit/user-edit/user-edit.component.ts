import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario = new Usuario()
  idUser: number
  confirmSenha: string
  tipoUsuario: string


  constructor(
    private authService: AuthService,
    private rout: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('sua seção expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.rout.snapshot.params['id']
    this.findByIdUser(this.idUser)
    this.authService.refreshToken();
  }

  confirmaSenha(event: any){
    this.confirmSenha = event.target.value
  }

tipoUser(event: any){
  this.tipoUsuario = event.target.value
}

atualizar(){
  this.user.tipo = this.tipoUsuario

  if(this.user.senha != this.confirmSenha){
    this.alertas.showAlertDanger('As senhas estão incorretas')
  } else {
    this.authService.cadastrar(this.user).subscribe((resp: Usuario)=> {
      this.user = resp
      this.router.navigate(['/entrar'])
      this.alertas.showAlertSuccess('usuario atualizado com sucesso, faça o login novamente')
      environment.token = ''
      environment.nome = ''
      environment.foto = ''
      environment.id = 0
      this.router.navigate(['/entrar'])
    })
}
}

findByIdUser(id: number){
  this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
    this.user = resp
  })
}

}
