import { Link } from "react-router-dom"

type LinkBoxProps = {
    description: string,
    link: string,
    name: string,
    rounded?: boolean
    className?: string
}

export default function LinkBox({description, link, name, rounded, className}: LinkBoxProps) {

    return (
        <div className="flex">
            <Link title={description} to={link} 
                className={`hover:bg-gray-200 active:bg-gray-300 hover:inset-shadow-md hover:text-shadow-sm ${rounded && 'rounded-md'}
                    ${className ?
                    `${className} ` :
                    `grow p-1`}`}>
            {name}
            </Link>
        </div>
    )
}