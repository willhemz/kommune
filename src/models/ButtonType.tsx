export interface ButtonType {
  text: string;
  onClick?: () => void;
  type: 'blue' | 'white';
  btn: 'submit' | 'button' | 'reset';
}
