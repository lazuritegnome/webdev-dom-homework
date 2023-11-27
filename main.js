"use strict";
import { getComments } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";


//СТР РЕЖИМ *



const addLoaderComment = document.querySelector(".mask-comment");
addLoaderComment.style.display = 'none';

getComments(); //вызываем функцию котороя получит данные и вызовет render функцию

//upd API - данные постятся и получаются из API
export let comments = [];
export const setComments = (newComments) => {
    comments = newComments
}

renderComments();
