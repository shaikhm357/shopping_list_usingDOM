const form = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemLists = document.querySelector('ul')
const itemClear = document.getElementById('clr')
const filterItem = document.getElementById('filter')
const formBtn = form.querySelector('button')

let isEditMode = false

function displayItems() {
  const itemFromStorage = getItemsFromStorage()
  itemFromStorage.forEach((item) => {
    addItemToDom(item)
  })
  checkUi()
}

function onAddItemSubmit(e) {
  e.preventDefault()
  const item = itemInput.value
  if (!item) {
    alert('plz add something first')
    return
  }

  if (isEditMode) {
    const itemToEdit = itemLists.querySelector('.text-secondary')
    itemToEdit.classList.remove('text-secondary')
    itemToEdit.remove()
    removeItemFromLocalStorage(itemToEdit.firstChild.textContent)
    isEditMode = false
  } else {
    if (checkIfItemExist(item)) {
      alert('Item Already Exists')
      checkUi()
      return
    }
  }
  //create item dom
  addItemToDom(item)
  //add item to localstorage
  addItemToStorage(item)
  checkUi()
  itemInput.value = ''
}

function addItemToDom(item) {
  //create li
  const li = document.createElement('li')
  li.className = 'list-group-item bg-light remove-item float-end border'
  li.appendChild(document.createTextNode(item))
  //create button
  const button = createButton('border-0 text-danger float-end')
  li.appendChild(button)
  itemLists.appendChild(li)
}

function getItemsFromStorage() {
  let itemFromStorage
  if (localStorage.getItem('items') === null) {
    itemFromStorage = []
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  return itemFromStorage
}

function addItemToStorage(item) {
  let itemFromStorage = getItemsFromStorage()

  //add new item to array
  itemFromStorage.push(item)
  localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

//creating button
function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  button.textContent = 'x'
  return button
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}

function checkIfItemExist(item) {
  const itemsFromStrorage = getItemsFromStorage()
  return itemsFromStrorage.includes(item)
}

function setItemToEdit(item) {
  isEditMode = true

  itemLists.querySelectorAll('li').forEach((i) => i.classList.remove('text-secondary'))

  item.classList.add('text-secondary')
  formBtn.textContent = '✏️ Update item'
  formBtn.className = 'btn btn-success btn-sm'

  itemInput.value = item.firstChild.textContent
}

function removeItem(item) {
  console.log(item.firstChild.textContent)
  if (confirm('Are you sure')) {
    //remove item form DOM
    item.remove()

    //remove irem form LocalStorage
    removeItemFromLocalStorage(item.firstChild.textContent)

    checkUi()
  }
}

function removeItemFromLocalStorage(item) {
  let itemFromStorage = getItemsFromStorage()
  itemFromStorage = itemFromStorage.filter((storedItem) => storedItem != item)
  //set item in local storage
  localStorage.setItem('items', JSON.stringify(itemFromStorage))
}

function clearAll(e) {
  // const allItems = document.querySelectorAll('li')
  // allItems.forEach((item) => {
  //   item.remove()
  // })

  while (itemLists.firstChild) {
    itemLists.firstChild.remove()
  }

  //clear from localstorage
  localStorage.removeItem('items')

  checkUi()
  // console.log(itemLists)
}

function checkUi() {
  itemInput.value = ''
  const items = itemLists.querySelectorAll('li')
  if (items.length === 0) {
    const div = document.getElementById('clr-div')
    div.className = 'd-none'
    filterItem.className = 'd-none'
  } else {
    const div = document.getElementById('clr-div')
    div.className = 'd-grid mt-5'
    filterItem.className = 'my-3'
  }

  formBtn.classList.add('btn-dark')
  formBtn.textContent = '+ Add Item'

  isEditMode = false
}

function filter(e) {
  const items = itemLists.querySelectorAll('li')
  const alphabet = e.target.value.toLowerCase()
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()
    if (itemName.indexOf(alphabet) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
  // console.log(e.target.value)
}

function init() {
  form.addEventListener('submit', onAddItemSubmit)
  itemLists.addEventListener('click', onClickItem)
  itemClear.addEventListener('click', clearAll)
  filterItem.addEventListener('input', filter)
  document.addEventListener('DOMContentLoaded', displayItems)
  checkUi()
}

init()
