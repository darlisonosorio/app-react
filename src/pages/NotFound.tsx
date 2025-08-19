import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
        <p className="mb-6 text-gray-600">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/" className="btn btn-primary">
          Voltar para Home
        </Link>
      </div>
    </main>
  );
}