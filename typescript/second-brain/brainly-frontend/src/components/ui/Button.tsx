


export interface ButtonProps {
    variant: "primary" | "secondary"
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: any,
    endIcon?: any,
    onclick: () => void
}

const variantStyle = {
    "primary": "bg-[#3e38a7] text-white",
    "secondary": "bg-[#e0e7fe] text-[#5046e4]"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-3 px-6"
}

const defaulStyles = "rounded-lg p-4 flex items-center"

export const Button = (props: ButtonProps) => {

    return <button className={`${variantStyle[props.variant]}
     ${defaulStyles} ${sizeStyles[props.size]}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> :null}
        {props.text}
        {props.endIcon}
     </button>
}