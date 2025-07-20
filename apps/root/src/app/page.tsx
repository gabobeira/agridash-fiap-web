import Image from 'next/image';
import { FCard, FInput, FButton } from '@repo/ui';
import { Title, Group } from '@mantine/core';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="AgriDash Logo"
              width={200}
              height={50}
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            AgriDash FIAP teste
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma de gestão agrícola com arquitetura de microfrontends
          </p>
        </header>

        {/* Microfrontends Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Dashboard Microfrontend */}
          <FCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Painel principal com métricas, gráficos e visão geral dos dados
                agrícolas
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/dashboard"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                >
                  Acessar Dashboard
                </a>
                <a
                  href="http://localhost:3001/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium text-center"
                >
                  Dashboard Direto ↗
                </a>
              </div>
            </div>
          </FCard>

          {/* Analytics Microfrontend (Futuro) */}
          <FCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Analytics
              </h3>
              <p className="text-gray-600 mb-6">
                Análises avançadas e relatórios detalhados sobre performance
              </p>
              <button
                disabled
                className="inline-block bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed font-medium"
              >
                Em desenvolvimento
              </button>
            </div>
          </FCard>

          {/* Settings Microfrontend (Futuro) */}
          <FCard>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Configurações
              </h3>
              <p className="text-gray-600 mb-6">
                Gerenciamento de usuários, permissões e configurações do sistema
              </p>
              <button
                disabled
                className="inline-block bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed font-medium"
              >
                Em desenvolvimento
              </button>
            </div>
          </FCard>
        </div>

        {/* Architecture Info */}
        <div className="mt-16 text-center">
          <FCard className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Arquitetura Microfrontends
            </h2>
            <p className="text-gray-600 mb-6">
              Esta aplicação utiliza a abordagem Multi Zones do Next.js para
              implementar uma arquitetura de microfrontends, permitindo
              desenvolvimento e deploy independente de cada módulo.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Root App</h4>
                <p className="text-blue-700">
                  Aplicação principal que orquestra os microfrontends
                </p>
                <code className="text-xs bg-blue-100 px-2 py-1 rounded mt-2 block">
                  localhost:3000
                </code>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Dashboard</h4>
                <p className="text-green-700">
                  Microfrontend independente com métricas e dados
                </p>
                <code className="text-xs bg-green-100 px-2 py-1 rounded mt-2 block">
                  localhost:3001
                </code>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">
                  Shared UI
                </h4>
                <p className="text-purple-700">
                  Biblioteca de componentes compartilhados
                </p>
                <code className="text-xs bg-purple-100 px-2 py-1 rounded mt-2 block">
                  @repo/ui
                </code>
              </div>
            </div>
          </FCard>
        </div>

        {/* Mantine UI Demo Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <FCard>
            <div className="text-center mb-6">
              <Title order={2} mb="md">
                Mantine UI Demo
              </Title>
              <p className="text-gray-600">
                Exemplo de componente TextInput do Mantine UI integrado com
                Tailwind CSS
              </p>
            </div>
            <div className="space-y-4">
              <FInput
                label="Nome do Sensor"
                placeholder="Digite o nome do sensor"
                description="Nome identificador para o sensor agrícola"
                withAsterisk
              />
              <FInput
                label="Localização"
                placeholder="Ex: Setor A - Campo 1"
                description="Localização física do sensor"
              />
              <Group justify="center" mt="lg">
                <FButton variant="filled" color="blue">
                  Salvar Sensor
                </FButton>
              </Group>
            </div>
          </FCard>
        </div>
      </div>
    </div>
  );
}
