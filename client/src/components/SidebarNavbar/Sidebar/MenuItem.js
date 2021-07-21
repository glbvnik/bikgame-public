import { useState } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { setSidebar } from '../../../redux/actions'
import { MenuTitle, SubmenuTitle, SubmenuWrap } from '../Styled'
import styles from '../../../styles/SidebarNavbar.module.scss'

const MenuItem = ({ collection, id }) => {
    const [subMenu, setSubMenu] = useState(false)

    const dispatch = useDispatch()

    const handleClick = e => {
        if (e.target.name === 'submenuTitle') dispatch(setSidebar(false))

        const element = document.getElementById(`${ id }`)

        if (!subMenu) {
            element.style.maxHeight = `${ element.scrollHeight }px`
        } else {
            element.style.maxHeight = '0'
        }

        setSubMenu(!subMenu)
    }

    const query = setId => {
        const collection = `collectionId=${ id }`

        const set = `setId=${ setId }`

        return [`${ collection }&${ set }`, `${ collection }`]
    }

    return (
        <>
            <MenuTitle onClick={ handleClick }>
                <h2 className={ styles.h2 }>{ collection.name }</h2>

                <div>{ subMenu ? <RiArrowUpSLine /> : <RiArrowDownSLine /> }</div>
            </MenuTitle>

            { collection.sets &&
            <SubmenuWrap id={ id }>
                { collection.sets.map(set =>
                    <Link href={`${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }?${ query(set.id)[0] }`} key={ set.id }>
                        <SubmenuTitle name='submenuTitle' onClick={ handleClick }>{ set.name }</SubmenuTitle>
                    </Link>
                ) }

                <Link href={`${ process.env.NEXT_PUBLIC_SWIMSUITS_ROUTE }?${ query()[1] }`}>
                    <SubmenuTitle name='submenuTitle' onClick={ handleClick }>ALL</SubmenuTitle>
                </Link>
            </SubmenuWrap>
            }
        </>
    )
}

export default MenuItem
