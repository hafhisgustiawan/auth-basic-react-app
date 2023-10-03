import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/AuthContext';

const emailReducer = (state, action) => {
  // params state disini adalah latest state sebelum di update atau function ini dipanggil
  // params state disini read only, jangan update isinya, cek dokumentasi di web ya
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  throw Error('Unknown action: ' + action.type);
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  throw Error('Unknown action: ' + action.type);
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: true,
  });

  // useEffect(() => {
  //   // disini dia akan di eksekusi sekali saja sewaktu page loaded, krn dependencies nya kosong dan tidak akan berubah
  //   console.log('EFFECT RUNNING!');
  // }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // ini akan di eksekusi setelah clean up function, kecual saat pertama loaded

    const identifier = setTimeout(() => {
      console.log('Use Effect Executed!');
      setFormIsValid(
        emailState.isValid &&
          passwordState.isValid &&
          emailState.value.trim().length > 0 &&
          passwordState.value.trim().length > 0
      );
    }, 500);

    return () => {
      // ini bernama clean up function
      // function ini yang akan di eksekusi deluan dibanding yang di atas
      console.log('clearup function executed!');
      clearTimeout(identifier);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailIsValid, passwordIsValid]);
  // useEffect() ini hanya akan di eksekusi jika salah satu atau semua deppendencies nya berubah nilai. Cek video 145

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!emailState.isValid || emailState.value.trim().length === 0) {
      emailInputRef.current.focus();
      return;
    }
    if (!passwordState.isValid || passwordState.value.trim().length === 0) {
      passwordInputRef.current.focus();
      return;
    }
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button> */}
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
