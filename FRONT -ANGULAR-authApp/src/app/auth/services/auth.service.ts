import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario !: Usuario;


  get usuario() {
    return {...this._usuario};
  }

  constructor(
    private http: HttpClient
  ) { }

// ================================================================================

  login(  email: string, password: string){
    const url = `${this.baseUrl}/auth`;
   return this.http.post<AuthResponse>(url, {email, password}).pipe( 
    tap( resp => {
      if( resp.ok) {

        localStorage.setItem('token',resp.token!);

        this._usuario = {
          name: resp.name!,
          uid: resp.uid!
        }
      }
      console.log(resp);
    } ),
    map(resp => resp.ok), catchError(err => of(err.error.msg) )
   )
  }

// ================================================================================

  validarToken() {
    const url = `${ this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

  return this.http.get(url, { headers});


  }

// ================================================================================










}
