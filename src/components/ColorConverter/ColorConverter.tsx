import './ColorConverter.css';
import { useState } from 'react';

interface IFormState {
  valid?: boolean;
  hexColor: string;
}

const reHexColor = new RegExp('^#[0-9a-f]{6}$', 'i');

export const ColorConverter = () => {
  const [ formState, setFormState ] = useState<IFormState>({ hexColor: '' });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) : void {
    const hexColor: string = event.target.value;
    const valid = reHexColor.test(hexColor);
    setFormState((state) => ({...state, hexColor, valid }));
  }

  const isError: boolean = formState.hexColor.length >= 7 && !formState.valid;
  let rgbColor;
  if (formState.valid) {
    const color = formState.hexColor.substring(1, );
    const red = parseInt(color.substring(0, 2), 16);
    const green = parseInt(color.substring(2, 4), 16);
    const blue = parseInt(color.substring(4, 6), 16);
    rgbColor = `rgb(${red}, ${green}, ${blue})`;
  }

  return (
    <form className={`form ${ isError ? 'error' : ''}`} 
      style={{ backgroundColor: rgbColor }} name='hex2rgb' noValidate>
      <input maxLength={7} onChange={handleInputChange} name='hex' className='form-color_input' value={formState.hexColor} />
      <button className='form-submit_button'>
        { `${ isError ? 'Ошибка!' : (rgbColor || '')}` }
      </button>
    </form>
  );
}
