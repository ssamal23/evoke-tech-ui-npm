import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Breadcrumbs, Button, Checkbox, Dropdown, Input, Radio, RadioGroup, SideNav, Tabs, Tooltip, Typography,
} from '../src';
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
  const [page, setPage] = useState('dashboard');

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

      <Section title="Contact form (matches reference design)">
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <Input label="First Name" required placeholder="Enter Your First Name" error="Please complete this required field." />
          <Input label="Last Name" placeholder="Enter Your Last Name" />
          <Input label="Email" type="email" required placeholder="Enter Your Email" error="Please complete this required field." />
          <Input label="Phone" type="tel" required placeholder="Enter Your Phone Number" />
        </div>
        <div className="mt-6">
          <Button>Get in Touch</Button>
        </div>
      </Section>

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

      <Section title="Typography">
        <div className="flex flex-col gap-2">
          <Typography variant="h1">H1 - 32px Bold</Typography>
          <Typography variant="h2">H2 - 28px Semibold</Typography>
          <Typography variant="h3">H3 - 24px Semibold</Typography>
          <Typography variant="h4">H4 - 22px Semibold</Typography>
          <Typography variant="h5">H5 - 18px Semibold</Typography>
          <Typography variant="h6">H6 - 16px Semibold</Typography>
          <Typography variant="p1">P1 - 16px Normal</Typography>
          <Typography variant="p2">P2 - 14px Normal</Typography>
          <Typography variant="p3">P3 - 12px Semibold</Typography>
          <Typography variant="p4">P4 - 12px Normal</Typography>
        </div>
      </Section>

      <Section title="Checkbox">
        <div className="flex flex-col gap-3">
          <Checkbox label="Default" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="With helper" helperText="You can change this later." />
          <Checkbox label="Error" error="You must accept the terms." />
          <Checkbox label="Disabled" disabled />
          <div className="flex items-center gap-6">
            <Checkbox label="Small" size="sm" />
            <Checkbox label="Medium" size="md" />
            <Checkbox label="Large" size="lg" />
          </div>
        </div>
      </Section>

      <Section title="Radio">
        <div className="grid gap-6 sm:grid-cols-2">
          <RadioGroup
            label="Plan"
            defaultValue="pro"
            options={[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
              { value: 'team', label: 'Team', disabled: true },
            ]}
          />
          <RadioGroup
            label="Contact by"
            orientation="horizontal"
            required
            error="Please choose one."
            options={[
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
            ]}
          />
          <div className="flex gap-6">
            <Radio name="solo" value="1" label="Standalone" />
            <Radio name="solo" value="2" label="Radios" />
          </div>
        </div>
      </Section>

      <Section title="Tabs">
        <Tabs
          aria-label="Demo tabs"
          items={[
            { value: 'overview', label: 'Overview', content: <Typography variant="p2">Overview content.</Typography> },
            { value: 'details', label: 'Details', content: <Typography variant="p2">Details content.</Typography> },
            { value: 'billing', label: 'Billing', content: 'Billing content.', disabled: true },
            { value: 'history', label: 'History', content: <Typography variant="p2">History content.</Typography> },
          ]}
        />
      </Section>

      <Section title="Breadcrumbs">
        <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Reusable UI' }]} />
      </Section>

      <Section title="Tooltip">
        <div className="flex flex-wrap items-center gap-6 py-6">
          <Tooltip content="Top tip"><Button variant="outline">Top</Button></Tooltip>
          <Tooltip content="Bottom tip" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
          <Tooltip content="Left tip" placement="left"><Button variant="outline">Left</Button></Tooltip>
          <Tooltip content="Right tip" placement="right"><Button variant="outline">Right</Button></Tooltip>
        </div>
      </Section>

      <Section title="Left navigation">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <SideNav
            className="h-auto border-r-0"
            activeValue={page}
            onSelect={setPage}
            header={<Typography variant="h5">Evoke</Typography>}
            items={[
              { value: 'dashboard', label: 'Dashboard' },
              { value: 'reports', label: 'Reports', badge: 3 },
              {
                value: 'settings',
                label: 'Settings',
                children: [
                  { value: 'profile', label: 'Profile' },
                  { value: 'security', label: 'Security' },
                ],
              },
              { value: 'archive', label: 'Archive', disabled: true },
            ]}
          />
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
