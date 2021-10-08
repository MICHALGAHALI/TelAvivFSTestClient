import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
        return next.handle(request).pipe(
          
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.status === 400) {
                        console.log(`event.status ${event.status}-${event.body}`)
                    }
                }
            }))
        //     catchError((err) => 
        //          of([err])                         
        //    )
    }
}