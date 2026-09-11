import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContactForm } from '../../components/contact-form/contact-form';

@Component({
  selector: 'app-contact-page',
  imports: [ContactForm],
  templateUrl: './contact.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPage {}