// import React, { useState, useEffect, ChangeEvent} from 'react';
// import UserLogin from '../../models/UserLogin';
// import './Login.css';
// import { Grid, Box, Typography, TextField, Button} from '@material-ui/core';
// import { Link, useNavigate } from 'react-router-dom'
// import { login } from '../../services/Service';
// import { useDispatch } from 'react-redux';
// import { addToken } from '../../store/tokens/actions';

// function Login() {
    
//     let navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [token, setToken] = useState('');
//     const [userLogin, setUserLogin] = useState<UserLogin>(
//         {
//             id: 0,
//             usuario: '',
//             senha: '',
//             token: ''
//         }
//         )


//         function updatedModel(e: ChangeEvent<HTMLInputElement>) {
//             setUserLogin({
//                 ...userLogin,
//                 [e.target.name]: e.target.value
//             })
//         }

//         useEffect(()=>{
//         if(token != ''){
//             dispatch(addToken(token))
//             navigate('/home')
//         }
//     }, [token])

//         async function onSubmit(e: ChangeEvent<HTMLFormElement>){
//             e.preventDefault();
//             try{
//                 await login(`/usuarios/logar`, userLogin, setToken)

//                 alert('Usuário logado com sucesso!');
//             } catch (error){
//                 alert('Dados do usuário inconsistentes. Erro ao logar!');
//             }
//         }

//     return (
        
//         <Grid container direction='row' justifyContent='center' alignItems='center'>

//             <Grid alignItems='center' xs={6}>
//                 <Box paddingX={20}>

//                     <form onSubmit={onSubmit}>
//                         <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="textos1">Entrar</Typography>
//                         <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}  id='usuario' label= 'Usuário :' variant='outlined' name='usuario' margin='normal' fullWidth />
//                         <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label= 'Senha :' variant='outlined' name='senha' margin='normal' type='password' fullWidth />

//                         <Box marginTop={2} textAlign='center'>

//                                 <Button type='submit' variant='contained' color='primary'>
//                                     Logar
//                                 </Button>

//                         </Box> 
//                     </form>
//                     <Box display='flex' justifyContent='center' marginTop={2}>

//                         <Box marginRight={1}>
//                             <Typography variant= 'subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
//                         </Box>

//                         <Link to='/cadastroUsuario'>
//                         <Typography variant= 'subtitle1' gutterBottom align='center'  className="textos1">Cadastre-se</Typography>
//                         </Link>
                        
//                     </Box>
//                 </Box>

//             </Grid>

//             <Grid xs={6} className="imagem">
//             </Grid>

//         </Grid>

//     )
// }

// export default Login;

import React, { useState, useEffect, ChangeEvent} from 'react';
import UserLogin from '../../models/UserLogin';
import './Login.css';
import { Grid, Box, Typography, TextField, Button} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../services/Service';
import { useDispatch } from 'react-redux';
import { addId, addToken } from '../../store/tokens/actions';
import { toast } from 'react-toastify';

function Login() {
    
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        }
        );

    const [respUserLogin, setRespUserLogin] = useState<UserLogin>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: ''
        }
        );


        function updatedModel(e: ChangeEvent<HTMLInputElement>) {
            setUserLogin({
                ...userLogin,
                [e.target.name]: e.target.value
            })
        }

    //     useEffect(()=>{
    //     if(token != ''){
    //         dispatch(addToken(token))
    //         navigate('/home')
    //     }
    // }, [token])

        useEffect(()=> {
            if(respUserLogin.token !== '') {
                dispatch(addToken(respUserLogin.token))
                dispatch(addId(respUserLogin.id.toString()))
                navigate('/home');
            }
        }, [respUserLogin.token])

        async function onSubmit(e: ChangeEvent<HTMLFormElement>){
            e.preventDefault();
            try{
                await login(`/usuarios/logar`, userLogin, setRespUserLogin);

                toast.success('Usuário logado com sucesso!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                })
                } catch (error){

                toast.error('Dados incosistentes, tente novamente!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,            
                })}
        }

    return (
        
        <Grid container direction='row' justifyContent='center' alignItems='center'>

            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>

                    <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className="textos1">Entrar</Typography>
                        <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}  id='usuario' label= 'Usuário :' variant='outlined' name='usuario' margin='normal' fullWidth/>
                        <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label= 'Senha :' variant='outlined' name='senha' margin='normal' type='password' fullWidth  error={userLogin.senha.length < 8 && userLogin.senha.length > 0} helperText={userLogin.senha.length < 8 && userLogin.senha.length > 0 ? 'A senha deve conter no mínimo 8 caracteres.' : ''}/>

                        <Box marginTop={2} textAlign='center'>

                                <Button type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>

                        </Box> 
                    </form>
                    <Box display='flex' justifyContent='center' marginTop={2}>

                        <Box marginRight={1}>
                            <Typography variant= 'subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>

                        <Link to='/cadastroUsuario'>
                        <Typography variant= 'subtitle1' gutterBottom align='center'  className="textos1">Cadastre-se</Typography>
                        </Link>
                        
                    </Box>
                </Box>

            </Grid>

            <Grid xs={6} className="imagem">
            </Grid>

        </Grid>

    )
}

export default Login;
