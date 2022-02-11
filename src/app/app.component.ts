import { ChangeDetectorRef, Component, NgZone, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required components
import SwiperCore , {
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  @ViewChild('swipe', { static: false }) swipe?: SwiperComponent;

  show: boolean | any;
  thumbs: any;
  slides$ = new BehaviorSubject<string[]>(['']);

  activeSlide = 2;
  initChange = true;


  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {}
  ngOnInit() {}

  ngAfterViewInit(): void {
   this.slideTo(this.activeSlide)
  }

  slideTo(ind: number){
    this.swipe?.swiperRef.slideTo(ind);
    this.activeSlide = ind;
    setTimeout(() => {
      this.initChange = false;
    }, 500);
  }

  slideChange(event: any){
    if(this.initChange !== true){
    this.activeSlide =  event[0].realIndex;
    }
  }

}
