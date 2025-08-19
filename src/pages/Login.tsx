import React, { useState } from "react";
import { UserIcon, LockClosedIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo";
import type { Login } from "../models/login";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setLoggedUser, type AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import AuthService from "../services/AuthService";
import { toast } from "react-toastify";

const LoginPage = (): React.ReactNode => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Login>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: Login) => {
    try {
      
      const user = await AuthService.login(data);
      toast.success("Login realizado com sucesso!");
      dispatch(setLoggedUser(user));
      navigate('/');
    } catch(e) {
      toast.error("Usuário ou senha incorretos");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center p-4">

      <article className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
            
          <span className="flex justify-center mb-10">
            <Logo width={300} height={70}/>
          </span>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="form-control">
              <label htmlFor="username" className="label hidden">
                Usuário
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  id="username"
                  placeholder="Usuário"
                  className="input input-bordered w-full pl-10"
                  {...register("username", { required: "Usuário é obrigatório" })}
                />
              </div>
              {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label hidden">
                Senha
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Senha"
                  className="input input-bordered w-full pl-10 pr-10"
                  {...register("password", { required: "Senha é obrigatória" })}
                />

                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 z-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <button
                disabled={isSubmitting}
                type="submit" 
                className="btn btn-primary w-full">
                Entrar
              </button>
            </div>
          </form>
        </div>
        <footer className="mt-6 text-center text-sm text-gray-500">
          App teste em React
        </footer>
        </article>
    </main>
  );
}

export default LoginPage;