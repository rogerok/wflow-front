import { convertEmptyStringToNull, FormStore, RequestStore } from '@shared';
import { makeAutoObservable } from 'mobx';

import { createUserRequest } from '../api/signUpApi';
import { UserCreateRequestSchema, UserCreateRequestType } from '../types/user';

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

  abortController = new AbortController();

  constructor() {
    makeAutoObservable(this);
  }

  submitForm = async (): Promise<void> => {
    await this.userForm.submit(async (formValues: UserCreateRequestType) => {
      const result = await this.createUserRequest.call(
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
