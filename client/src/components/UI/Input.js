const Input = ({ disabled = false, handleChange, id, label, min, placeholder, required = false, type = 'text', value }) => {
    return (
        <div>
            <label htmlFor={ id }>{ label }:</label>
            <input disabled={ disabled } id={ id } min={ min } name={ id } onChange={ handleChange } placeholder={ placeholder ? placeholder : id } required={ required } type={ type } value={ value } />

            <style jsx>{ `
              div {
                align-items: center;
                background-color: #f9f9f9;
                border: solid 2px #f3f3f3;
                border-radius: 5px;
                color: grey;
                display: flex;
                padding-left: 12px;
              }
              
              div:focus-within {
                background-color: white;
                border-color: #fcecc6;
              }
              
              div:hover { opacity: 0.7 }
              
              input {
                background-color: #f9f9f9;
                border: none;
                outline: none;
                padding: 14px 8px;
                width: 100%;
              }
              
              input:focus { background-color: white } 
            ` }</style>
        </div>
    )
}

export default Input
