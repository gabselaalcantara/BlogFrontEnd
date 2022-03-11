import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {  }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token ={
      headers: new HttpHeaders().set('Authorization', environment.token)
    };
  }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://blog-pessoal-blog-da-gabs.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://blog-pessoal-blog-da-gabs.herokuapp.com/usuarios/cadastrar', usuario)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://blog-pessoal-blog-da-gabs.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){
    let ok: boolean =  false

    if(environment.token != ''){
      ok = true
    }
    return ok
  }
  adm(){
    let ok: boolean =  false

    if(environment.tipo == 'adm'){
      ok = true
    }
    return ok
  }

  }
