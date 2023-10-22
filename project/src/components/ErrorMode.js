
const ErrorMode = ({ children }) => {
    return (
        <h2 className="mt-52" style={
            { color: "red", fontFamily: "cursive", fontSize: "20px" }
        }>
            {children}
        </h2>
    )
}

export default ErrorMode;
