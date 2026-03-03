import React from "react"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "outline"
  loading?: boolean
  icon?: React.ReactNode
  className?: string
}

const baseStyle =
  "flex items-center justify-center gap-2 rounded-lg font-semibold transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"

const variants = {
  primary:
    "bg-[#3c95da] text-white hover:bg-[#163b82] px-8 py-2.5",
  secondary:
    "bg-[#3c95da] text-white hover:bg-[#3c95da] px-8 py-2.5",
  outline:
    "border border-slate-400 text-slate-500 hover:bg-slate-100 px-6 py-2.5",
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "primary",
  loading,
  icon,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {loading ? "Processing..." : children}
      {!loading && icon}
    </button>
  )
}

export default Button