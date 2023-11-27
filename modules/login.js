import { setUser } from "../main.js";
import { postLogin, postReg } from "./api.js";
import { renderComments } from "./renderComments.js";


let isLoginMode = true;
export function renderLogin() {
  const loginHtml = `
    <h1 class="header-login">Страница ${isLoginMode ? "входа" : "Регистрации"}</h1>
    <div class="form">
      <div class="form-row">
      ${isLoginMode ? "" : '<input type="text" id="name-input" class="input" placeholder="Имя" />'}
        <input type="text" id="login-input" class="input" placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="input"
          placeholder="Пароль"
        />
      </div>
      <br />
      <div class="form-center">
      <button class="button-form" id="login-button">Войти</button>
      <a class="link-form" id="login-link">Перейти на страницу ${!isLoginMode ? "входа" : "Регистрации"}</a>
      </div>
    </div>
    `
  const container = document.querySelector('.container');
  container.innerHTML = loginHtml;

  const loginElement = document.getElementById("login-input");
  const passwordElement = document.getElementById("password-input");
  const nameElement = document.getElementById("name-input")

  const loginLink = document.getElementById("login-link")
  loginLink.addEventListener("click", () => {
    isLoginMode = !isLoginMode;
    renderLogin()
  })

  const enterButton = document.getElementById("login-button");
  enterButton.addEventListener('click', () => {
    if (isLoginMode) {
      postLogin({
        login: loginElement.value,
        password: passwordElement.value,
      })
        .then(responseData => {
          console.log(responseData.user);
          setUser(responseData.user);
          renderComments();
        }).catch((err) => {
          alert("Введены неверные данные")
          console.log(err);
        });
    } else {
      postReg({
        login: loginElement.value,
        password: passwordElement.value,
        name: nameElement.value,
      }).then(responseData => {
        console.log(responseData.user);
        setUser(responseData.user);
        renderComments();
      }).catch((err) => {
        alert("Введены неверные данные")
        console.log(err);
      });
    }

  });
}