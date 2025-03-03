import { createUserRequest } from '@shared/api';
import { AppRouter, convertEmptyStringToNull, FormStore } from '@shared/lib';
import { RequestStore } from '@shared/stores';
import { makeAutoObservable, runInAction } from 'mobx';

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
      pseudonymFirstName: '',
      pseudonymLastName: '',
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
      const resp = await this.createUserRequest.call(
        {
          email: formValues.email,
          firstName: formValues.firstName,
          lastName: convertEmptyStringToNull(formValues.lastName),
          middleName: convertEmptyStringToNull(formValues.middleName),
          password: formValues.password,
          passwordConfirm: formValues.passwordConfirm,
          pseudonym: {
            firstName: convertEmptyStringToNull(formValues.pseudonymFirstName),
            lastName: convertEmptyStringToNull(formValues.pseudonymLastName),
          },
          socialLinks: {
            instagram: convertEmptyStringToNull(
              formValues.socialLinks.instagram,
            ),
            telegram: convertEmptyStringToNull(formValues.socialLinks.telegram),
            tiktok: convertEmptyStringToNull(formValues.socialLinks.tiktok),
            vk: convertEmptyStringToNull(formValues.socialLinks.vk),
          },

          bornDate: null,
        },

        this.abortController,
      );

      runInAction(() => {
        if (resp.status === 'success') {
          AppRouter.router.navigate({
            to: '/signIn',
          });
        }
      });
    });
  };
}
