var contactModal = document.getElementById("contactModal");
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmergencyContacts = document.getElementById("totalEmergencyContacts");
var totalContactsSpan = document.getElementById("totalContactsSpan");
var addContactBtn = document.getElementById("addContactBtn");
var searchInput = document.getElementById("searchInput");
var callBtn = document.getElementById("callBtn");
var emailBtn = document.getElementById("emailBtn");
var favBtn = document.getElementById("favBtn");
var emergencyBtn = document.getElementById("emergencyBtn");
var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");
var emptyStateFav = document.getElementById("emptyStateFav");
var emptyStateEmergency = document.getElementById("emptyStateEmergency");
var smallEmergncyItem = document.getElementById("smallEmergncyItem");
var bigEmergencyItem = document.getElementById("bigEmergencyItem");
var smallFavItem = document.getElementById("smallFavItem");
var bigFavItem = document.getElementById("bigFavItem");
var submitModalBtn = document.getElementById("submitModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");
var cancelModalBtn = document.getElementById("cancelModalBtn");
var currentSearch = "";
//user data
var contactForm = document.getElementById("contactForm");
var avatarPreview = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var avatarPath = document.getElementById("avatarPath");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactCardContainer = document.getElementById("contactCardContainer");

//validation
var nameError = document.getElementById("contactNameError");
var phoneError = document.getElementById("contactPhoneError");
var emailError = document.getElementById("contactEmailError");

var contactList;
var currentIndex = null;
var currentSearch = "";

closeModalBtn.addEventListener("click", function () {
  contactModal.classList.remove("d-flex");
  contactModal.classList.add("d-none");
  clearInputs();
});
addContactBtn.addEventListener("click", function () {
  contactModal.classList.remove("d-none");
  contactModal.classList.add("d-flex");
});

cancelModalBtn.addEventListener("click", function () {
  contactModal.classList.remove("d-flex");
  contactModal.classList.add("d-none");
  clearInputs();
});

var localStorageArray = localStorage.getItem("contacts");
if (localStorageArray) {
  contactList = JSON.parse(localStorageArray);
  displayContact();
} else {
  contactList = [];
}

function addContact() {
  // console.log(contactName.value);
  // console.log(contactPhone.value);

  var contact = {
    userName: contactName.value,
    userPhone: contactPhone.value,
    userEmail: contactEmail.value,
    userAddress: contactAddress.value,
    groupcolor: getGroupColor(contactGroup.value),
    userGroup: contactGroup.value,
    userNotes: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,
    userImage: avatarPath ? "imgs/" + avatarPath.value : "",
  };

  // console.log(contact);

  contactList.push(contact);

  displayContact();
  clearInputs();
  localStorage.setItem("contacts", JSON.stringify(contactList));
}

// add => display for contact,
// speration of concrens

