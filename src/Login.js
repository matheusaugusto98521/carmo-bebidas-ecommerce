import { useState } from "react";

function Login(){

        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleLogin = async () => {
            try{
                const response = await fetch("http://127.0.0.1:8080/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                });

                if(response.ok){
                    const user = await response.json();

                    if(user && user.roles && user.roles.includes('ROLE_ADMIN')){
                        console.log("Usuário é administrador")
                    }else{
                        console.log("Usuário não é administrador")
                    }

                    console.log("Login bem sucedido")
                }else{
                    console.error("Falha no login", response.status)
                }
            }catch (error){
            console.error("Erro ao tentar fazer login", error)
        }
    };

    return(
        <div className="login-page">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />

            <input
                type="button"
                onClick={handleLogin}
                value="Login"
            />
        </div>
    );

}
export default Login;