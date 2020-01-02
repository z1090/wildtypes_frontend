import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SightingDetailPage } from './sighting-detail.page';

describe('SightingDetailPage', () => {
  let component: SightingDetailPage;
  let fixture: ComponentFixture<SightingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightingDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SightingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