function displayContact() {
  var cartona = "";
  // flag
  var found = false;
  if (contactList.length <= 0) {
    cartona = `
    <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>
    `;
  } else {
    for (var i = 0; i < contactList.length; i++) {
      var colors = getGroupColor(contactList[i].userGroup);
      if (!isMatch(contactList[i])) continue;
      // true
      found = true;
      cartona += `
       <div class="col-md-6 col-lg-12 col-xl-6 mb-4">
                            <div class="contact-card">

                                <div class="contact-card-header">
                                    <div class="d-flex align-items-start justify-content-start gap-3">
                                        <div class="position-relative flex-shrink-0  ">
                                        
                                            ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                             ${
                                               contactList[i].userEmergency
                                                 ? `  <div
                                                class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-heart-pulse"></i>
                                            </div>
                                                `
                                                 : ""
                                             }
                                            ${
                                              contactList[i].userFav
                                                ? ` <div
                                                class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle">
                                                <i class="fas fa-star"></i>
                                            </div>`
                                                : ""
                                            }
                                           
                                        </div>
                                        <div class="flex-1 min-w-0 pt-1">
                                            <h3 class="contact-card-name truncate m-0 ">${highlightSearch(contactList[i].userName)}</h3>
                                            <div class="d-flex align-items-center gap-2 mt-1">
                                                <div class="contact-card-phone-container flex-shrink-0">
                                                    <i class="contact-card-phone-icon fas fa-phone"></i>
                                                </div>
                                                <span class="contact-card-phone truncate">${highlightSearch(contactList[i].userPhone)}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="contact-details">
                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center violet">
                                                <i class="contact-detail-icon violet fas fa-envelope"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${highlightSearch(contactList[i].userEmail)}</span>
                                        </div>

                                        <div class="contact-detail-item">
                                            <div
                                                class="contact-detail-icon-container d-flex align-items-center justify-content-center emerald">
                                                <i class="contact-detail-icon emerald fas fa-location-dot"></i>
                                            </div>
                                            <span class="contact-detail-text truncate">${contactList[i].userAddress}</span>
                                        </div>
                                    </div>


                                   ${
                                     contactList[i].userGroup
                                       ? `
                                      <div class="contact-tags">
                                    <span class="contact-tag d-inline-flex align-items-center" style="background-color: ${colors.bg}; color: ${colors.text}; border-color: ${colors.border};">${contactList[i].userGroup}</span>
                                </div>
                                   `
                                       : ""
                                   }
                                </div>


                                <div class="contact-card-actions">
                                    <div class="action-buttons-left">
                                        <a href="tel:${contactList[i].userPhone}" id="callBtn" class="action-button call" title="Call">
                                            <i class="fas fa-phone"></i>
                                        </a>

                                        <a href="mailto:${contactList[i].userEmail}" class="action-button email" id="emailBtn" title="Email">
                                            <i class="fas fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div class="action-buttons-right">
                                        <button class="action-button favorite" id="favBtn" onclick="toggleFavorite(${i})"  title="Favorite">
                                            <i class="${contactList[i].userFav ? "fas text-warning" : "far"} fa-star"></i>
                                        </button>
                                        <button class="action-button emergency" id="emergncyBtn" onclick="toggleEmergency(${i})" title="Emergency">
                                            <i class="${contactList[i].userEmergency ? "fas fa-heart-pulse text-danger" : "far fa-heart"}"></i>
                                        </button>
                                        <button class="action-button edit" id="editBtn" onclick="prepareDataForUpdate(${i})"  title="Edit">
                                            <i class="fas fa-pen"></i>
                                        </button>
                                        <button class="action-button delete" id="deleteBtn" onclick="deleteContact(${i})" title="Delete">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
    `;
    }
    if (currentSearch && !found) {
      cartona = `
    <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>
    `;
    }
  }
  contactCardContainer.innerHTML = cartona;
  updateContactCount();
  updateFavoriteSidebar();
  updateEmergencySidebar();
}

function clearInputs() {
  contactName.value = null;
  contactPhone.value = null;
  contactEmail.value = null;
  contactAddress.value = null;
  contactGroup.value = null;
  contactNotes.value = null;
  contactFavorite.checked = false;
  contactEmergency.checked = false;
  currentIndex = null;
  avatarPath.value = null;
  // avatarPreview.innerHTML = `
  //    <i class="fas fa-user"></i>

  // `;
  avatarPreview.innerHTML = renderAvatar();

  contactName.classList.remove("is-valid", "is-invalid");
  contactEmail.classList.remove('is-valid','is-invalid')
  contactPhone.classList.remove("is-valid", "is-invalid");
}

