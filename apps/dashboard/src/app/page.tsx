import Image from 'next/image';
import DashboardExample from '../components/DashboardExample';
import { Button, Card, TextInput } from '@mantine/core';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Voltar ao Menu Principal</span>
              </a>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard - Microfrontend
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Microfrontend independente com componentes compartilhados
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card básico */}
          <Card>
            <h3 className="text-lg font-semibold mb-2">Card Básico</h3>
            <p className="text-gray-600">
              Este é um card simples do microfrontend dashboard.
            </p>
          </Card>

          {/* Card com título */}
          <Card title="Card com Título">
            <p className="text-gray-700">
              Este card possui um título definido na prop.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                Microfrontend
              </span>
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
                <Image src="/next.svg" alt="Produto" width={80} height={20} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  R$ 299,90
                </span>
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
                <div className="text-sm text-gray-600">Porta</div>
                <div className="font-semibold">3001</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Tipo</div>
                <div className="font-semibold text-purple-600">
                  Microfrontend
                </div>
              </div>
            </div>
          </Card>

          {/* Card de arquitetura */}
          <Card title="Multi Zones">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Root App:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  :3000
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Dashboard:</span>
                <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                  :3001
                </code>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Shared UI:</span>
                <code className="text-xs bg-green-100 px-2 py-1 rounded">
                  @repo/ui
                </code>
              </div>
            </div>
          </Card>
        </div>

        {/* Seção de Formulário com Mantine UI */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cadastro de Sensor - Mantine UI
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Dados do Sensor">
              <div className="space-y-4">
                <TextInput
                  label="Nome do Sensor"
                  placeholder="Ex: Sensor de Temperatura"
                  description="Identificação única do sensor"
                  withAsterisk
                />
                <TextInput
                  label="Tipo"
                  placeholder="Ex: Temperatura, Umidade, pH"
                  description="Tipo de medição realizada"
                />
                <TextInput
                  label="Localização"
                  placeholder="Ex: Setor A - Campo 1"
                  description="Localização física do sensor"
                />
                <div className="flex gap-3 pt-4">
                  <Button variant="filled" color="blue">
                    Salvar Sensor
                  </Button>
                  <Button variant="outline" color="gray">
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>

            <Card title="Preview dos Componentes">
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Esta seção demonstra a integração dos componentes Mantine UI
                  através do pacote @repo/ui compartilhado entre os
                  microfrontends.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Componentes Disponíveis:
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Input (baseado em TextInput)</li>
                    <li>• Button (baseado em Button)</li>
                    <li>• Card (customizado)</li>
                    <li>• MantineProvider (configuração global)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Seção de Componentes de Domínio */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Componentes Específicos do AgriDash
          </h2>

          <DashboardExample
            weatherData={{
              temperature: 28,
              humidity: 65,
              windSpeed: 12,
              condition: 'sunny',
              location: 'Fazenda AgriDash',
            }}
            sensorData={[
              {
                id: '1',
                sensorName: 'Sensor Temperatura',
                type: 'Temperatura',
                value: 25.5,
                unit: '°C',
                timestamp: new Date().toISOString(),
                status: 'normal',
              },
              {
                id: '2',
                sensorName: 'Sensor Umidade',
                type: 'Umidade',
                value: 85,
                unit: '%',
                timestamp: new Date(Date.now() - 300000).toISOString(),
                status: 'warning',
              },
              {
                id: '3',
                sensorName: 'Sensor pH',
                type: 'pH',
                value: 3.2,
                unit: 'pH',
                timestamp: new Date(Date.now() - 600000).toISOString(),
                status: 'critical',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
