import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { BehaviorSubject } from "rxjs";
import Swiper from "swiper/types/swiper-class";
import { Router } from "@angular/router";

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  @ViewChild('swipe', { static: false }) swipe?: SwiperComponent;
  @ViewChild('swipeProject', { static: false }) swipeProjetc?: SwiperComponent;

  show: boolean | any;
  thumbs: any;
  slides$ = new BehaviorSubject<string[]>(['']);

  activeSlide: number | undefined;
  activeSlideProject: number | any;
  initChange = true;


  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone , private router: Router ) { }
  ngOnInit() { }

  ngAfterViewInit(): void {
    this.slideToProjects(0);
    this.slideTo(3);
  }

  slideTo(ind: number) {
    this.swipe?.swiperRef.slideTo(ind);
    this.activeSlide = ind;
    setTimeout(() => {
      this.initChange = false;
    }, 200);
  }

  slideToProjects(ind: number) {
    this.swipeProjetc?.swiperRef.slideTo(ind);
    this.activeSlideProject = ind;
  }

  slideChange(event: any , type = 'tabs') {
    if (this.initChange === false && type === 'tabs') {
      this.activeSlide = event[0].realIndex;
      this.cd.detectChanges();
      console.log(this.activeSlide)
    } else if(this.initChange === false && type === 'project'){
      this.activeSlideProject = event[0].realIndex;
      this.cd.detectChanges();
      console.log(this.activeSlideProject)
    }
  }

  getActiveSlideForBody(){
    console.log(this.activeSlide)
    return this.activeSlide;
  }


  goToAnchor(section = '' , slideInd = 2){
    this.router.navigate([''] , {fragment: section})
    this.slideTo(slideInd);
  }


  getPage(hrefLink : any){
    window.open(hrefLink, '_blank');
  }

}
