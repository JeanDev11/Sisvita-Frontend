import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Test } from '../../../model/test';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  tests: Test[] = [];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.testService.getTests().subscribe(
      (data: Test[]) => {
        this.tests = data;
      },
      (error) => {
        console.error('Error fetching tests:', error);
      }
    );
  }
}
