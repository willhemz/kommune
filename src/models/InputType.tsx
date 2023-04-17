import { ChangeEvent } from 'react';

type FormProps = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
};

export interface InputType {
  value: string;
  type: string;
  setting: FormProps;
}
