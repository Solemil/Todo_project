let input = document.querySelector("#input");
let ul = document.querySelector("#ul");
let button = document.querySelector("#button");
let errorText = document.querySelector("#error");

const addElement = (element) => {
  let isChecked;
  let textChecked;
  element.completed === 1
    ? ((isChecked = "checked disabled = true"), (textChecked = "textChecked"))
    : ((isChecked = ""), (textChecked = ""));
  let task = `<li class="flex">
										<p class="text ${textChecked}" id="text${element.id}">${element.text} </p>
											<div class="icons flex">
												<img src="./static/icons/trash_icon.svg" alt="trash icon" class="trash-icon" id="trash${element.id}">
												<input type="checkbox" name="check1" id="check${element.id}" ${isChecked}>
											</div>
										</li>`;
  ul.innerHTML += task;
};

const addTrashListener = (trashIcon) => {
  let trashButton = document.querySelector(`#trash${trashIcon.id}`);
  trashButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/todos/${trashIcon.id}`, {
      headers: { "Content-type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({}),
    }).then(loadData);
  });
};

const addCheckedListener = (checkIcon) => {
  let completedButton = document.querySelector(`#check${checkIcon.id}`);
  completedButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/todos/${checkIcon.id}`, {
      headers: { "Content-type": "application/json" },
      method: "PUT",
      body: JSON.stringify({ text: checkIcon.text, completed: true }),
    }).then(loadData);
  });
};

let loadData = () => {
  ul.innerHTML = "";
  errorText.innerHTML = "";

  fetch("http://localhost:3000/todos")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        addElement(element);
        // addTrashListener(element);
        // addCheckedListener(element);
      });

      data.forEach((element) => {
        addTrashListener(element);
      });

      data.forEach((element) => {
        addCheckedListener(element);
      });
    });
};

button.addEventListener("click", () => {
  let text = input.value;
  const postText = () => {
    fetch("http://localhost:3000/todos", {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body: JSON.stringify({ text: text }),
    })
      .then(loadData())
      .then((input.value = ""));
  };
  if (text.length < 3) {
    errorText.innerHTML = "Too short";
  } else if (text.length > 20) {
    errorText.innerHTML = "Too long";
  } else {
    postText();
  }
});

loadData();
