import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NewsService} from "./service/news.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit{

  title = 'LpNews';
  public sources:any=[];
  public article:any=[];
  @ViewChild(MatSidenav) sideNav!: MatSidenav;


  constructor(private observer:BreakpointObserver,
              private cdr:ChangeDetectorRef,
              private newApi:NewsService) {

  }

  ngOnInit() {
      this.newApi.intitArticles().subscribe(
        (res:any)=>{
          console.log(res);
          this.article=res.article;
        }
      )

      this.newApi.initSources().subscribe(
      (res:any)=>{
        console.log(res);
        this.sources=res.sources;
      }
    )
  }


  ngAfterViewInit(): void {
    this.sideNav.opened = true;
    this.observer.observe(['(max-width:800px)'])
        .subscribe((res)=>{
          if(res?.matches){
            this.sideNav.mode="over";
            this.sideNav.close();
          }else{
            this.sideNav.mode = 'side';
            this.sideNav.open();
          }
        })
      this.cdr.detectChanges();
  }

    changeNav(){
      console.log("called")
      if(this.sideNav.opened){
          this.sideNav.mode="over";
          this.sideNav.close();
      }else{
          this.sideNav.mode = 'side';
          this.sideNav.open();
      }
    }

    getSources(){

    }
}
