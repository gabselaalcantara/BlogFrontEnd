import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema
  listaTemas: Tema[]

  constructor(private router: Router, private temaService: TemaService, private alertas: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0);
    if(environment.token == ''){
      this.alertas.showAlertInfo('sua seção expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo('voce precisa ser adm para acessar essa rota')
      this.router.navigate(['/inicio'])
    }

    this.listarTemas()
  }

  listarTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
      console.log(this.tema)
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp;
      this.alertas.showAlertSuccess("tema cadastrado")
      this.listarTemas()
      this.tema = new Tema()

    })
  }
}
