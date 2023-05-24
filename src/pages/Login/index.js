import React, { useState } from 'react';
import './login.css';
import Menu from '../../components/Menu/menu';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios';
import * as yup from "yup";
import swal from 'sweetalert2';
import Footer from '../Footer/index.js';

function login() {

    const [logado, setLogado] = useState(false);

    const Autenticado = () => {
        setLogado(true);
    };

    const [deslogado, setDeslogado] = useState(false);

    const Desautenticado = () => {
        setDeslogado(true);
    };

    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            nome: values.nome,
            senha: values.senha
        }).then((response) => {
            if (response.data == "Usuário Logado!") {
                { Autenticado() }
                swal.fire({
                    title: response.data,
                    showDenyButton: true,
                    confirmButtonText: 'ADM',
                    denyButtonText: 'Ficar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/ParkingAdm";
                    } else {

                    }
                });
            } else {
                swal.fire({ icon: 'info', title: response.data, showConfirmButton: false, timer: 2000 });
            }
        });
    };

    const validationLogin = yup.object().shape({
        nome: yup
            .string()
            .required("O nome é obrigatório"),
        senha: yup
            .string()
            .min(8, "A senha está fora do padrão")
            .required("A senha é obrigatória"),
    });

    const handleClickRegister = (values) => {
        Axios.post("http://localhost:3001/register", {
            nome: values.nome,
            email: values.email,
            telefone: values.telefone,
            cpf: values.cpf,
            endereco: values.endereco,
            cep: values.cep,
            senha: values.senha
        }).then((response) => {
            swal.fire({ icon: 'info', title: response.data, showConfirmButton: false, timer: 1500 });
        });
    };

    const validationRegister = yup.object().shape({
        nome: yup
            .string()
            .required("O nome é obrigatório"),
        email: yup
            .string()
            .required("O email é obrigatório"),
        telefone: yup
            .string()
            .required("O telefone é obrigatório"),
        cpf: yup
            .string()
            .required("O CPF é obrigatório")
            .min(14, "CPF fora do padrão")
            .max(14, "CPF fora do padrão"),
        endereco: yup
            .string()
            .required("O endereço é obrigatório"),
        cep: yup
            .string()
            .required("O CEP é obrigatório"),
        senha: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
        confirmation: yup
            .string()
            .oneOf([yup.ref("senha"), null], "As senhas são diferentes")
            .required("A confirmação da senha é obrigatória"),
    });

    return (
        <div className="container-login">
            <Menu />
            <div>
                <div className="Login-Box">
                    <h3>Login</h3>
                    <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
                        <Form name="formLogin" method="post" data-parsley-validate="">
                            <div>
                                <label for="login">Login</label>
                                <Field type="text" name="nome" id="login" class="form-control" />
                                <ErrorMessage component="span" name="nome" className="form-erro" />
                            </div>
                            <div>
                                <label for="senha">Senha</label>
                                <Field type="password" name="senha" id="senha" class="form-control" />
                                <ErrorMessage component="span" name="senha" className="form-erro" />
                            </div>
                            <div className="buttons">
                                <Button type="submit">Entrar</Button>
                            </div>
                        </Form>
                    </Formik>
                    <br />
                    {logado
                        ? <div>
                            <Button href="UserCad">Cadastrar Usuário</Button>
                            <Button href="Empre">Cadastrar Empresa</Button>
                        </div>
                        : <div>
                            <Button href="User">Esqueci minha senha</Button>
                            <h3>Faça Login para cadastrar outro usuário</h3>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default login;
