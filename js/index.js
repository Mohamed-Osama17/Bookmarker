
//&=====>DOM<=====
//&=====>DOM-How-To-Select-Elements<=====
//&=====>DOM-Add-Events<=====
//&=====>DOM-class-List-Style<=====
//&=====>DOM-Event-Info<=====
//&=====>DOM-event-Bubbling-Capturing<=====
//&=====>DOM-This-vs-Target<=====
//&=====>DOM-Traversing<=====


//&=====>Book-Mark<=====





// var alert = document.createElement('div');
// var alertNode = document.createTextNode
// (`Site Name or Url is not valid, Site name must contain at least 3 characters Site URL must be a valid one`);
// alert.classList.add('alert', 'alert-danger');
// alert.appendChild(alertNode);
// siteNameInput.append(alert);
// console.log(siteNameInput);




var siteNameInput = document.querySelector('#siteName'); //input kolo
var siteUrlInput = document.querySelector('#siteUrl'); // input kolo
var submitBtn = document.getElementById('submitBtn');
var tableContent = document.getElementById('tableContent');
var deletBtn = document.querySelector('.btn-delete');
var alertBoxcontainer = document.querySelector('.alertBox-container');
var closeBtn = document.getElementById('closeBtn');

submitBtn.addEventListener('click', function (eventInfo) {

    // console.log(eventInfo);
    submit();
})


//&=====>Check If There A Bookmark Elements In LocalStorage or not ?<=====
var bookmarkArray;

if (localStorage.getItem('bookmarkArray') != null) {

    bookmarkArray = JSON.parse(localStorage.getItem('bookmarkArray'));
    displayBookmark();
} else {
    bookmarkArray = [];
}


//&=====>Creat Object, Push That Object Into The Array and Storage The Array in LocalStorage <=====
function submit() {

    if (siteNameInput.classList.contains('is-valid') &&
        siteUrlInput.classList.contains('is-valid')) {

        bookmark = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        }


        bookmarkArray.push(bookmark);
        localStorage.setItem('bookmarkArray', JSON.stringify(bookmarkArray));
        clearForm();
        displayBookmark();
        siteNameInput.classList.remove('is-valid');
        siteUrlInput.classList.remove('is-valid');


    } else {
        alertBoxcontainer.classList.remove('d-none')
    }
}

//&=====>Clear Input Function<=====

function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}


//&=====>Display Bookmark Name And Url With Value That User Enter<=====

function displayBookmark() {

    var container = '';

    for (var i = 0; i < bookmarkArray.length; i++) {

        container +=
            `   
             <tr>       
                <td>${i + 1}</td>
                <td>${bookmarkArray[i].siteName}</td>
                <td>
                    <button onclick='visitWebsite(${i})' class="btn btn-visit">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button onclick='deletion(${i})'  class="btn btn-delete pe-2" data-index="0">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button>
                </td>
            </tr>
        `
    }

    tableContent.innerHTML = container;
}

//&=====>Deletion Function<=====
function deletion(deletIndex) {

    bookmarkArray.splice(deletIndex, 1);
    localStorage.setItem('bookmarkArray', JSON.stringify(bookmarkArray));
    displayBookmark();
}

//&=====>Visit Function<=====


function visitWebsite(websiteIndex) {

    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarkArray[websiteIndex]).siteUrl) {
        open(bookmarkArray[websiteIndex].siteURL);
    }else {
        open(`https://${websiteIndex.siteURL}`);
    }

    console.log(websiteIndex);
    
}

//&=====>Making sure that user enter the correct data<=====

siteNameInput.addEventListener('input', function (eventInfo) {

    validate(siteNameInput);
})

siteUrlInput.addEventListener('input', function (eventInfo) {

    validate(siteUrlInput);
})


function validate(element) {

    var regex = {
        siteName: /^\w{3,10}(\s?\w{3,10})?$/,
        siteUrl: /^(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    }

    // console.log(siteNameInput.id);

    if (regex[element.id].test(element.value)) {

        // console.log(true);

        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    } else {
        // console.log(false);

        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
}


//&=====>Closing the Alert box by 3 Ways: (1- close button) (2- Esc key) (3-clicking outside alert box)<=====

function closeAlertBox() {
    alertBoxcontainer.classList.add('d-none')
}

closeBtn.addEventListener('click', function (eventInfo) {
    closeAlertBox();
})


document.addEventListener('keydown', function (eventInfo) {
    if (eventInfo.key == 'Escape') {
        closeAlertBox();
    }
})


document.body.addEventListener('click', function (eventInfo) {
    if (eventInfo.target.classList.contains('alertBox-container')) {
        closeAlertBox();
    }
})