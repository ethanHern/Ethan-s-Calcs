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
            <Link title={description} to={link} className={`${rounded && 'rounded-md'} ${className ? `${className} ` : `grow hover:inset-shadow-md hover:text-shadow-sm p-1`}`}>{name}</Link>
        </div>
    )
}