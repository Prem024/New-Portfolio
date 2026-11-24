import React from 'react';
import { Server, RefreshCw, HardDrive, ShieldCheck, Cpu, Package, AlertTriangle, BookOpen, MessageSquare } from 'lucide-react';

interface ProjectMockupProps {
  type: 'finance' | 'loan-lead' | 'grocery-stock' | 'techtales' | 'estate-ai';
  title?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ type }) => {
  if (type === 'finance') {
    return (
      <div className="relative w-full h-full min-h-[280px] bg-[#0c0d11] rounded-xl border border-white/[0.08] p-4 flex flex-col justify-between overflow-hidden group">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        
        {/* Terminal Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <span className="text-[11px] font-mono text-zinc-400 ml-2">trk_finance.system/ledger</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            REDIS: 12ms
          </div>
        </div>

        {/* Dashboard Metrics Mockup */}
        <div className="relative z-10 grid grid-cols-3 gap-2 my-4">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-400">LOAN PIPELINE</p>
            <p className="text-sm sm:text-base font-bold font-mono text-white mt-1">ACTIVE</p>
            <span className="text-[9px] text-zinc-400">PostgreSQL ACID</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-400">EMI AMORTIZATION</p>
            <p className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1">CALCULATED</p>
            <span className="text-[9px] text-zinc-400">Zero discrepancies</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-400">RECOVERY RECON</p>
            <p className="text-sm sm:text-base font-bold font-mono text-cyan-400 mt-1">SYNCED</p>
            <span className="text-[9px] text-zinc-400">Automated ledger</span>
          </div>
        </div>

        {/* System Schema Stream */}
        <div className="relative z-10 bg-black/40 rounded-lg p-2.5 border border-white/[0.04] font-mono text-[11px] space-y-1.5 text-zinc-400">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>[DB: PostgreSQL / Sequelize]</span>
            <span className="text-emerald-400">Query OK</span>
          </div>
          <div className="text-zinc-300">
            SELECT * FROM loans WHERE emi_status = &apos;pending_recovery&apos;
          </div>
          <div className="text-[10px] text-zinc-400 flex items-center gap-3">
            <span>Puppeteer PDF: GENERATED</span>
            <span>Node-Cron: SCHEDULED</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'loan-lead') {
    return (
      <div className="relative w-full h-full min-h-[280px] bg-[#0c0d11] rounded-xl border border-white/[0.08] p-4 flex flex-col justify-between overflow-hidden group">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono text-zinc-400">lead_underwriting_stream.ts</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
            node-cron: ACTIVE
          </div>
        </div>

        {/* Workflow steps */}
        <div className="relative z-10 space-y-2 my-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
            <span className="font-mono text-zinc-300 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Applicant Verification Link
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
            <span className="font-mono text-zinc-300 flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              Google Drive Cloud Folder
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
              AUTO-CREATED
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
            <span className="font-mono text-zinc-300 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              Scheduled Reminder Daemon
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              ALTERNATE-DAY RUN
            </span>
          </div>
        </div>

        {/* Footer log */}
        <div className="relative z-10 font-mono text-[10px] text-zinc-400 flex items-center justify-between bg-black/40 p-2 rounded border border-white/[0.04]">
          <span>Audit Status: Document Approved</span>
          <span className="text-emerald-400">Nodemailer Dispatched</span>
        </div>
      </div>
    );
  }

  if (type === 'grocery-stock') {
    return (
      <div className="relative w-full h-full min-h-[280px] bg-[#0c0d11] rounded-xl border border-white/[0.08] p-4 flex flex-col justify-between overflow-hidden group">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono text-zinc-400">grocery_inventory_engine</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            REDUX: SYNCED
          </div>
        </div>

        {/* Inventory Metrics */}
        <div className="relative z-10 grid grid-cols-3 gap-2 my-3">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-400">STOCK IN/OUT</p>
            <p className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">AUTO-ADJUST</p>
            <span className="text-[9px] text-emerald-400">Atomic Mutation</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-400">LOW-STOCK ALERT</p>
            <p className="text-sm sm:text-base font-bold font-mono text-amber-400 mt-0.5">MONITORED</p>
            <span className="text-[9px] text-zinc-400">Threshold: 15 units</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <p className="text-[10px] font-mono text-zinc-400">SUPPLIER SYNC</p>
            <p className="text-sm sm:text-base font-bold font-mono text-cyan-400 mt-0.5">CONNECTED</p>
            <span className="text-[9px] text-zinc-400">CRUD Active</span>
          </div>
        </div>

        {/* Live Transaction Stream */}
        <div className="relative z-10 bg-black/40 rounded-lg p-2.5 border border-white/[0.04] font-mono text-[11px] space-y-1.5 text-zinc-400">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>[API: Express / MongoDB Mongoose]</span>
            <span className="text-emerald-400">200 OK</span>
          </div>
          <div className="text-zinc-300">
            POST /api/stock/transaction {"{ type: 'stock_out', qty: 24 }"}
          </div>
          <div className="text-[10px] text-zinc-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-amber-400">
              <AlertTriangle className="w-3 h-3" /> Auto reorder trigger active
            </span>
            <span className="text-zinc-400">JWT Admin Auth Guard</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'techtales') {
    return (
      <div className="relative w-full h-full min-h-[280px] bg-[#0c0d11] rounded-xl border border-white/[0.08] p-4 flex flex-col justify-between overflow-hidden group">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono text-zinc-400">techtales_author_studio</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            LIVE ON VERCEL
          </div>
        </div>

        {/* Blog Post Flow */}
        <div className="relative z-10 space-y-2 my-3">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
            <span className="font-mono text-zinc-300">
              Article: &quot;Building Scalable MERN Systems&quot;
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
              SLUG GENERATED
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
            <span className="font-mono text-zinc-300 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#10b981]" />
              Reader Comment Thread
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              NESTED CRUD
            </span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
            <span className="font-mono text-zinc-300">
              JWT & bcrypt Secure Session
            </span>
            <span className="text-[10px] font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded">
              AUTHENTICATED
            </span>
          </div>
        </div>

        {/* Footer log */}
        <div className="relative z-10 font-mono text-[10px] text-zinc-400 flex items-center justify-between bg-black/40 p-2 rounded border border-white/[0.04]">
          <span>Redux Toolkit Global Store</span>
          <span className="text-cyan-400">Vite Fast HMR</span>
        </div>
      </div>
    );
  }

  // estate-ai
  return (
    <div className="relative w-full h-full min-h-[280px] bg-[#0c0d11] rounded-xl border border-white/[0.08] p-4 flex flex-col justify-between overflow-hidden group">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span className="text-[11px] font-mono text-zinc-400">estate_ai_inference_v1</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          CONCEPT PROTOTYPE
        </div>
      </div>

      {/* Prompt & Prediction Box */}
      <div className="relative z-10 space-y-2.5 my-3">
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs">
          <p className="text-[10px] font-mono text-zinc-400">QUERY PARSER</p>
          <p className="font-mono text-zinc-200 mt-0.5 text-[11px]">
            &quot;3BHK in Ahmedabad near SG Highway under budget with high ROI&quot;
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/20 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono text-purple-400">
            <span>SEMANTIC EMBEDDING MATCH</span>
            <span>SCORE: 96.4%</span>
          </div>
          <p className="text-[11px] text-zinc-300 mt-1">
            Top property match identified with projected 11.2% rental yield.
          </p>
        </div>
      </div>

      {/* Tech badges */}
      <div className="relative z-10 font-mono text-[10px] text-zinc-400 flex items-center justify-between bg-black/40 p-2 rounded border border-white/[0.04]">
        <span>Vector Search Pipeline</span>
        <span className="text-purple-400">MongoDB Documents</span>
      </div>
    </div>
  );
};
