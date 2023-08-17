const form = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemLists = document.querySelector('ul')

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
  itemInput.value = ''
}
//creating button
function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  button.textContent = 'x'
  return button
}

form.addEventListener('submit', addItem)
