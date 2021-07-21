import { MySelect } from './Styled'

const Select = ({ data, handleChange, id, label, placeholder, value }) => {
    return (
        <div>
            <label htmlFor={ id }>{ label }:</label>
            <MySelect isDisabled={ value === '' } id={ id } name={ id } onChange={ handleChange } required value={ value }>
                <option disabled={ true } value=''>{ placeholder }</option>
                { data.map((d, id) =>
                    <option key={ id } value={ typeof d === 'object' ? d.id : d }>{ typeof d === 'object' ? d.name : d }</option>
                ) }
            </MySelect>

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
            ` }</style>
        </div>
    )
}

export default Select
