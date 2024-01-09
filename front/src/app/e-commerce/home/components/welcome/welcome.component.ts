import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  textToType: string[] = ['Los mejores productos', 'El mejor internet', 'Al mejor precio'];
  currentIndex: number = 0;
  typeSpeed: number = 100;
  eraseSpeed: number = 100;
  currentText: string = '';

  private typingInterval: any;

  constructor() {}

  ngOnInit(): void {
    this.typeWriter();
  }

  ngOnDestroy(): void {
    clearTimeout(this.typingInterval);
  }

  typeWriter(): void {
    const word = this.textToType[this.currentIndex];
    if (this.currentText !== word) {
      this.currentText = word.substring(0, this.currentText.length + 1);
      this.typingInterval = setTimeout(() => this.typeWriter(), this.typeSpeed);
    } else {
      this.typingInterval = setTimeout(() => this.eraseText(), this.eraseSpeed);
    }
  }

  eraseText(): void {
    if (this.currentText.length > 0) {
      this.currentText = this.currentText.substring(0, this.currentText.length - 1);
      this.typingInterval = setTimeout(() => this.eraseText(), this.eraseSpeed);
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.textToType.length;
      this.typingInterval = setTimeout(() => this.typeWriter(), this.typeSpeed);
    }
  }
}