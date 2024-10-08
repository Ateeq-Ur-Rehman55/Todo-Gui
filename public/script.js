// let new_data;
// let new_id;
let del_id;
let update_id;
let old_todo;
let is_edit = false;
let updating = false;
if (window.location.reload)
{
    userInput.value = ""
}
fetch('http://localhost:3000/api/courses')                   //fetching data
    .then((res) => res.json())
    .then((data) => {
        // body select to display data there
        const body = document.querySelector('p')
        for (let i = 0; i < data.length; i++) {

            //  adding todo data in p tag
            let div = document.createElement('div')
            div.id = "container";
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
                if (updating == true) {
                    alert("Already updating a todo, submit it first and try agian...")
                } else {
                    updating = true;
                    is_edit = true;
                    update_id = e.originalTarget.id;
                    for (let j = 0; j < data.length; j++) {
                        if (update_id == data[j]['id']) {
                            old_todo = data[j]['name']
                            console.log(`you are updating ${data[j]["name"]}`)
                        }
                    }
                    // send new value to the input field
                    let updateInput = document.getElementById('userInput')
                    updateInput.value = old_todo;
                    // remove div
                    let removeElmnt = document.getElementById('container')
                    removeElmnt.remove()
                }
            })
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
                userInput.value = ""
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
                userInput.value = ""
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

        // taking input and storing it in data.json file.
        var input = document.getElementById("userInput");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("submitBtn").click();
            }
        });
        submitBtn.addEventListener('click', async () => {
            if (userInput.value == "") {
                alert("Write something and try again...")
            } else if (is_edit == true) {
                updating = false;
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                // let inputId = document.getElementById(data[i]['id'])
                // console.log(`value of new id ${data[i]['name']}`.value)
                const raw = JSON.stringify({
                    "name": userInput.value
                });
                const requestOptions = {
                    method: "PUT",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };
                fetch(`http://localhost:3000/api/courses/${update_id}`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
                userInput.value = ""
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else if (is_edit == false) {
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
            }
        })
    }).catch((err) => {
        alert(err)
    })