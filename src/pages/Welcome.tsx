import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.loggedUser);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);

  return (
    <main className="welcome-page flex items-center justify-center bg-base-200 p-4">
      <article className="card w-full max-w-md bg-base-100 shadow-xl border border-gray-200">
        <div className="welcome card-body text-center">
          <h1 data-testid="welcome-title" className="text-2xl sm:text-3xl font-bold mb-4">
            Bem-vindo{user ? `, ${user.full_name.split(' ')[0]}` : "!"}
          </h1>
          {user && (
            <p className="text-gray-600 mb-6">
              Seu e-mail registrado é <span data-testid="welcome-email" className="font-semibold">{user.email}</span>
            </p>
          )}
        </div>
      </article>
    </main>
  );
};

export default WelcomePage;
