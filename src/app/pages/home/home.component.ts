import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import { DeviceDetectorService } from 'ngx-device-detector';

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
import { MatSidenav } from "@angular/material/sidenav";

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
  @ViewChild('drawer', { static: false }) sidenav?: MatSidenav;


  show: boolean | any;
  thumbs: any;
  slides$ = new BehaviorSubject<string[]>(['']);

  activeSlide: number | undefined;
  activeSlideProject: number | any;
  initChange = true;
  showFiller = false;

  deviceInfo: any;
  sliderMargin = 30;
  projectSlideMargin = 0;

  isDesktopDevice = true;

  constructor(private cd: ChangeDetectorRef, private router: Router, private deviceService: DeviceDetectorService) {
    this.epicFunction();
  }

  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    this.isDesktopDevice = isDesktopDevice;
    console.log(isMobile , isTablet , this.deviceInfo)
    if (isMobile) {
      this.sliderMargin = -220;
      this.projectSlideMargin = -175;
    } else if (isTablet) {
      this.sliderMargin = 38;
      this.projectSlideMargin = 15;
    }
  }



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

  slideChange(event: any, type = 'tabs') {
    console.log(event)
    if (this.initChange === false && type === 'tabs') {
      this.activeSlide = event[0].realIndex;
      this.cd.detectChanges();
      console.log(this.activeSlide)
    } else if (this.initChange === false && type === 'project') {
      this.activeSlideProject = event[0].realIndex;
      this.cd.detectChanges();
      console.log(this.activeSlideProject)
    }
  }

  getbla() {
    console.log('asdasd')
  }

  getActiveSlideForBody() {
    console.log(this.activeSlide)
    return this.activeSlide;
  }


  goToAnchor(section = '', slideInd = 2, isMobile = false) {
    this.router.navigate([''], { fragment: section })
    this.slideTo(slideInd);
    if (isMobile) {
      this.sidenav?.toggle();
    }
  }


  getPage(hrefLink: any) {
    window.open(hrefLink, '_blank');
  }

}
