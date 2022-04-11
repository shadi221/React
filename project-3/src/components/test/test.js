import axios from 'axios';
export let globalUrl = 'http://localhost:4000/'

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export async function getVacations() {
    let res = await axios.get(globalUrl + 'allVacations')
    let data = res.data
    return data
}


export async function checkUser() {
    let user = ''
    if (localStorage.user) {
        user = JSON.parse(localStorage.user)
    } else {
        alert('You Must Be Signed In')
        window.location.href = "/"
    }
    console.log(user)
    return  user
}

export async function deleteVacation(id) {
    let res = axios.get(globalUrl + `deleteVacation?id=${id}`)
    let data = res.data
}




