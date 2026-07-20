import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contactData } from '@/data/company';
import { Phone, Mail, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  serviceInterest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please provide more details'),
});

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: wire to email service (e.g. Formspree free tier) — form is intentionally unwired
    console.log(values);
    setIsSubmitted(true);
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
            Get a Quote
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Whether it's a multi-site EV rollout or emergency response power, we're ready to deploy. Tell us about your project.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="text-2xl font-bold uppercase font-heading mb-6">Direct Line</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-card border border-border flex items-center justify-center shrink-0 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Call Us</p>
                      <a href={`tel:${contactData.phone.replace(/[^0-9]/g, '')}`} className="text-xl font-medium hover:text-primary transition-colors block">
                        {contactData.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-card border border-border flex items-center justify-center shrink-0 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email Us</p>
                      <a href={`mailto:${contactData.email}`} className="text-lg font-medium hover:text-primary transition-colors block break-all">
                        {contactData.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-card border border-border flex items-center justify-center shrink-0 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Service Area</p>
                      <p className="text-lg font-medium">
                        {contactData.serviceArea}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-primary h-6 w-6" />
                  <h4 className="font-bold text-lg uppercase tracking-wide text-primary">Emergency Service</h4>
                </div>
                <p className="text-muted-foreground mb-4">
                  Require immediate disaster response or emergency power restoration?
                </p>
                <p className="font-bold text-xl text-foreground">Call {contactData.phone}</p>
                <p className="text-sm text-primary uppercase font-bold mt-2 tracking-wider">24/7 Dispatch</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              {isSubmitted ? (
                <div className="h-full min-h-[400px] bg-card border border-border p-12 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-20 w-20 text-primary mb-6" />
                  <h3 className="text-3xl font-bold uppercase font-heading mb-4">Message Received</h3>
                  <p className="text-xl text-muted-foreground max-w-md mb-8">
                    Our team will review your project details and follow up within 24 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="rounded-none border-primary text-primary hover:bg-primary/10"
                  >
                    SEND ANOTHER MESSAGE
                  </Button>
                </div>
              ) : (
                <div className="bg-card border border-border p-8 md:p-12">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" className="bg-background border-border rounded-none h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Logistics" className="bg-background border-border rounded-none h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="jane@example.com" type="email" className="bg-background border-border rounded-none h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" className="bg-background border-border rounded-none h-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="serviceInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background border-border rounded-none h-12">
                                  <SelectValue placeholder="Select a service category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none border-border">
                                <SelectItem value="commercial-ev">Commercial EV Infrastructure</SelectItem>
                                <SelectItem value="distributed-energy">Distributed Energy (Solar/Storage)</SelectItem>
                                <SelectItem value="field-services">Field Services & Maintenance</SelectItem>
                                <SelectItem value="engineering">Engineering & Consulting</SelectItem>
                                <SelectItem value="resilient-power">Resilient & Off-Grid Power</SelectItem>
                                <SelectItem value="other">Other / Not Sure</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your timeline, location, and requirements..." 
                                className="bg-background border-border rounded-none min-h-[150px] resize-y" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg rounded-none uppercase tracking-wide"
                      >
                        Submit Request
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </Layout>
  );
}
