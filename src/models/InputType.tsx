import { ChangeEvent } from 'react';

type FormProps = {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  placeholder: string;
};

export interface InputType {
  value: string;
  type: string;
  setting: FormProps;
}