function deleteContact(index) {
  console.log(index);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-3 fs-6",
      cancelButton: "btn btn-secondary fs-6",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${contactList[index].userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        //1- delete from array , method splice
        contactList.splice(index, 1);

        // 2- delete from localstorage// update
        localStorage.setItem("contacts", JSON.stringify(contactList));

        // 3- display ui (update)
        displayContact();

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Contact has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
}

// update 1- data from card goes to form

// 2- data from form goes to card

function prepareDataForUpdate(UpdateIndex) {
  // console.log(index);
  currentIndex = UpdateIndex;
  var contactsUpdate = contactList[UpdateIndex];
  console.log(contactsUpdate);
  contactName.value = contactsUpdate.userName;
  contactPhone.value = contactsUpdate.userPhone;
  contactEmail.value = contactsUpdate.userEmail;
  contactAddress.value = contactsUpdate.userAddress;
  contactGroup.value = contactsUpdate.userGroup;
  contactNotes.value = contactsUpdate.userNotes;
  contactFavorite.checked = contactsUpdate.userFav;
  contactEmergency.checked = contactsUpdate.userEmergency;
  contactModal.classList.add("d-flex");
  contactModal.classList.remove("d-none");
  avatarPath.value = contactsUpdate.userImage || "";
  if (contactsUpdate.userImage) {
    avatarPreview.innerHTML = `
        <img src="${contactsUpdate.userImage}" alt="Avatar preview" class="w-100 h-100 rounded-circle object-fit-cover">

    `;
  } else if (contactsUpdate.userName) {
    var initials = contactsUpdate.userName
      .trim() //remove wite space at first and last of line
      .split(" ") //["ahmed", "mohammed"]
      .map((w) => w[0].toUpperCase()) //["Ahmed", "Mohammed"]
      .slice(0, 2) //['A','M']
      .join("");
    avatarPreview.innerHTML = initials;
  } else {
    avatarPreview.innerHTML = renderAvatar();
  }
}

function sendUpdateData() {
  contactList[currentIndex] = {
    userName: contactName.value,
    userPhone: contactPhone.value,
    userEmail: contactEmail.value,
    userAddress: contactAddress.value,
    userGroup: contactGroup.value,
    userNotes: contactNotes.value,
    userFav: contactFavorite.checked,
    userEmergency: contactEmergency.checked,

    userImage: avatarPath.value
      ? avatarPath.value.startsWith("imgs/")
        ? avatarPath.value
        : "imgs/" + avatarPath.value
      : "",
  };

  localStorage.setItem("contacts", JSON.stringify(contactList));

  displayContact();

  clearInputs();
}

submitModalBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!validateContactInputsWhenSubmit()) return;
  if (currentIndex == null) {
    contactModal.classList.remove("d-flex");
    contactModal.classList.add("d-none");
    // console.log(contactList);
    Swal.fire({
      title: "Added !",
      timer: 2000,
      timerProgressBar: true,
      text: "Contact has been added successfully !",
      icon: "success",
      showConfirmButton: false,
    });
    addContact();
  } else {
    sendUpdateData();
    contactModal.classList.add("d-none");
    contactModal.classList.remove("d-flex");
    Swal.fire({
      title: "Updated !",
      timer: 2000,
      timerProgressBar: true,
      text: "Contact has been updated successfully !",
      icon: "success",
      showConfirmButton: false,
    });
  }
});

// xxxxxxxxxxxxxxxxxx ====   index  ===== xxxxxxxxxxxxxxxxxxxxxxxx
//

// add, cleAar => index b null
//update , delete=> with index

function updateContactCount() {
  totalContacts.innerHTML = contactList.length;
  totalContactsSpan.innerHTML = contactList.length;
}

// favourite

function updateFavoriteSidebar() {
  bigFavItem.innerHTML = "";
  var favCount = 0;
  var hadFavourite = false; //flag
  for (var i = 0; i < contactList.length; i++) {
    // var contact = contactList[i];
    // console.log(contactList[i]);
    if (contactList[i].userFav) {
      favCount++;
      hadFavourite = true;
      var cartona2 = `
           <div class="col-6 ">
                                    <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-3 rounded-3">
                                        <div class="flex-shrink-0">
                                            ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contactList[i].userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contactList[i].userPhone}</p>
                                        </div>
                                        <a href="tel:${contactList[i].userPhone}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>
      `;
      bigFavItem.innerHTML += cartona2;
    }
  }
  totalFavContacts.innerHTML = favCount;
  if (hadFavourite == false) {
    bigFavItem.innerHTML = `
     <div class="col-12">
                                    <div id="emptyStateFav" class="empty-state">
                                        <p class="text-muted mb-0">No favorites yet</p>
                                    </div>
                                </div>`;
  }
}
function updateEmergencySidebar() {
  bigEmergencyItem.innerHTML = "";
  var EmergencyCount = 0;
  var hasEmergency = false;
  for (var i = 0; i < contactList.length; i++) {
    var contact = contactList[i];
    // console.log(contact);
    if (contact.userEmergency) {
      EmergencyCount++;
      hasEmergency = true;
      var contactHtml = `
      
                                <div class="col-6">
                                    <div id="smallEmergncyItem"
                                        class="contact-item  d-flex align-items-center gap-3 p-3 rounded-3">
                                        <div class="flex-shrink-0">
                                          ${renderAvatar(contact.userName, contact.userImage)}
                                        </div>
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${contact.userName}</h4>
                                            <p class="mb-0 text-muted small text-truncate">${contact.userName}</p>
                                        </div>
                                        <a href="tel:${contact.userName}"
                                            class="call-btn1 call-btn-rose1 d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>
      `;
      bigEmergencyItem.innerHTML += contactHtml;
    }
  }
  totalEmergencyContacts.innerHTML = EmergencyCount;
  if (!hasEmergency) {
    bigEmergencyItem.innerHTML = `
     <div class="col-12">
                                    <div id="emptyStateFav" class="empty-state">
                                        <p class="text-muted mb-0">No Emergency yet</p>
                                    </div>
                                </div>`;
  }
}

