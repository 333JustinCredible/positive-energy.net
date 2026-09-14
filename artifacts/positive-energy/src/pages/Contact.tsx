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
import { Phone, MapPin, Mail, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  serviceInterest: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please provide more details'),
});

export default function Contact() {
  const [submissionState, setSubmissionState] = React.useState<'idle' | 'not-connected'>('idle');

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
    void values;
    setSubmissionState('not-connected');
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-24 pb-16 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 font-heading">
            Let’s Talk About Your Project.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Planning an EV charging, distributed energy, resilient power, or complex electrical project? Tell us about the site, the requirements, and what you’re trying to accomplish.
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
                      <a href={`mailto:${contactData.email}`} className="text-lg font-medium hover:text-primary transition-colors break-all">
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

            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              {submissionState === 'not-connected' ? (
                <div className="h-full min-h-[400px] bg-card border border-border p-12 flex flex-col items-center justify-center text-center">
                  <AlertCircle className="h-20 w-20 text-primary mb-6" />
                  <h3 className="text-3xl font-bold uppercase font-heading mb-4">Request Not Sent</h3>
                  <p className="text-xl text-muted-foreground max-w-md mb-8">
                    Online delivery is not connected yet. Please call {contactData.phone} or email us directly.
                  </p>
                  <a
                    href={`mailto:${contactData.email}`}
                    className="mb-8 text-lg font-medium text-primary hover:text-primary/80 transition-colors break-all"
                  >
                    {contactData.email}
                  </a>
                  <Button 
                    onClick={() => setSubmissionState('idle')}
                    variant="outline"
                    className="rounded-none border-primary text-primary hover:bg-primary/10"
                  >
                    RETURN TO FORM
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
                              <FormLabel className="uppercase tracking-wider text-xs font-bold text-muted-foreground">Company (Optional)</FormLabel>
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
                                <SelectItem value="commercial-ev">Commercial EV Charging</SelectItem>
                                <SelectItem value="distributed-energy">Distributed Energy &amp; Monitoring</SelectItem>
                                <SelectItem value="service-om">Service &amp; O&amp;M</SelectItem>
                                <SelectItem value="design-build">Design-Build &amp; Project Delivery</SelectItem>
                                <SelectItem value="resilient-power">Resilient &amp; Remote Power</SelectItem>
                                <SelectItem value="residential-energy">Complex Residential Energy</SelectItem>
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
                        Discuss Your Project
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
