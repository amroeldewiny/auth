import { Injectable } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';

@Injectable()
export class DataService {


  constructor(public auth: AuthService) { }



}
