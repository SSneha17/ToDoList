import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  decode_token(token:string){
    try{
    /*  const base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = decodeURIComponent(
        atob(base64).split('').map((c)=>{ return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
      return JSON.parse(payload);
      */

      return jwtDecode(token);
    }
    catch(error){
      return null;
    }
  }

  getUserinfo(token: string){
    const decodedToken = this.decode_token(token);
  //  console.log("decodedToken" + decodedToken.email )
    return decodedToken? decodedToken: null;
  }

}
