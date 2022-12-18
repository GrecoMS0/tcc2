import React from 'react';
import './login.css';
import Menu from '../../components/Menu/menu';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Axios from 'axios';
import * as yup from "yup";
import swal from 'sweetalert2';

function login() {
    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            nome: values.nome,
            senha: values.senha
        }).then((response) => {
            if (response.data == "Usuário Logado!") {
                swal.fire({
                    title: response.data,
                    type: "success"
                }).then(okay => {
                    if (okay) {
                        window.location.href = "/parking2";
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
            senha: values.senha
        }).then((response) => {
            swal.fire({ icon: 'info', title: response.data, showConfirmButton: false, timer: 1500 }).then(okay => { window.location.href = "/login"; });;
        });
    };

    const validationRegister = yup.object().shape({
        nome: yup
            .string()
            .required("O nome é obrigatório"),
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
        <div className="Back">
            <Menu />
            <div>
                <div className="Login-Box">
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
                    <h3>Cadastrar</h3>
                    <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
                        <Form name="formLogin" method="post" data-parsley-validate="">
                            <div>
                                <label for="login">Nome</label>
                                <Field type="text" name="nome" id="login" class="form-control" />
                                <ErrorMessage component="span" name="nome" className="form-erro" />
                            </div>
                            <div>
                                <label for="senha">Senha</label>
                                <Field type="password" name="senha" id="senha" class="form-control" />
                                <ErrorMessage component="span" name="senha" className="form-erro" />
                            </div>
                            <div>
                                <label for="senha">Confirme a Senha</label>
                                <Field type="password" name="confirmation" id="senha" class="form-control" />
                                <ErrorMessage component="span" name="confirmation" className="form-erro" />
                            </div>
                            <div className="buttons">
                                <Button type="submit">Concluir</Button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default login;
