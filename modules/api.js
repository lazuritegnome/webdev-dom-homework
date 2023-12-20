import { setComments, user } from "../main.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";

export const getComments = () => {
    return fetch('https://wedev-api.sky.pro/api/v2/egor-gorohow/comments',
        {
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал');
            }
            return response.json();
        })
        .then((responseData) => {
            let appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: format((new Date(comment.date)),"yyyy-MM-dd hh.mm.ss"),
                    text: comment.text,
                    likeCount: comment.likes,
                    isLike: comment.isLiked
                };
            });
            setComments(appComments);
            renderComments();
            //скрытие лоадера
            loaderHide();
        })
        .catch((error) => {
            if (error.message === "Сервер упал") {
                alert('сервер сломался, попробуй позже');
            };
        });
};

export const postComments = () => {
    const nameElement = document.getElementById('form-name');
    const textElement = document.getElementById('form-text');
    const buttonElement = document.getElementById('add-button');
    const addLoaderComment = document.querySelector(".mask-comment");
    const formLoader = document.querySelector('.add-form');
    const buttonDeleteElement = document.getElementById('add-button-delete');
    fetch('https://wedev-api.sky.pro/api/v2/egor-gorohow/comments',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({
                name: nameElement.value,
                text: textElement.value,
                // forceError: true
                // вышел флаг 500 ошибок
            }),
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер упал');
            }
            if (response.status === 400) {
                throw new Error('Ошибка ввода');
            }
            return response.json();
        })
        .then(() => {
            return getComments();
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            nameElement.value = ''; //очищаем форму (имя);
            textElement.value = ''; //очищаем форму (текст);
        })
        .catch((error) => {

            if (error.message === "Сервер упал") {
                alert('сервер сломался, попробуй позже');

            }
            else if (error.message === 'Ошибка ввода') {
                alert('Имя и комментарий должны быть не короче 3х символов');

            } else
                alert('кажется что то пошло не так, попробуйте позже');
        })
        .finally(() => {
            addLoaderComment.style.display = 'none';
            formLoader.style.visibility = 'visible';
            buttonDeleteElement.style.visibility = 'visible'

        })
    addLoaderComment.style.display = 'block';
    formLoader.style.visibility = 'hidden';
    buttonDeleteElement.style.visibility = 'hidden'
}

function loaderHide() {
    const buttonDeleteElement = document.getElementById('add-button-delete');
    const addLoader = document.querySelector(".mask");
    const formLoader = document.querySelector('.add-form');
    const addLoaderComment = document.querySelector(".mask-comment");

    addLoader.style.display = 'none';
    addLoaderComment.style.display = 'none';
    formLoader.style.visibility = 'visible';
    buttonDeleteElement.style.visibility = 'visible'
}
export function postLogin({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login',
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
            })
        })
        .then(responseData => {
            // проверить статусы
            if (responseData.status != 201) {
                throw Error('данные введены неверно');
            }
            return responseData.json()
        })

}
export function postReg({ login, password, name }) {
    return fetch('https://wedev-api.sky.pro/api/user',
        {
            method: 'POST',
            body: JSON.stringify({
                login,
                password,
                name,
            })
        })
        .then(responseData => {
            // проверить статусы
            if (responseData.status != 201) {
                throw Error('данные введены неверно');
            }
            return responseData.json()
        })

}

