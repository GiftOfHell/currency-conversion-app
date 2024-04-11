import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() appImgFallback!: string;

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError(): void {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.appImgFallback || '../../assets/white-flag.jpg';
  }
}
