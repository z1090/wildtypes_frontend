import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SightingsPage } from './sightings.page';

describe('SightingsPage', () => {
  let component: SightingsPage;
  let fixture: ComponentFixture<SightingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SightingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
