import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button, Form, Input, Label, TextField, FieldError } from "react-aria-components";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-base-content">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </header>

        {isSubmitted ? (
          <div className="card bg-success text-success-content p-12 text-center shadow-2xl animate-bounce-short">
            <h2 className="text-3xl font-black mb-4">Message Sent!</h2>
            <p className="text-lg">Thank you for reaching out. We'll get back to you soon.</p>
            <button onClick={() => setIsSubmitted(false)} className="btn btn-ghost mt-8 underline">Send another message</button>
          </div>
        ) : (
          <div className="card bg-base-200 p-8 md:p-12 shadow-xl border border-base-300">
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
              <TextField isRequired className="flex flex-col gap-2">
                <Label className="font-bold opacity-70">Your Name</Label>
                <Input className="input input-bordered w-full bg-base-100" placeholder="John Doe" />
                <FieldError className="text-error text-xs" />
              </TextField>

              <TextField isRequired type="email" className="flex flex-col gap-2">
                <Label className="font-bold opacity-70">Email Address</Label>
                <Input className="input input-bordered w-full bg-base-100" placeholder="john@example.com" />
                <FieldError className="text-error text-xs" />
              </TextField>

              <TextField isRequired type="tel" className="flex flex-col gap-2">
                <Label className="font-bold opacity-70">Phone Number</Label>
                <Input className="input input-bordered w-full bg-base-100" placeholder="+1 (555) 000-0000" />
                <FieldError className="text-error text-xs" />
              </TextField>

              <TextField isRequired type="number" className="flex flex-col gap-2">
                <Label className="font-bold opacity-70">Age</Label>
                <Input className="input input-bordered w-full bg-base-100" placeholder="25" />
                <FieldError className="text-error text-xs" />
              </TextField>

              <TextField isRequired type="password" className="flex flex-col gap-2">
                <Label className="font-bold opacity-70">Password</Label>
                <Input className="input input-bordered w-full bg-base-100" />
                <FieldError className="text-error text-xs" />
              </TextField>

              <TextField isRequired type="password" className="flex flex-col gap-2">
                <Label className="font-bold opacity-70">Confirm Password</Label>
                <Input className="input input-bordered w-full bg-base-100" />
                <FieldError className="text-error text-xs" />
              </TextField>

              <div className="md:col-span-2 mt-4">
                <Button type="submit" className="btn btn-primary btn-block text-white font-bold text-lg">
                  Submit Message
                </Button>
              </div>
            </Form>
          </div>
        )}
      </div>
    </Layout>
  );
}
