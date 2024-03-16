
type ButtonType = {
  text: string 
  tipo: string,
  handleClick: (text: string) => void
  isActive: boolean
}

export function Button({text, tipo, handleClick, isActive }: ButtonType) {
  return (
    <button className={isActive ? `active ${tipo}` : `${tipo}`} onClick={() => handleClick(text)}>{text}</button>
  )
}