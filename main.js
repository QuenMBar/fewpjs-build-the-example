// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!
const errorPopUp = document.getElementById("modal");
const likeElements = document.getElementsByClassName("like");
errorPopUp.className = "hidden";

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < likeElements.length; i++) {
        likeElements[i].addEventListener("click", (e) => {
            mimicServerCall()
                .then(
                    (resolve) => {
                        console.log(resolve);
                        if (e.target.childNodes[1].innerHTML != FULL_HEART) {
                            e.target.childNodes[1].innerHTML = FULL_HEART;
                            e.target.childNodes[1].className = "activated-heart";
                        } else {
                            e.target.childNodes[1].innerHTML = EMPTY_HEART;
                            e.target.childNodes[1].className = "";
                        }
                    },
                    (reject) => {
                        console.log(reject);
                        rejectedCallback(reject);
                    }
                )
                .catch((error) => {
                    console.log(error);
                    rejectedCallback(error);
                });
        });
    }
});

function rejectedCallback(message) {
    errorPopUp.className = "";
    document.getElementById("modal-message").innerHTML = message;
    setTimeout(() => {
        errorPopUp.className = "hidden";
    }, 5000);
}

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let isRandomFailure = Math.random() < 0.2;
            if (isRandomFailure) {
                reject("Random server error. Try again.");
            } else {
                resolve("Pretend remote server notified of action!");
            }
        }, 300);
    });
}
