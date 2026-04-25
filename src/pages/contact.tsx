import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { Send, User, Mail, Phone, Hash, Lock, CheckCircle2, MessageSquare, Globe } from "lucide-react";
import PageHeader from "../components/ui/PageHeader";
import AnimatedSection from "../components/ui/AnimatedSection";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact Us — Yummy</title>
        <meta name="description" content="Have a question about a recipe? Want to share your culinary creations? We're here to help and listen to our community." />
      </Head>
      <Layout>
      <AnimatedSection direction="up">
        <PageHeader 
          title="Connect with"
          highlight="Us"
          subtitle="Have a question about a recipe? Want to share your culinary creations? We're here to help and listen to our community."
        />
      </AnimatedSection>

      <div className="max-w-5xl mx-auto mt-20">
        {isSubmitted ? (
          <AnimatedSection direction="up" className="bg-success/10 border-2 border-success/20 p-16 rounded-[3rem] text-center space-y-8">
            <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center text-success-content mx-auto shadow-xl shadow-success/20">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-black font-serif">Message Received!</h2>
              <p className="text-xl opacity-60">Thank you for reaching out. Our chefs will get back to you shortly.</p>
            </div>
            <button onClick={() => setIsSubmitted(false)} className="btn btn-outline btn-lg rounded-2xl">Send Another Message</button>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
             <AnimatedSection direction="right" className="lg:col-span-2 space-y-10">
                <div className="space-y-4">
                   <h3 className="text-3xl font-black font-serif">Contact Information</h3>
                   <p className="opacity-60 text-lg">Reach out to us through the form or our direct channels.</p>
                </div>

                <div className="space-y-6">
                   {[
                     { icon: Mail, label: "Email", value: "chef@yummy.com" },
                     { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                     { icon: Globe, label: "Website", value: "www.yummy-recipes.com" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-base-200 border border-base-300">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-content">
                           <item.icon size={24} />
                        </div>
                        <div>
                           <div className="text-xs font-bold opacity-40 uppercase tracking-widest">{item.label}</div>
                           <div className="text-lg font-bold">{item.value}</div>
                        </div>
                     </div>
                   ))}
                </div>
             </AnimatedSection>

             <AnimatedSection direction="left" className="lg:col-span-3">
               <div className="bg-base-200 p-10 md:p-16 rounded-[3rem] border border-base-300 shadow-2xl">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold flex items-center gap-2"><User size={14}/> Name</span></label>
                      <input type="text" required placeholder="John Doe" className="input input-bordered rounded-xl bg-base-100" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold flex items-center gap-2"><Mail size={14}/> Email</span></label>
                      <input type="email" required placeholder="john@example.com" className="input input-bordered rounded-xl bg-base-100" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold flex items-center gap-2"><Phone size={14}/> Phone</span></label>
                      <input type="tel" placeholder="+1 (555) 000-0000" className="input input-bordered rounded-xl bg-base-100" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold flex items-center gap-2"><Hash size={14}/> Age</span></label>
                      <input type="number" placeholder="25" className="input input-bordered rounded-xl bg-base-100" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold flex items-center gap-2"><Lock size={14}/> Password</span></label>
                      <input type="password" required className="input input-bordered rounded-xl bg-base-100" />
                    </div>
                     <div className="form-control">
                      <label className="label"><span className="label-text font-bold flex items-center gap-2"><Lock size={14}/> Confirm</span></label>
                      <input type="password" required className="input input-bordered rounded-xl bg-base-100" />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label"><span className="label-text font-bold flex items-center gap-2"><MessageSquare size={14}/> Your Message</span></label>
                    <textarea placeholder="Tell us what's on your mind..." className="textarea textarea-bordered rounded-xl bg-base-100 min-h-[150px]"></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-block rounded-2xl text-white font-black shadow-xl shadow-primary/20 gap-3 group">
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                    Send Message
                  </button>
                </form>
               </div>
             </AnimatedSection>
          </div>
        )}
      </div>
    </Layout>
    </>
  );
}
