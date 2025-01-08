import { convertEmptyStringToNull, FormStore, RequestStore } from '@shared';
import { makeAutoObservable } from 'mobx';

import { createUserRequest } from '../api/signUpApi';
import {
  UserCreateRequestSchema,
  UserCreateRequestType,
} from '../types/userCreate';

export class SignUpService {
  createUserRequest = new RequestStore(createUserRequest);

  userForm = new FormStore<UserCreateRequestType>({
    schema: UserCreateRequestSchema,
    defaultValues: {
      bornDate: new Date().toString(),
      email: '123@gmails.com',
      firstName: 'sdsdsdd',
      lastName: '',
      middleName: '',
      password: 'Password1!',
      passwordConfirm: 'Password1!',
      pseudonym: {
        firstName: '',
        lastName: '',
      },
      socialLinks: {
        instagram: '',
        telegram: '',
        tiktok: '',
        vk: '',
      },
    },
  });

  private abortController: AbortController | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  abortRequest = (): void => {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null; // Reset the controller
    }
  };

  submitForm = async (): Promise<void> => {
    this.abortController = new AbortController();

    await this.userForm.submit(async (formValues: UserCreateRequestType) => {
      await this.createUserRequest.call(
        {
          email: formValues.email,
          firstName: formValues.firstName,
          lastName: convertEmptyStringToNull(formValues.lastName),
          middleName: convertEmptyStringToNull(formValues.middleName),
          password: formValues.password,
          passwordConfirm: formValues.passwordConfirm,
          pseudonym: {
            firstName: convertEmptyStringToNull(formValues.pseudonym.firstName),
            lastName: convertEmptyStringToNull(formValues.pseudonym.lastName),
          },
          socialLinks: {
            instagram: null,
            telegram: null,
            tiktok: null,
            vk: null,
          },
          bornDate: null,
        },

        this.abortController
      );
    });
  };
}
