import Image from "next/image";
import { Card } from "@repo/ui";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Testando o componente Card compartilhado</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card básico */}
          <Card>
            <h3 className="text-lg font-semibold mb-2">Card Básico</h3>
            <p className="text-gray-600">Este é um card simples sem título.</p>
          </Card>

          {/* Card com título */}
          <Card title="Card com Título">
            <p className="text-gray-700">Este card possui um título definido na prop.</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Ativo</span>
            </div>
          </Card>

          {/* Card de estatística */}
          <Card title="Usuários Ativos" className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
            <p className="text-gray-600">Total de usuários online</p>
            <div className="mt-3 text-sm text-green-600">↗️ +12% este mês</div>
          </Card>

          {/* Card com imagem */}
          <Card title="Produto em Destaque">
            <div className="space-y-3">
              <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                <Image
                  src="/next.svg"
                  alt="Produto"
                  width={80}
                  height={20}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">R$ 299,90</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                  Ver mais
                </button>
              </div>
            </div>
          </Card>

          {/* Card de informações */}
          <Card title="Sistema" className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Versão</div>
                <div className="font-semibold">v1.0.0</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-semibold text-green-600">Online</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Uptime</div>
                <div className="font-semibold">99.9%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Última atualização</div>
                <div className="font-semibold">Hoje</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
