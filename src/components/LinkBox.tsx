import { Link } from "react-router-dom"

type LinkBoxProps = {
    description: string,
    link: string,
    name: string,
    rounded?: boolean
}

export default function LinkBox({description, link, name, rounded}: LinkBoxProps) {

    return (
        <div className="flex">
            <Link title={description} to={link} className={`grow hover:inset-shadow-md hover:text-shadow-sm p-1 ${rounded && 'rounded-md'}`}>{name}</Link>
        </div>
    )
}