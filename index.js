let bookmark = [];
const nameEl = document.getElementById("name-el");
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("bookmark"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  bookmark = leadsFromLocalStorage;
  render(bookmark);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    bookmark.push({ name: tabs[0].title, link: tabs[0].url });
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    render(bookmark);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>${leads[i].name}
                <a target='_blank' href='${leads[i].link}'>
                    ${leads[i].link}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  bookmark = [];
  render(bookmark);
});

inputBtn.addEventListener("click", function () {
  if (nameEl.value === "" && inputEl.value !== "") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      nameEl.value = tabs[0].title;
    });
  } else {
    bookmark.push({ name: nameEl.value, link: inputEl.value });
    nameEl.value = "";
    inputEl.value = "";
    localStorage.setItem("bookmark", JSON.stringify(bookmark));
    render(bookmark);
  }
});
