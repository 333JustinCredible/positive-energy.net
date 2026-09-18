import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Download, 
  Globe, 
  Linkedin, 
  Share2, 
  QrCode, 
  MapPin, 
  Award, 
  Shield, 
  Sun,
  Activity,
  Briefcase, 
  Zap,
  Music,
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';

const HEADSHOT_URL = ""; // TODO: Add headshot image path here (e.g., "/images/justin-huff.jpg")
const QR_CODE_URL = ""; // TODO: Add QR code image path here (e.g., "/images/justin-qr.png")

export default function Justin() {
  const [qrOpen, setQrOpen] = useState(false);
  const { toast } = useToast();

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Huff;Justin;;;
FN:Justin Huff
ORG:Positive Energy
TITLE:Founder & Principal
TEL;TYPE=CELL,VOICE:+16153080622
EMAIL:justin@pe-charging.com
URL;TYPE=WORK:https://positive-energy.net
URL;TYPE=LINKEDIN:https://www.linkedin.com/in/333-justin-huff/
NOTE:Energy Infrastructure • Sustainability • Resilient Power
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Justin_Huff_Positive_Energy.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Justin Huff - Positive Energy',
      text: 'Founder & Principal - Positive Energy',
      url: window.location.href,
    };
    
    if (
      navigator.share &&
      (typeof navigator.canShare !== 'function' || navigator.canShare(shareData))
    ) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "The business card link has been copied to your clipboard.",
        });
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100dvh-80px)] bg-muted/20 py-8 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-[420px] bg-card rounded-3xl shadow-xl overflow-hidden border border-border/60 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Header / Profile */}
          <div className="relative pt-10 pb-6 px-6 flex flex-col items-center text-center">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-32 bg-primary/10 rounded-b-[100%] blur-3xl pointer-events-none" />
            
            <img
              src="/logos/pe-logo-wide.png"
              alt="Positive Energy"
              className="relative z-10 h-10 w-auto mb-6"
            />

            <div className="relative z-10 w-28 h-28 rounded-full border-4 border-card shadow-sm overflow-hidden bg-muted mb-5 flex items-center justify-center">
              {HEADSHOT_URL ? (
                <img src={HEADSHOT_URL} alt="Justin Huff" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center text-primary-foreground font-heading font-bold text-3xl">
                  JH
                </div>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight mb-1">
              Justin Huff
            </h1>
            <p className="text-sm md:text-base font-semibold text-primary mb-3">
              Founder & Principal — Positive Energy
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mb-5 max-w-[280px] leading-relaxed">
              Energy Infrastructure • Sustainability • Resilient Power
            </p>
            
            <div className="flex items-center text-xs font-medium text-foreground bg-muted/60 px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Middle TN and Beyond
            </div>
          </div>
          
          {/* Quick Actions Grid */}
          <div className="px-6 py-6 border-t border-border/40">
            <div className="grid grid-cols-4 gap-2">
              <ActionIcon href="tel:+16153080622" icon={Phone} label="Call" />
              <ActionIcon href="sms:+16153080622" icon={MessageSquare} label="Text" />
              <ActionIcon href="mailto:justin@pe-charging.com" icon={Mail} label="Email" />
              <ActionIcon onClick={generateVCard} icon={Download} label="Save Contact" />
            </div>
          </div>
          
          {/* Detailed Links */}
          <div className="px-6 pb-8 flex flex-col gap-3">
            <LinkRow 
              href="https://positive-energy.net" 
              icon={Globe} 
              label="Website" 
              value="positive-energy.net" 
              actionIcon={ArrowUpRight} 
            />
            <LinkRow 
              href="https://www.linkedin.com/in/333-justin-huff/" 
              icon={Linkedin} 
              label="LinkedIn" 
              value="Connect with Justin" 
              actionIcon={ArrowUpRight} 
            />
            <LinkRow 
              onClick={handleShare} 
              icon={Share2} 
              label="Share Contact" 
              value="Send to a colleague" 
              actionIcon={ChevronRight} 
            />
            <LinkRow 
              onClick={() => setQrOpen(true)} 
              icon={QrCode} 
              label="QR Code" 
              value="Display for scanning" 
              actionIcon={ChevronRight} 
            />
          </div>

          {/* Credentials & Leadership */}
          <div className="px-6 py-8 bg-muted/20 border-t border-border/40">
            <h2 className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Credentials & Leadership
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Credentials
                </h3>
                <ul className="space-y-3.5">
                  <ListItem icon={Globe} text="Global Sustainability — Vanderbilt" />
                  <ListItem icon={Shield} text="Civil Air Patrol — Emergency Services Ground Team" />
                  <ListItem icon={Sun} text="NABCEP Solar Certified" />
                  <ListItem icon={Activity} text="Brazilian Jiu-Jitsu Competition Instructor" />
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" /> Leadership
                </h3>
                <ul className="space-y-3.5">
                  <ListItem icon={Zap} text="Founder — Drive Electric Nashville" />
                  <ListItem icon={Briefcase} text="Past President — CSI" />
                  <ListItem icon={Music} text="Board Member — Music Sustainability Alliance" />
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-sm rounded-2xl flex flex-col items-center p-8">
          <DialogHeader>
            <DialogTitle className="text-center font-heading text-xl">Justin's Contact Info</DialogTitle>
          </DialogHeader>
          <div className="w-64 h-64 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-border shadow-sm my-2">
            {QR_CODE_URL ? (
              <img src={QR_CODE_URL} alt="QR Code" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center p-4">
                <QrCode className="w-16 h-16 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground font-medium">QR Code Placeholder</p>
                <p className="text-xs text-muted-foreground/60 mt-1">(Replace with actual QR)</p>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-center px-4 leading-relaxed mt-2">
            Scan this code with a phone camera to quickly pull up this contact page.
          </p>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

const ActionIcon = ({ href, onClick, icon: Icon, label }: any) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      href={href}
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 group w-full outline-none"
    >
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 transition-all duration-300 shadow-sm border border-primary/20">
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <span className="text-[11px] md:text-xs font-semibold text-foreground tracking-wide">{label}</span>
    </Component>
  );
};

const LinkRow = ({ href, onClick, icon: Icon, label, value, actionIcon: ActionIconComponent }: any) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      href={href}
      onClick={onClick}
      target={href?.startsWith('http') ? "_blank" : undefined}
      rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
      className="w-full flex items-center p-3.5 rounded-xl bg-card border border-border/60 shadow-sm hover:border-primary/50 hover:shadow-md outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all group text-left cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
        <Icon className="w-4 h-4 md:w-5 md:h-5" />
      </div>
      <div className="ml-4 flex-1 overflow-hidden pr-2">
        <p className="text-sm font-semibold text-foreground mb-0.5">{label}</p>
        {value && <p className="text-xs text-muted-foreground truncate">{value}</p>}
      </div>
      <div className="text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0">
        <ActionIconComponent className="w-4 h-4" />
      </div>
    </Component>
  );
};

const ListItem = ({ icon: Icon, text }: { icon: any, text: string }) => {
  return (
    <li className="flex items-start">
      <div className="mt-0.5 mr-3 shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <span className="text-sm text-foreground/90 leading-relaxed font-medium">
        {text}
      </span>
    </li>
  );
};
