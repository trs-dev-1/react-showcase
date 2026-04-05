import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/shared/components/ui/button';

import { Input } from '@/shared/components/ui/input';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/shared/components/ui/field';
import { PASSWORD_MIN_LENGTH } from '../constants/auth.constants';
import { useAuthRegisterMutation } from '../hooks/use-auth.query';
import { AuthMode } from '../interfaces/auth.interfaces';

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: 'the-minimum-length-required'
  }),
  lastName: z.string().min(1, {
    message: 'the-minimum-length-required'
  }),
  email: z.string().email({ message: 'please-enter-a-valid-email' }),
  password: z.string().min(PASSWORD_MIN_LENGTH, {
    message: 'the-minimum-length-required'
  })
});

export type RegisterFields = z.infer<typeof formSchema>;

interface RegisterProps {
  setAuthMode: (mode: AuthMode) => void;
  onClose: () => void;
}

export const Register: React.FC<RegisterProps> = ({ setAuthMode, onClose }) => {
  const { mutate, isPending, isSuccess } = useAuthRegisterMutation();
  const [t] = useTranslation();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <FieldGroup>
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{t('first-name')} </FieldLabel>
              <Input placeholder={t('first-name')} {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error?.message]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{t('last-name')} </FieldLabel>
              <Input placeholder={t('last-name')} {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error?.message]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{t('e-mail')}</FieldLabel>
              <Input placeholder={t('e-mail')} {...field} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error?.message]} />
              )}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>{t('password')}</FieldLabel>
              <Input placeholder={t('password')} {...field} type="password" />
              {/* <FormMessage
                messageFactory={(message) =>
                  t(message, { minLength: PASSWORD_MIN_LENGTH })
                }
              /> */}

              {fieldState.invalid && (
                <FieldError
                  errors={[form.formState.errors.password?.message]}
                />
              )}
            </Field>
          )}
        />
        <div className="text-center text-sm">
          {t('already-have-an-account')}
          <a
            className="ml-1 cursor-pointer underline underline-offset-4"
            onClick={() => setAuthMode('login')}
          >
            {t('sign-in')}
          </a>
        </div>
        <Button type="submit" className="w-full" isLoading={isPending}>
          {t('register')}
        </Button>
      </FieldGroup>
    </form>
  );
};
