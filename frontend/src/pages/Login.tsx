import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    try {
      const data = await loginUser(email, password);
      setAuthToken(data.token);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your credentials and backend configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold text-gray-900">Login</h1>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </section>
  );
};

export default Login;
