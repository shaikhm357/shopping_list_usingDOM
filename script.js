const form = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemLists = document.querySelector('ul')
const itemClear = document.getElementById('clr')
const filterItem = document.getElementById('filter')

function addItem(e) {
  e.preventDefault()
  const item = itemInput.value
  if (!item) {
    alert('plx add something first')
    return
  }
  //create li
  const li = document.createElement('li')
  li.className = 'list-group-item bg-light'
  li.appendChild(document.createTextNode(item))
  //create button
  const button = createButton('border-0 text-danger float-end')
  li.appendChild(button)
  itemLists.appendChild(li)
  checkUi()
  itemInput.value = ''
}
//creating button
function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  button.textContent = 'x'
  return button
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.remove()
    }
  }
  checkUi()
}

function clearAll(e) {
  // const allItems = document.querySelectorAll('li')
  // allItems.forEach((item) => {
  //   item.remove()
  // })

  while (itemLists.firstChild) {
    itemLists.firstChild.remove()
  }
  checkUi()
  // console.log(itemLists)
}

function checkUi() {
  const items = itemLists.querySelectorAll('li')
  console.log(items)
  if (items.length === 0) {
    const div = document.getElementById('clr-div')
    console.log(div.classList)
    div.className = 'd-none'
    filterItem.className = 'd-none'
  } else {
    const div = document.getElementById('clr-div')
    div.className = 'd-grid mt-5'
    filterItem.className = 'none'
  }
  console.log(itemLists)
}

form.addEventListener('submit', addItem)
itemLists.addEventListener('click', removeItem)
itemClear.addEventListener('click', clearAll)
checkUi()
