import { useState } from 'react';
import './App.scss';

function InputField({ label, type, value, onChange, error }) {
  return (
    <div>
      <label htmlFor={label}>{label}
        {error && <span style={{ color: '#4CAF50', fontSize: '12px', marginLeft: '10px' }}>{error}</span>}
      </label>
      <input
        className={error ? 'error' : ''}
        onChange={onChange}
        value={value}
        type={type}
        id={label.toLowerCase()}
      />
    </div>
  );
}

function App() {
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null
  });

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleUsername = (e) => {
    setFormState({
      ...formState,
      username: e.target.value
    });

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        username: 'Username is required'
      });
      return;
    }
    if (e.target.value.length <= 3) {
      setErrors({
        ...errors,
        username: 'Username needs to be more than 3 characters'
      });
      return;
    }

    setErrors({
      ...errors,
      username: null
    });
  };

   const handleEmail = (e) => {
    setFormState({
      ...formState,
      email: e.target.value
    });

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        email: 'Email is required'
      });
      return;
    }

    if (!e.target.value.trim().includes('@')) {
      setErrors({
        ...errors,
        email: 'Email must contain the "@" symbol'
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(e.target.value)) {
      setErrors({
        ...errors,
        email: 'Email format is invalid'
      });
      return;
    }

    setErrors({
      ...errors,
      email: null
    });
  };

  const handlePass = (e) => {
    setFormState({
      ...formState,
      password: e.target.value
    });

    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        password: 'Password is required'
      });
      return;
    }
    if (e.target.value.length <= 3) {
      setErrors({
        ...errors,
        password: 'Password needs to be more than 3 characters'
      });
      return;
    }

    const specialCharacterRegex = /[!@#$%^&+*(),.?:{}|<>]/;
    if (!specialCharacterRegex.test(e.target.value)) {
      setErrors({
        ...errors,
        password: 'Password must contain at least one special character like !@#$%^&*(),.?:{}|<>'
      });
      return;
    }

    setErrors({
      ...errors,
      password: null
    });
  };

  // Обработчик отправки формы
  const handlerFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  // Проверяем, есть ли ошибки в форме
  const isFormValid = !errors.username && !errors.email && !errors.password;

  return (
    <div className="form-block">
      <h1>Sign Up</h1>
      <form onSubmit={handlerFormSubmit} className="form">
        <InputField
          label="Username"
          type="text"
          value={formState.username}
          onChange={handleUsername}
          error={errors.username}
        />
        <InputField
          label="Email"
          type="email"
          value={formState.email}
          onChange={handleEmail}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={formState.password}
          onChange={handlePass}
          error={errors.password}
        />
        {/* Кнопка будет деактивирована, если есть ошибки */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={isFormValid ? 'active' : 'disabled'}
        >
          Submit
        </button>
      </form>
      <div>
        <p>Errors</p>
        <pre>{JSON.stringify(errors, null, 2)}</pre>
        <p>Form State</p>
        <pre>{JSON.stringify(formState, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;