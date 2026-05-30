type BraceProps = {
    matrixName: string,
    side: string
}
export default function Brace({matrixName, side}: BraceProps) {

    return (
        <div id={`${side}-brace-${matrixName}`} className="shrink-0 w-3.75">
          <svg viewBox="0 0 15 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className={`h-full w-full ${side == "right" && `rotate-180`}`}>
            <path d={"M7.5 0 L0 0 L0 50 L7.5 50"} fill="none" stroke="black"  strokeWidth="2" vectorEffect="non-scaling-stroke"/>
          </svg>
        </div>
    )
}