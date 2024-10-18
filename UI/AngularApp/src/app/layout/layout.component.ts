import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  name: string = '';
  decodedToken : any;
  constructor(private jwtService: JwtDecoderService){

  }

  ngOnInit(): void{
    const token = localStorage.getItem("token");
    console.log(token);
  if(token){
   this.decodedToken = this.jwtService.getUserinfo(token);
    console.log("value : "+ this.decodedToken.email);
    this.name = this.decodedToken.email;
  }
 
}

}
