
import './a.css'
const button = document.createElement('button')
button.innerHTML = "button"
document.body.appendChild(button)

button.addEventListener('click', function(){
  const div = document.createElement('div')
  document.body.appendChild(div)
})