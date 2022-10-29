import chroma from "chroma-js"

const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', event => {
  event.preventDefault()
  if(event.code.toLowerCase() === 'space'){
    setRandomColors()
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type
  if(type === 'lock'){
    const node = event.target.tagName.toLowerCase() == 'i'
    ? event.target
    : event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if(type === 'copy'){
    copyClick(event.target.textContent)
  }
})


function generateRandomColor(): string {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for(let i = 0; i < 6; i++){
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color 
}

function copyClick(text: string) {
  return navigator.clipboard.writeText(text)
}


function setRandomColors(isInitial: boolean) {
  const colors: any[] = isInitial ? getColorsFronHash() : []
  columns.forEach((column, index) => {
    const isLocked = column.querySelector('i').classList.contains('fa-lock')
    const text = column.querySelector('h2');
    const button = column.querySelector('button');

    if(isLocked){
      colors.push(text.textContent)
      return
    }

    const color = isInitial
     ? colors[index] 
      ? colors[index]
      : generateRandomColor()
    : generateRandomColor()

    if(!isInitial){
    colors.push(color)
    }

    text.textContent = color;
    (column as HTMLElement).style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })
  updateColorsHash(colors)
}

function setTextColor(text: HTMLElement, color: string) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors: any[]){
  document.location.hash = colors.map(elem => elem.toString().substring(1)).join('-')
}

function getColorsFronHash(): any[] {
  if(document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map(color => '#' + color)
  }
  return []
}

// console.log(setTextColor())
setRandomColors(true)