function toggleFavorite(index) {
  // console.log(index);
  // toggle
  contactList[index].userFav = !contactList[index].userFav;
  localStorage.setItem("contacts", JSON.stringify(contactList));
  displayContact();
  updateFavoriteSidebar();
}

function toggleEmergency(index) {
  // console.log(index);
  // toggle
  contactList[index].userEmergency = !contactList[index].userEmergency;
  localStorage.setItem("contacts", JSON.stringify(contactList));
  displayContact();
  updateEmergencySidebar();
}

// marker
function highlightSearch(text) {
  if (!currentSearch || !text) return text;
  var index = text.toLowerCase().indexOf(currentSearch.toLowerCase());
  console.log(index);
  if (index === -1) return text;
  // ahmed, ah
  //ahmed mohamed
  var before = text.slice(0, index); //string empty
  //                0, 0+2
  var match = text.slice(index, index + currentSearch.length);
  //                0, 2
  //                med
  var after = text.slice(index, currentSearch.length);
  return before + '<span class="search-highlight">' + match + "</span>" + after;
}
// functionality search

searchInput.addEventListener("input", function () {
  // console.log(searchInput.value);
  currentSearch = searchInput.value.trim().toLowerCase();
  // console.log(currentSearch);
  displayContact();
});

function isMatch(contact) {
  if (!currentSearch) return true;
  return (
    contact.userName.toLowerCase().includes(currentSearch) ||
    (contact.userPhone && contact.userPhone.includes(currentSearch)) ||
    (contact.userEmail &&
      contact.userEmail.toLowerCase().includes(currentSearch))
  );
}

function getGroupColor(group) {
  var colorGroup = {
    family: { bg: "#cfe8ff", text: "#1e40af", border: "#93c5fd" },
    friends: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    work: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    school: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    other: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  };
  return colorGroup[group] || colorGroup["other"];
}

// img static, dynmic
// file reader 64 bit, creatObjectUrl address temporary xx65djdjgnkjfnks
// 500mb => indexedDB, store in partition localStorage 5mb,
// open , connect ,

avatarInput.addEventListener("change", function () {
  var file = avatarInput.files[0];
  console.log(file);
  avatarPath.value = file.name;
  avatarPreview.innerHTML = `
    <img src="imgs/${file.name}" alt="Avatar preview" class="w-100 h-100 rounded-circle object-fit-cover">

  `;
});

function getAvatarColors() {
  return [
    { from: "#3b82f6", to: "#2563eb" }, // blue
    { from: "#8b5cf6", to: "#6d28d9" }, // violet
    { from: "#10b981", to: "#0d9488" }, // emerald
    { from: "#f43f5e", to: "#db2777" }, // rose
    { from: "#f59e0b", to: "#ea580c" }, // amber
    { from: "#06b6d4", to: "#2563eb" }, // cyan
    { from: "#6366f1", to: "#8b5cf6" }, // indigo
    { from: "#d946ef", to: "#ec4899" }, // fuchsia
  ];
}
// ahmed mohammed 14 % 8 => 5
function getColorByName(name) {
  var colorsAvatar = getAvatarColors();
  var index = name.length % colorsAvatar.length;
  return colorsAvatar[index];
}

