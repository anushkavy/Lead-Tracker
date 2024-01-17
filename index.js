let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveInputEl = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

saveInputEl.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

// const tabs = [{ url: "https://www.linkedin.com/in/per-harald-borgen/" }];

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    // myLeads.push(window.location.href);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
// });

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // listItems +=
    //   "<li> <a href = '" +
    //   myLeads[i] +
    //   "' target=_blank>" +
    //   myLeads[i] +
    //   "</a> </li>";

    listItems += `<li> 
        <a href = '${leads[i]}' target=_blank>
          ${leads[i]} 
        </a> 
      </li>`;

    // create element
    // set text content
    // append to ul
    //     const li = document.createElement("li")
    //     li.textContent = myLeads[i]
    //     ulEl.append(li)
  }
  ulEl.innerHTML = listItems;
}
