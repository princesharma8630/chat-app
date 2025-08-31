import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverP } from './receiver-p';

describe('ReceiverP', () => {
  let component: ReceiverP;
  let fixture: ComponentFixture<ReceiverP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiverP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiverP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
