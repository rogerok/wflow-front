import { createUserRequest } from '@shared/api';
import { convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable } from 'mobx';

import { UserCreateFormSchema, UserCreateFormType } from '../types/userCreate';

export class SignUpService {
  private abortController: AbortController | null = null;
  createUserRequest = new RequestStore(createUserRequest);

  userForm = new FormStore<UserCreateFormType>({
    schema: UserCreateFormSchema,
    defaultValues: {
      bornDate: '',
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      password: '',
      passwordConfirm: '',
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

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  abortRequest = (): void => {
    this.abortController?.abort();
    this.abortController = null;
  };

  submitForm = async (): Promise<void> => {
    this.abortController = new AbortController();

    await this.userForm.submit(async (formValues: UserCreateFormType) => {
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

        this.abortController,
      );
    });
  };
}
