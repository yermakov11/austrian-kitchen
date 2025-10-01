import {FC} from 'react'

interface IngProps{
    children: React.ReactNode;
}

const IngredientsLayout: FC<IngProps> = ({children}) =>{
        return <section>{children}</section>
}

export default IngredientsLayout;