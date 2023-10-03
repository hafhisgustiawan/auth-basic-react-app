import { forwardRef, useRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  // CEK DOKUMENTASI ATAU VIDEO 162
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current.focus();
      },
    };
  });

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
