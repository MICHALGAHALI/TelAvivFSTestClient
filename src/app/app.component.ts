import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, interval, of, from, merge } from 'rxjs';
import { catchError, filter, map, mergeMap, startWith, tap } from "rxjs/operators";
import { IssLocationService } from './iss-location.service';
import { issNow } from './Iss.location.model';
import { DialogComponent } from './shared/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  issLocation$: Observable<issNow> = this._issLocation.Get();
  locations: issNow[] = [];
  isSuccess$: Observable<any> = of();
  error: string = '';
  constructor(private _issLocation: IssLocationService, private _dialog: MatDialog, private _cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    const tik$: Observable<number> = interval(2 * 60 * 1000);
    this.issLocation$ = tik$.pipe(
      startWith(() => this._issLocation.Get()),
      mergeMap(() => <Observable<issNow>>this._issLocation.Get()),
      filter(data => data !== null),
      tap((v) => { console.log(v) })
    );

  }
  openDialog(): void {
    this.issLocation$.subscribe((issNow: issNow) => {
      const dialogRef = this._dialog.open(DialogComponent, {
        width: '250px',
        data: issNow
      });

      dialogRef.afterClosed().subscribe((result: issNow) => {
        this.locations = this.locations.concat(result);
        this._cd.detectChanges();

      });
    })
  }
  saveLocations() {
    this.isSuccess$=this._issLocation.Save(this.locations).pipe(
      catchError((err) => {
        this.error = err.message;
        return of([])
      }),
      map((res: Response) =>{
        this.locations=new Array()//init after save        
        return res;
      })
      
    )
  }
}


