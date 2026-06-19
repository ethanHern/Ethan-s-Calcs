import type { MouseEventHandler } from "react"


type ButtonProps = {
    color: "green" | "red" | "gray" | "black",
    additional_styling?: string,
    onClick: MouseEventHandler<HTMLButtonElement>,
    name: string
}

const colorStyles: Record<ButtonProps["color"], string> = {
    green: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
    black: "bg-black text-white active:bg-gray-800"
};

export default function Button({color, onClick, name, additional_styling}: ButtonProps) {

    return (
        <button onClick={onClick}>
            <div className={`hover:inset-shadow-md hover:cursor-pointer rounded-xl
                             ${colorStyles[color]}
                             ${additional_styling && additional_styling}`}>
                {name}
            </div>
        </button>
    )
}