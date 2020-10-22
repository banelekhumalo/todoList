import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpagePage } from './upage.page';

describe('UpagePage', () => {
  let component: UpagePage;
  let fixture: ComponentFixture<UpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
