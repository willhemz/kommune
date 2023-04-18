export interface ButtonType {
  onClick?: () => void;
  type: 'blue' | 'white';
  btn: 'submit' | 'button' | 'reset';
}
