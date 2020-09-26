import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading: boolean;
  succes: boolean;
  info: string;

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  getValidatorMessage(f: AbstractControl, name: string) {
    if (f.errors) {
      for (let errorName in f.errors) {
        if (errorName == 'required') {
          return `${name} alanı boş bırakılamaz`;
        } else if (errorName == 'email') {
          return `email formatı yanlış`;
        }else if(errorName=="minlength"){
          return `${name} alanı en az 5 karakter olmalıdır`
        }
      }
    }
  }

  get getControls(){
    return this.contactForm.controls
    //getControls().email
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.loading = true;
      this.helperService.sendContactEmail(this.contactForm.value).subscribe(
        (data) => {
          this.loading = false;
          this.succes = true;
          this.contactForm.reset();
          this.info =
            'Mesajınız alınmıştır size kısa sürede dönüş yapılacaktır.';
        },
        (error) => {
          this.loading = false;
          this.succes = false;
          this.info =
            'Bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.';
        }
      );
    }
  }
}
