import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTablaqComponent } from './dialog-tablaq.component';

describe('DialogTablaqComponent', () => {
  let component: DialogTablaqComponent;
  let fixture: ComponentFixture<DialogTablaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTablaqComponent]
    });
    fixture = TestBed.createComponent(DialogTablaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
