import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/shared/components/ui/field';

import { Input } from '@/shared/components/ui/input';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthLoginMutation } from '../hooks/use-auth.query';
import { AuthMode } from '../interfaces/auth.interfaces';

const formSchema = z.object({
  email: z.string().email({ message: 'please-enter-a-valid-email' }),
  password: z.string().min(1, {
    message: 'the-minimum-length-required'
  })
});

export type LoginFields = z.infer<typeof formSchema>;

interface LoginProps {
  setAuthMode: (mode: AuthMode) => void;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ setAuthMode, onClose }) => {
  const { mutate, isPending, isSuccess } = useAuthLoginMutation();
  const [t] = useTranslation();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t('forgot-your-password')}?
                  </a>
                </div>
                <Input placeholder={t('password')} {...field} type="password" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error?.message]} />
                )}
              </Field>
            )}
          />
          <div className="text-center text-sm">
            {t('do-not-have-an-account')}
            <a
              className="ml-1 cursor-pointer underline underline-offset-4"
              onClick={() => setAuthMode('register')}
            >
              {t('sign-up')}
            </a>
          </div>

          <Button type="submit" className="w-full" isLoading={isPending}>
            {t('login')}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
