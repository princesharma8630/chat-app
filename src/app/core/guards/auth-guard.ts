import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 


  const auth = inject(Auth);
  const router = inject(Router);

return new Promise<boolean>((resolve)=>{
  const unsubscribe = auth.onAuthStateChanged((user)=>{
    unsubscribe();
      if(user){
    console.log('Guard : user logged in' , user.uid);
    resolve(true);
  }
  else{
    console.log("Guard : user not logged in-> redirect");
    router.navigate(['/login']);
    resolve(false);  
  }
  })

})
};