//dynmaic => img or no img or default

function renderAvatar(name = "", imagePath = "") {
  // image
  if (imagePath && imagePath !== "imgs/" && imagePath !== "") {
    return `
        <img src="${imagePath}" alt="avatar"
                                                class="contact-card-avatar  object-fit-cover">
    `;
  }
  //ahmed mohammed
  if (name && name.trim() !== "") {
    var initials = name
      .trim() //remove wite space at first and last of line
      .split(" ") //["ahmed", "mohammed"]
      .map((w) => w[0].toUpperCase()) //["Ahmed", "Mohammed"]
      .slice(0, 2) //['A','M']
      .join(""); //"AM"

    var colorAvatar = getColorByName(name);

    return `
        <div class="contact-card-avatar d-flex align-items-center justify-content-center text-white fw-bold" style="background: linear-gradient(135deg,${colorAvatar.from},${colorAvatar.to});">
          ${initials}
                        </div>
      `;
  }

  return `
      <div class="contact-card-avatar d-flex align-items-center justify-content-center" >
                                          <i class="fas fa-user"></i>

                        </div>
  `;
}

// validation
// regex, word that i will write it
// test
function showInvalid(input, errorDiv) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  errorDiv.classList.remove("d-none");
}
function clearInvalid(input, errorDiv) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  errorDiv.classList.add("d-none");
}
// contactName.addEventListener("input", function () {
//   var value = contactName.value.trim();
//   var error = document.getElementById("contactNameError");
//   // console.log(value);
//   var regex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
//   if (!value || !regex.test(value)) {
//     showInvalid(contactName, error);
//   } else {
//     clearInvalid(contactName, error);
//   }
// });
// contactPhone.addEventListener("input", function () {
//   var value = contactPhone.value.trim();
//   var error = document.getElementById("contactPhoneError");
//   // console.log(value);
//   var regex = /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/;
//   if (!value || !regex.test(value)) {
//     showInvalid(contactPhone, error);
//   } else {
//     clearInvalid(contactPhone, error);
//   }
// });
// contactEmail.addEventListener("input", function () {
//   var value = contactEmail.value.trim();
//   var error = document.getElementById("contactEmailError");
//   // console.log(value);
//   var regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
//   if (!value || !regex.test(value)) {
//     showInvalid(contactEmail, error);
//   } else if (value) {
//     clearInvalid(contactEmail, error);
//   } else {
//     contactEmail.classList.remove("is-valid", "is-invalid");
//     error.classList.add("d-none");
//   }
// });

// function validateContactInputsWhenSubmit() {
//   var email = contactEmail.value.trim();
//   var phone = contactPhone.value.trim();
//   var name = contactName.value.trim();

//   var nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
//   var phoneRegex = /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/;
//   var emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

//   // reset
//   clearInvalid(contactName, nameError);
//   clearInvalid(contactEmail, emailError);
//   clearInvalid(contactPhone, phoneError);
//   // xx Name empty
//   if (!name) {
//     showInvalid(contactName, nameError);
//     Swal.fire({
//       title: "Missing Name !",
//       text: "please enter a name",
//       icon: "error",
//       customClass: { container: "swal-container" },
//     });
//     contactName.focus();
//     return false;
//   }

//   //name invalid
//   if (!nameRegex.test(name)) {
//     showInvalid(contactName, nameError);
//     Swal.fire({
//       title: "Invalid Name !",
//       text: "please enter a valid name between 2 - 50 character",
//       icon: "error",
//       customClass: { container: "swal-container" },
//     });
//     contactName.focus();
//     return false;
//   }
//   // xx phone empty
//   if (!phone) {
//     showInvalid(contactPhone, phoneError);
//     Swal.fire({
//       title: "Missing Phone !",
//       text: "please enter a phone number",
//       icon: "error",
//       customClass: { container: "swal-container" },
//     });
//     contactPhone.focus();
//     return false;
//   }
//   //phone invalid
//   if (!phoneRegex.test(phone)) {
//     showInvalid(contactPhone, phoneError);
//     Swal.fire({
//       title: "Invalid phone !",
//       text: "please enter a valid phone number",
//       icon: "error",
//       customClass: { container: "swal-container" },
//     });
//     contactPhone.focus();
//     return false;
//   }
//   // email invalid
//     if (email && !emailRegex.test(email)) {
//       showInvalid(contactEmail, emailError);
//       Swal.fire({
//         title: "Invalid Email !",
//         text: "please enter a valid email address",
//         icon: "error",
//         customClass: { container: "swal-container" },
//       });
//       contactEmail.focus();
//       return false;
//     }
//   return true;
// }

