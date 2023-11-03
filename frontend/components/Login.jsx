// styles
import '../styles/Login.css'

const Login = () => {
    return (
        <div className="login-form-container">
            <h1>Login </h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" autoComplete="email"/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login