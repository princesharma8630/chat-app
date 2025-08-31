import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user/user-service';

@Component({
  selector: 'app-receiver-p',
  imports: [],
  templateUrl: './receiver-p.html',
  styleUrl: './receiver-p.scss'
})
export class ReceiverP {


  constructor(private ar:ActivatedRoute , private us:UserService){}
  receiverId:any;
  receiverName:any='Unknown User';
  ngOnInit(){
    this.ar.params.subscribe(params=>{
      this.receiverId=params['receiverUid'];
      this.us.getUserNameById(this.receiverId).then(name=>{
        this.receiverName=name;
      })
    })
  }
  

}


