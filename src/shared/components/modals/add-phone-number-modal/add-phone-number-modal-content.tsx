import { useModal } from '@/shared/hooks/utils/use-modal';
import { whiteSpaceValidator } from '@/shared/validators/white-space.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import * as z from 'zod';
import { Choose, Otherwise, When } from '../../conditional-rendering';
import { Button } from '../../ui/button';
import { DrawerFooter } from '../../ui/drawer';
import { DrawerModalContent } from '../../ui/drawer-modal/drawer-modal-content';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '../../ui/field';
import { Input } from '../../ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '../../ui/input-otp';

const formSchema = z.object({
  phone: z.string().superRefine(whiteSpaceValidator),
  confirmationCode: z.string().min(6, { message: 'this-field-is-required' })
});

const AddPhoneNumberModalContent = () => {
  const [t] = useTranslation();
  const { onClose } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      phone: '',
      confirmationCode: ''
    }
  });
  const [validateViewVisible, setValidateViewVisible] = useState(false);

  const onNextStep = () => {
    if (!form.getFieldState('phone').invalid) {
      setValidateViewVisible(true);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setValidateViewVisible(false);
    onClose({ field: 'phoneNumber', data: data.phone });
    form.reset();
  };
  return (
    <>
      <DrawerModalContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Choose>
              <When condition={validateViewVisible}>
                <div className="flex flex-col items-center gap-2">
                  <Controller
                    control={form.control}
                    name="confirmationCode"
                    render={({ field }) => (
                      <Field className="flex flex-col items-center">
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>

                        <FieldDescription>
                          {t(
                            'a-code-has-been-sent-to-validate-your-phone-number',
                            {
                              phoneNumber: form.getValues('phone')
                            }
                          )}
                        </FieldDescription>
                      </Field>
                    )}
                  />
                </div>
              </When>

              <Otherwise>
                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>{t('phone-number')}</FieldLabel>
                      <Input
                        placeholder={t('phone-number')}
                        type="number"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error?.message]} />
                      )}
                    </Field>
                  )}
                />
              </Otherwise>
            </Choose>
          </FieldGroup>
        </form>
      </DrawerModalContent>
      <DrawerFooter>
        <Choose>
          <When condition={validateViewVisible}>
            <Button className="w-full">{t('validate')}</Button>
          </When>

          <Otherwise>
            <Button className="group w-full" onClick={onNextStep} type="button">
              {t('to-validation')}
              <FaArrowRight className="ml-2 transition group-hover:translate-x-1" />
            </Button>
          </Otherwise>
        </Choose>
      </DrawerFooter>
    </>
  );
};
export default AddPhoneNumberModalContent;
