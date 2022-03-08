import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";
import { HostListener } from "@angular/core";

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

  links = ['http://lemodate.com', 'https://www.behance.net/gallery/136464999/GAME-WEB-UI-DESIGN', 'https://www.behance.net/gallery/136401191/inlotus-Meditation-App-Ui-Ux-Design', 'https://www.behance.net/gallery/132388687/NEW-COLLECTION-LANDING-PAGE']


  constructor(private cd: ChangeDetectorRef, private router: Router) {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;

    this.isDesktopDevice = screenWidth > 991;
    const isMobile = screenWidth < 426;
    const isTablet = screenWidth < 991 && screenWidth > 426;

    if (isMobile) {
      this.sliderMargin = -220;
      this.projectSlideMargin = -175;
    } else if (isTablet) {
      this.sliderMargin = -100;
      this.projectSlideMargin = 15;
    }
  }




  ngOnInit() { 
    this.getScreenSize();
  }

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

  getActiveSlideForBody() {
    return this.activeSlide;
  }


  goToAnchor(section = '', slideInd = 2, isMobile = false) {
    this.router.navigate([''], { fragment: section });
    document.getElementById(section)?.scrollIntoView();
    this.slideTo(slideInd);
    if (isMobile) {
      this.sidenav?.toggle();
    }
  }


  getPage(hrefLink: any) {
    window.open(hrefLink, '_blank');
  }

}
