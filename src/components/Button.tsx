const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full px-3 py-2 rounded bg-sky-500 text-white mt-4"
    >
      {children}
    </button>
  )
}

export default Button
