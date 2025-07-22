import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Página Não Encontrada</h2>
      <p>
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>
      <Link href="/dashboard">Voltar para a Dashboard</Link>
    </div>
  );
}
