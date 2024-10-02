// let new_data;
// let new_id;
let del_id;
let update_id;
let old_todo;
fetch('http://localhost:3000/api/courses')                   //fetching data
    .then(res => res.json())
    .then(data => {
        // body select to display data there
        const body = document.querySelector('p')
        for (let i = 0; i < data.length; i++) {

            //  adding todo data in p tag
            let div = document.createElement('div')
            div.className = "list-group-item text-capitalize d-flex justify-content-between my-2"
            let p = document.createElement('p')
            p.className = "text"
            p = (`${data[i]['name']}`)
            p.id = data[i]['id'];
            // break tag
            let br = document.createElement('br')
            // adding delete button with every todo
            let del_btn = document.createElement('button')
            del_btn.id = `${data[i]['id']}`;
            del_btn.className = "del"
            del_btn.textContent = "Delete"

            let update_btn = document.createElement('button')
            update_btn.className = "update"
            update_btn.textContent = "Update";
            update_btn.id = `${data[i]['id']}`
            // updating value
            update_btn.addEventListener('click', async (e) => {
                // const usupdate = document.getElementById(update_input.id).value
                update_id = e.originalTarget.id;
                for (let j = 0; j < data.length; j++) {
                    if (update_id == data[j]['id']) {
                        old_todo = data[j]['name']
                        console.log(`you are updating ${data[j]["name"]}`)
                    }
                }
                // remove the old value
                const requestOptions = {
                    method: "DELETE",
                    redirect: "follow"
                };

                fetch(`http://localhost:3000/api/courses/${update_id}`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
                setTimeout(() => {
                    window.location.reload();
                }, 100);

                // send new value to the input field
                let updateInput = document.getElementById('userInput')
                updateInput.value = old_todo;
                // console.log(usupdate + "  value dot")
                // console.log(`update id = ${update_id}`)
                // // api call 
                // const myHeaders = new Headers();
                // myHeaders.append("Content-Type", "application/json");
                // // let inputId = document.getElementById(data[i]['id'])
                // // console.log(`value of new id ${data[i]['name']}`.value)
                // const raw = JSON.stringify({
                //     "name": usupdate
                // });

                // const requestOptions = {
                //     method: "PUT",
                //     headers: myHeaders,
                //     body: raw,
                //     redirect: "follow"
                // };

                // fetch(`http://localhost:3000/api/courses/${update_id}`, requestOptions)
                //     .then((response) => response.text())
                //     .then((result) => console.log(result))
                //     .catch((error) => console.error(error));
                // setTimeout(() => {
                //     window.location.reload();
                // }, 100);
            })
            // del.addEventListener("click", deleteBtnClicked(data[i]["id"]));
            // if any delete button click it check the id and delete it 
            clearAll.addEventListener('click', async (e) => {
                for (let k = 0; k < data.length; k++) {
                    let id = data[k]['id']
                    const requestOptions = {
                        method: "DELETE",
                        redirect: "follow"
                    };
                    fetch(`http://localhost:3000/api/courses/${id}`, requestOptions)
                        .then((response) => response.text())
                        .then((result) => console.log(result))
                        .catch((error) => console.error(error));
                }
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            })
            del_btn.addEventListener("click", async (e) => {
                del_id = e.originalTarget.id;
                console.log(`del id ${del_id}`);
                const requestOptions = {
                    method: "DELETE",
                    redirect: "follow"
                };

                fetch(`http://localhost:3000/api/courses/${del_id}`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            })
            div.append(del_btn)
            div.append(p)
            div.append(update_btn)
            body.append(div)
            // body.append(br)
        }
        // del.addEventListener('click', function () {
        // const requestOptions = {
        //     method: "DELETE",
        //     redirect: "follow"
        // };

        // fetch(`http://localhost:3000/api/courses/12`, requestOptions)
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.error(error));
        // })

        // taking input and storing it in data.json file.
        var input = document.getElementById("userInput");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("submitBtn").click();
            }
        });
        submitBtn.addEventListener('click', function () {
            let div = document.createElement('div')
            let id;
            if (data.length < 1) {
                id = 1;
            }
            else {
                id = data[data.length - 1]['id'] + 1;
            }
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "id": id,
                "name": userInput.value
            });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            fetch("http://localhost:3000/api/courses", requestOptions)
                .then((response) => response.text())
                .then((data) => {
                    let div = document.createElement('div')
                    div = (`id: ${data[i]['id']},  Todo: ${data[i]['name']}`)
                    div.id = data[i]['id'];
                    let br = document.createElement('br')
                    body.append(div)
                    body.append(br)
                })
                .catch((error) => console.error(error));

            div.id = id;
            div = (`Refresh to see id: Todo: ${userInput.value}`)
            let br = document.createElement('br')
            body.append(div)
            body.append(br)
            userInput.value = ""
            setTimeout(() => {
                window.location.reload();
            }, 50);
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
//                                                      ======  post request  =====

// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// const raw = JSON.stringify({
//     "id": new_id,
//     "name": new_data
// });

// const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow"
// };

// fetch("http://localhost:3000/api/courses", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

