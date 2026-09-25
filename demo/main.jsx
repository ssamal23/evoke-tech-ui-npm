import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Input, Dropdown } from '../src';
import './demo.css';

const countries = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany', disabled: true },
];

function Section({ title, children }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}

function App() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [submitted, setSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted({ name, country });
      setLoading(false);
    }, 800);
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">Reusable UI Playground</h1>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Default" placeholder="Type here…" />
          <Input label="With helper" helperText="We never share your email." type="email" />
          <Input label="Error" error="This field is required" required />
          <Input label="Disabled" disabled value="Can't edit" readOnly />
        </div>
      </Section>

      <Section title="Dropdowns">
        <div className="grid gap-4 sm:grid-cols-2">
          <Dropdown label="Country" options={countries} placeholder="Select a country" />
          <Dropdown label="Error" options={countries} placeholder="Pick one" error="Please choose" />
        </div>
      </Section>

      <Section title="Form example">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Dropdown
            label="Country"
            required
            options={countries}
            placeholder="Select a country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button type="submit" loading={loading} fullWidth>
            Submit
          </Button>
        </form>
        {submitted && (
          <pre className="mt-4 rounded bg-gray-100 p-3 text-sm">{JSON.stringify(submitted, null, 2)}</pre>
        )}
      </Section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
