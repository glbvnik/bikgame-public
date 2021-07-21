const RadioInput = ({ defaultChecked = false, handleChange, id, label, name, required = true, text }) => {
    return (
        <label htmlFor={ id }>
            <input defaultChecked={ defaultChecked } name={ name } onChange={ handleChange } required={ required } type='radio' id={ id } value={ id } />
            <span>{ label }</span>
            <p>{ text }</p>
        </label>
    )
}

export default RadioInput
