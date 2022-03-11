import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tema: Tema = new Tema
  listaTemas: Tema[]
  idTema: number

  idUsuario = environment.id
  usuario: Usuario = new Usuario()

  postagem: Postagem = new Postagem()
  listarPostagens: Postagem[]

  key = 'data'
  reverse = true
  tituloPost: string
  nomeTema: string

  constructor(
    private router : Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    public authService: AuthService,
    private alertas: AlertasService) { }

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token == ''){
      alert('sua seção expirou, faça login novamente')
      this.router.navigate(['/entrar'])
    }
    this.authService.refreshToken();
    this.listarTemas();
    this.listarTodasPostagens();
  }

  listarTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  buscarTemaPorId(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }
  findByIdUsuario(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

  listarTodasPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listarPostagens = resp
      console.log(this.listarPostagens)
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id= this.idUsuario
    this.postagem.usuario = this.usuario

    console.log(this.postagem)
    this.postagemService.postTema(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp;
      this.alertas.showAlertSuccess('Postagem efeituada com sucesso')
      this.postagem = new Postagem()
    })
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.listarTodasPostagens()
    } else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listarPostagens = resp
      })
    }

    }

    findByNomeTema(){
      if(this.nomeTema == ''){
        this.listarTemas()
      } else{
        this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
          this.listaTemas = resp
        })
    }

  }
}
