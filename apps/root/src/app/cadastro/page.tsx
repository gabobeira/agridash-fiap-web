'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthPageTemplate } from '@/components/AuthPageTemplate';
import {
  Stack,
  Group,
  PasswordInput,
  Button,
  Anchor as Link,
  TextInput,
  Alert,
} from '@mantine/core';
import { authService } from '@/services/auth';

const CadastroForm = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validarFormulario = () => {
    if (!form.nome.trim()) {
      setError('O nome é obrigatório');
      return false;
    }
    if (!form.email.trim()) {
      setError('O email é obrigatório');
      return false;
    }
    if (form.senha !== form.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }
    if (form.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validarFormulario()) {
      setLoading(false);
      return;
    }

    try {
      // 1. Registrar usuário no Firebase Auth
      const user = await authService.register(form.email, form.senha);

      // 2. Salvar dados do usuário no Firestore
      const { db } = await import('@/config/firebase');
      const { doc, setDoc } = await import('firebase/firestore');

      // Usar o mesmo formato de dados que já existe no banco
      await setDoc(doc(db, 'usuarios', user.uid), {
        id_usuario: user.uid,
        nome: form.nome.trim(),
        email: form.email.toLowerCase().trim(),
        data_cadastro: new Date(),
        tipo: 'usuario', // Ou outro tipo que você use no seu sistema
        status: 'ativo',
      });

      // 3. Redirecionar para o dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Erro no cadastro:', err);

      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este email já está em uso');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/weak-password':
          setError('A senha deve ter pelo menos 6 caracteres');
          break;
        default:
          setError('Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg">
        {error && (
          <Alert color="red" title="Erro" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <Stack gap="md">
          <TextInput
            label="Nome"
            placeholder="Digite seu nome completo"
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            required
          />
          <TextInput
            label="Email"
            placeholder="Digite seu email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={e => setForm({ ...form, senha: e.target.value })}
            required
          />
          <PasswordInput
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            value={form.confirmarSenha}
            onChange={e => setForm({ ...form, confirmarSenha: e.target.value })}
            required
          />
        </Stack>
        <Button type="submit" loading={loading} fullWidth>
          Cadastrar
        </Button>
      </Stack>
    </form>
  );
};

export default function CadastroPage() {
  return (
    <AuthPageTemplate
      title="Cadastre-se"
      content={<CadastroForm />}
      footer={
        <Group justify="center">
          <Link href="/login" fz="sm" c="blue.6">
            Já tem uma conta? Faça login
          </Link>
        </Group>
      }
    />
  );
}
