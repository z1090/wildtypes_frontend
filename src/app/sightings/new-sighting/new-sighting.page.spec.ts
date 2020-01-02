import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSightingPage } from './new-sighting.page';

describe('NewSightingPage', () => {
  let component: NewSightingPage;
  let fixture: ComponentFixture<NewSightingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSightingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSightingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
