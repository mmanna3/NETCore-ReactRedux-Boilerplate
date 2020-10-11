import React from 'react';
import Form from 'components/Form';
import { Input } from "components/Input";
import ValidationSummary from "components/ValidationSummary";
import { SubmitButton } from "components/Buttons";
import { login, loginSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'
import styles from './Page.module.scss'
import { useHistory } from "react-router-dom";
import { siEstaLogueadoEnviarTokenEnTodosLosRequests } from 'features/login/servicio'

const LoginPage = () => {

  const {loading, validationErrors} = useSelector(loginSelector)

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(login(data, onSuccess));
  
  let history = useHistory();

  function onSuccess() {    
    siEstaLogueadoEnviarTokenEnTodosLosRequests();
    history.push("/habitaciones");
  }

  return (
    <div className={`columns is-gapless is-desktop ${styles.columns}`}>
      <div className="column is-flex is-hidden-mobile has-background-primary">
        {/* <h1 className="title is-1 has-text-white">SEPA </h1> */}
      </div>
      <div className="column is-flex is-vcentered is-centered">
          <Form onSubmit={onSubmit} className={`login-form ${styles.loginForm}`}>
            <ValidationSummary errors={validationErrors} />
            <Input label="Usuario" name="username" />
            <Input type="password" label="Contraseña" name="password" />
            <SubmitButton text="Ingresar" loading={loading}></SubmitButton>
          </Form>
      </div>
    </div>
  )
}

export default LoginPage;