import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { updatePage } from '../http/page.http'
import { useEffect } from 'react'
import MyHead from './MyHead'
import styles from '../styles/Page.module.scss'

const PageComponent = () => {
    const { page } = useSelector(state => state)

    const { admin } = useSelector(state => state.auth)

    useEffect(() => {
        if (admin) {
            const edit = document.getElementById('edit')
            const text = document.getElementById('text')

            const change = () => {
                const focused = (document.activeElement === text)

                if (!focused) edit.textContent = 'Edit'
            }

            document.addEventListener('click', change)

            return () => document.removeEventListener('click', change)
        }
    }, [admin])

    const handleClick = e => {
        const edit = document.getElementById('edit')
        const text = document.getElementById('text')

        if (edit.textContent === 'Apply' && e.target.id === 'edit') {
            updatePage(page.name, text.textContent)

            return edit.textContent = 'Edit'
        }

        text.focus()

        edit.textContent = 'Apply'
    }

    return (
        <>
            <MyHead meta={ page.name } title={ `${ page.name.charAt(0).toUpperCase() + page.name.slice(1) } - BIKGAME` } />

            <div className={ styles.page }>
                { admin && <p className={ styles.edit } id='edit' onClick={ handleClick }>Edit</p>}

                <h2>{ page.name.charAt(0).toUpperCase() + page.name.replace(/-/g, ' ').slice(1) }</h2>

                <div contentEditable={ !!admin } id='text' onClick={ e => admin ? handleClick(e) : undefined } suppressContentEditableWarning={ true }>{ parse(page.text) }</div>
            </div>
        </>
    )
}

export default PageComponent
