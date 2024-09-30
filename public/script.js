const display = document.getElementById('display');
let new_data;

fetch('http://localhost:3000/api/courses')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]['id'])
        }
        const body = document.querySelector('body')
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement('div')
            div = (`id: ${data[i]['id']},  Todo: ${data[i]['name']}`)
            div.id = data[i]['id'];
            let br = document.createElement('br')
            body.append(div)
            body.append(br)
        }
        submitBtn.addEventListener('click', function () {
            let div = document.createElement('div')
            let id = data[data.length - 1]['id'] + 1;
            div.id = id;
            div = (`id: ${id},  Todo: ${userInput.value}`)
            let br = document.createElement('br')
            body.append(div)
            body.append(br)
        });
    })
// const submitBtn = document.getElementById('submitBtn');
// const userInput = document.getElementById('userInput');
// const display = document.getElementById('display');

// const { response } = require("express");

// submitBtn.addEventListener('click', function() {
//     // const inputText = userInput.value;
//     let id = 1;
//     display.textContent = data;
// });

// fetch("data.json", {
//     method: "POST",
//     body: JSON.stringify({
//       id: 1,
//       title: "Fix my bugs"
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8"
//     }
//   });
  

// const raw = "";

// const requestOptions = {
//   method: "GET",
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:3000/api/courses", requestOptions)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => console.error(error));