var validationRules = {
  name: {
    regex: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    errorId: "contactNameError",
    message: "Name should contain only letters (2–50 characters)",
  },
  phone: {
    regex: /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/,
    errorId: "contactPhoneError",
    message: "Please enter a valid Egyptian phone number",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    errorId: "contactEmailError",
    message: "Please enter a valid email address",
    optional: true,
  },
};
//generic

function showInvalid(input, errorId) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  document.getElementById(errorId).classList.remove("d-none");
}
function clearInvalid(input, errorId) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  document.getElementById(errorId).classList.add("d-none");
}

function validateFields(input, rule) {
  var value = input.value.trim();
  var errorEl = document.getElementById(rule.errorId);

  console.log(rule);
  console.log(rule.errorId);
  console.log(errorEl);
  if (!value && rule.optional) {
    input.classList.remove("is-valid", "is-invalid");
    errorEl.classList.add("d-none");
    return true;
  }
  if (!value || !rule.regex.test(value)) {
    showInvalid(input, rule.errorId);
    return false;
  }
  clearInvalid(input, rule.errorId);
  return true;
}

contactName.addEventListener("input", function () {
  validateFields(contactName, validationRules.name);
});
contactEmail.addEventListener("input", function () {
  validateFields(contactEmail, validationRules.email);
});
contactPhone.addEventListener("input", function () {
  validateFields(contactPhone, validationRules.phone);
});
function validateContactInputsWhenSubmit() {
  var isNameValid = validateFields(contactName, validationRules.name);
  var isEmailValid = validateFields(contactEmail, validationRules.email);
  var isPhoneValid = validateFields(contactPhone, validationRules.phone);

  if (!isNameValid) {
    Swal.fire({
      title: "Missing Name !",
      text: validationRules.name.message,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactName.focus();
    return false;
  }

  // xx phone empty
  if (!isPhoneValid) {
    Swal.fire({
      title: "Missing Phone !",
      text: validationRules.phone.message,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactPhone.focus();
    return false;
  }

  // email invalid
  if (!isEmailValid) {
    Swal.fire({
      title: "Invalid Email !",
      text: validationRules.email.message,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactEmail.focus();
    return false;
  }
  if (isPhoneDuplicate(contactPhone.value, currentIndex)) {
    showInvalid(contactPhone, "contactPhoneError");
    Swal.fire({
      title: "Duplicat Phone !",
      text: `this phone is already exists`,
      icon: "error",
      customClass: { container: "swal-container" },
    });
    contactPhone.focus();
    return false;
  }
  return true;
}

// normalize phone
//00201
//+2

function normalizePhoneNumberEgyptian(phone) {
  if (!phone || typeof phone !== "string") {
    return ";";
  }

  phone = phone.replace(/D/g, "");
  // 20
  if (phone.startsWith("20")) {
    phone = "0" + phone.slice(2);
  }
  //0020
  if (phone.startsWith("0020")) {
    phone = "0" + phone.slice(4);
  }
  return phone; //01
}
// 00201233455
function isPhoneDuplicate(phone, index) {
  var normalizeInput = normalizePhoneNumberEgyptian(phone); //form
  for (var i = 0; i < contactList.length; i++) {
    if (i === index) continue;
    var normlizedStored = normalizePhoneNumberEgyptian(
      contactList[i].userPhone,
    ); //phone from contact
    //012344567
    //012344567
    if (normalizeInput === normlizedStored) {
      return true;
    }
  }
  return false;
}
