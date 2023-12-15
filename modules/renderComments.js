import { comments, user } from "../main.js";
import { postComments } from "./api.js";
import { actionCommentListener, addLike, editingComment, initEditElements, initSaveButtons } from "./eventListeners.js";
import { renderLogin } from "./login.js";
import { sanitizeHtml } from "./utils.js";

export const renderComments = () => {
  const container = document.querySelector('.container')

  // const formCommentElement = document.getElementById('add-comment');
  const getRender = comments.map((comment, index) => {
    return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${sanitizeHtml(comment.name)}</div>
        <div class="comment-date">${sanitizeHtml(comment.date)}</div>
      </div>
      <div class="comment-body">
        ${comment.isEdit
        ? `<textarea type="textarea"  class="add-form-text" placeholder="Введите ваш коментарий" rows="4">${sanitizeHtml(comment.text)}</textarea>`
        : `<div class="comment-text" data-index="${index}"> ${sanitizeHtml(comment.text)} </div>`}
      </div>
      <div class="comment-footer">
        ${comment.isEdit
        ? `<button  class="save-form-button" data-index="${index}">Сохранить</button>`
        : `<button  class="edit-form-button" data-index="${index}">Редактировать</button>`
      }
        <div class="likes">
          <span class="likes-counter">${comment.likeCount}</span>
          <button class="like-button ${comment.isLike ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    </li>`
  }).join('');
  container.innerHTML = `<ul class="comments" >${getRender}</ul>
  <div class="mask-comment">
      <div class="loader-comment">Комментарий загружается...</div>
    </div>
  ${!user ? `<p class="autorize">Чтобы оставить комментарий пожалуйста, <button class="autorize-button" id="loginButton">АВТОРИЗУЙТЕСЬ</button></p>` : `<div class="add-form">
  <input type="text" value="${user.name}" readonly class="add-form-name" placeholder="Введите ваше имя" id="form-name" />
  <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
    id="form-text"></textarea>
  <div class="add-form-row">
    <button class="add-form-button" id="add-button">Написать</button>
  </div>
</div>
<button class="add-form-button" id="add-button-delete">Удалить последний комментарий</button>`}`
  const addButtonElement = document.getElementById("add-button")
  if (addButtonElement) {
    addButtonElement.addEventListener("click", postComments)
  }
  const getLoginbutton = document.getElementById("loginButton")
  if (getLoginbutton) {
    getLoginbutton.addEventListener('click', renderLogin)
  }
  if (user) {
    addLike()
    initEditElements();
    initSaveButtons();
    editingComment();
    actionCommentListener();
  };


};