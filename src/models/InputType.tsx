type FormProps = {
  onChange: () => void;
  error?: boolean;
  errorMessage?: string;
  placeholder: string;
};

export interface InputType {
  value: string;
  type: string;
  setting: FormProps;
}
