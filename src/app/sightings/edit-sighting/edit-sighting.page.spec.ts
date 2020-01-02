import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSightingPage } from './edit-sighting.page';

describe('EditSightingPage', () => {
  let component: EditSightingPage;
  let fixture: ComponentFixture<EditSightingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSightingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSightingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
