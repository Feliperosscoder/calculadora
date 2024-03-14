
type ButtonType = {
  text: string 
  tipo: string,
  handleClick: (text: string) => void
}

export function Button({text, tipo, handleClick }: ButtonType) {
  return (
    <button className={tipo} onClick={() => handleClick(text)}>{text}</button>
  )
}