"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  List,
  Bell,
  Settings,
  Sparkles,
  Search,
  Filter,
  Download,
  PhoneCall,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Save,
  Eye,
  Sliders,
  HandHeart,
  Gift,
} from "lucide-react";
import Link from "next/link";

interface DonItem {
  id: string;
  code: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string | null;
  status: string;
  createdAt: string;
  notifiedAt: string | null;
}

interface NotificationLog {
  id: string;
  type: string;
  channel: string;
  payload: string;
  status: string;
  createdAt: string;
  donCode: string | null;
  donNom: string | null;
  donPrenom: string | null;
}

interface SystemConfig {
  ADMIN_WHATSAPP_NUMBER: string;
  ADMIN_NAME: string;
  WHATSAPP_MESSAGE_TEMPLATE: string;
  CODE_L1_MODE: "FIXED" | "RANDOM";
  CODE_L1_VALUE: string;
  CODE_L2_MODE: "FIXED" | "RANDOM";
  CODE_L2_VALUE: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dons" | "logs" | "settings" | "test">("dons");

  // Dons List state
  const [dons, setDons] = useState<DonItem[]>([]);
  const [loadingDons, setLoadingDons] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({ total: 0, pendingCount: 0, notifiedCount: 0 });
  const [selectedDon, setSelectedDon] = useState<DonItem | null>(null);

  // Notification logs state
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [selectedPayloadLog, setSelectedPayloadLog] = useState<NotificationLog | null>(null);

  // Settings state
  const [config, setConfig] = useState<SystemConfig>({
    ADMIN_WHATSAPP_NUMBER: "",
    ADMIN_NAME: "",
    WHATSAPP_MESSAGE_TEMPLATE: "",
    CODE_L1_MODE: "FIXED",
    CODE_L1_VALUE: "B",
    CODE_L2_MODE: "FIXED",
    CODE_L2_VALUE: "O",
  });
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSuccessMsg, setConfigSuccessMsg] = useState<string | null>(null);

  // Test generator state
  const [testCount, setTestCount] = useState(5);
  const [testSamples, setTestSamples] = useState<string[]>([]);
  const [testUniqueCode, setTestUniqueCode] = useState<string | null>(null);
  const [testingGenerator, setTestingGenerator] = useState(false);

  // Load Dons List
  const fetchDons = async () => {
    setLoadingDons(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.set("q", searchQuery);
      if (statusFilter) queryParams.set("status", statusFilter);

      const res = await fetch(`/api/don-specials?${queryParams.toString()}`);
      const data = await res.json();
      if (data.success) {
        setDons(data.items);
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching dons:", err);
    } finally {
      setLoadingDons(false);
    }
  };

  // Load Notification Logs
  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("/api/admin/notifications");
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  // Load Settings
  const fetchSettings = async () => {
    setLoadingConfig(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    fetchDons();
    fetchSettings();
  }, []);

  useEffect(() => {
    if (activeTab === "dons") {
      fetchDons();
    } else if (activeTab === "logs") {
      fetchLogs();
    } else if (activeTab === "settings") {
      fetchSettings();
    }
  }, [activeTab, searchQuery, statusFilter]);

  // Handle Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingConfig(true);
    setConfigSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setConfigSuccessMsg("Configuration sauvegardée avec succès !");
        setTimeout(() => setConfigSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error("Error saving config:", err);
    } finally {
      setSavingConfig(false);
    }
  };

  // Handle Generator Test
  const handleRunGeneratorTest = async () => {
    setTestingGenerator(true);
    try {
      const res = await fetch("/api/admin/test-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          count: testCount,
          CODE_L1_MODE: config.CODE_L1_MODE,
          CODE_L1_VALUE: config.CODE_L1_VALUE,
          CODE_L2_MODE: config.CODE_L2_MODE,
          CODE_L2_VALUE: config.CODE_L2_VALUE,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestSamples(data.samples);
        setTestUniqueCode(data.uniqueDbCode);
      }
    } catch (err) {
      console.error("Error testing generator:", err);
    } finally {
      setTestingGenerator(false);
    }
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    if (dons.length === 0) return;

    const headers = ["ID", "Code", "Nom", "Prénom", "Téléphone", "Email", "Statut", "Date Création", "Date Notification"];
    const csvRows = [headers.join(",")];

    dons.forEach((d) => {
      const row = [
        `"${d.id}"`,
        `"${d.code}"`,
        `"${d.nom.replace(/"/g, '""')}"`,
        `"${d.prenom.replace(/"/g, '""')}"`,
        `"${d.telephone}"`,
        `"${d.email || ""}"`,
        `"${d.status}"`,
        `"${new Date(d.createdAt).toISOString()}"`,
        `"${d.notifiedAt ? new Date(d.notifiedAt).toISOString() : ""}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `demandes_dons_speciaux_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Live Template Preview Generator
  const generateTemplatePreview = () => {
    return (config.WHATSAPP_MESSAGE_TEMPLATE || "")
      .replace(/\{ADMIN_NAME\}/g, config.ADMIN_NAME || "Comité")
      .replace(/\{CODE\}/g, "B-O028")
      .replace(/\{NOM\}/g, "KOUASSI")
      .replace(/\{PRENOM\}/g, "Jean")
      .replace(/\{TELEPHONE\}/g, "+2250701020304")
      .replace(/\{EMAIL\}/g, "jean@example.com")
      .replace(/\{EMAIL_IF_ANY\}/g, "Email: jean@example.com");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER SUMMARY */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Panneau d'Administration
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-2">Gestion des Demandes de Dons Spéciaux</h1>
            <p className="text-slate-400 text-sm mt-1">
              Consultez les demandes des bénéficiaires, configurez les règles de codes et suivez les notifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDons}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
              title="Rafraîchir les données"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleExportCSV}
              disabled={dons.length === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Demandes de Dons</p>
              <p className="text-3xl font-extrabold text-white mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Statut Notifié</p>
              <p className="text-3xl font-extrabold text-emerald-400 mt-1">{stats.notifiedCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Statut En Attente</p>
              <p className="text-3xl font-extrabold text-amber-400 mt-1">{stats.pendingCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="border-b border-slate-800 mb-8 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("dons")}
            className={`pb-4 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "dons"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
            <span>Liste des Demandes ({stats.total})</span>
          </button>

          <button
            onClick={() => setActiveTab("logs")}
            className={`pb-4 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "logs"
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Logs de Notification</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "settings"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuration & Variables</span>
          </button>

          <button
            onClick={() => setActiveTab("test")}
            className={`pb-4 px-4 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === "test"
                ? "border-purple-500 text-purple-400"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Générateur Test</span>
          </button>
        </div>

        {/* TAB 1: DONS LIST */}
        {activeTab === "dons" && (
          <div className="space-y-6">
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, code, tél..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-white focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-white">Tous les statuts</option>
                    <option value="notified" className="bg-slate-900 text-white">Notifié (Succès)</option>
                    <option value="pending" className="bg-slate-900 text-white">En attente</option>
                  </select>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              {loadingDons ? (
                <div className="p-12 text-center text-slate-400">
                  <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
                  <p>Chargement des demandes de dons...</p>
                </div>
              ) : dons.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <AlertCircle className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-white">Aucune demande de don trouvée</p>
                  <p className="text-xs mt-1">Essayez de modifier vos critères de recherche.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/60 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-4 px-6">Code Unique</th>
                        <th className="py-4 px-6">Bénéficiaire</th>
                        <th className="py-4 px-6">Téléphone</th>
                        <th className="py-4 px-6">Email</th>
                        <th className="py-4 px-6">Statut</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm">
                      {dons.map((don) => (
                        <tr key={don.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold text-emerald-400">
                            {don.code}
                          </td>
                          <td className="py-4 px-6 font-medium text-white">
                            {don.prenom} {don.nom}
                          </td>
                          <td className="py-4 px-6 font-mono text-slate-300">
                            {don.telephone}
                          </td>
                          <td className="py-4 px-6 text-slate-400">
                            {don.email || "—"}
                          </td>
                          <td className="py-4 px-6">
                            {don.status === "notified" ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Notifié
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                                <Clock className="w-3.5 h-3.5" /> En attente
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-xs text-slate-400">
                            {new Date(don.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/succes?id=${don.id}`}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                title="Voir la page de félicitations & redirection WhatsApp"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => setSelectedDon(don)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/20 transition-colors"
                              >
                                Détails
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: NOTIFICATION LOGS */}
        {activeTab === "logs" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Journal des Notifications Admin</h3>
                <p className="text-xs text-slate-400">
                  Trace de tous les événements de notification générés lors des enregistrements.
                </p>
              </div>
              <button
                onClick={fetchLogs}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Rafraîchir
              </button>
            </div>

            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
              {loadingLogs ? (
                <div className="p-12 text-center text-slate-400">
                  <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-3" />
                  <p>Chargement des logs de notification...</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <p>Aucun log de notification enregistré.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {logs.map((log) => (
                    <div key={log.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                            {log.type}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            [{log.channel}]
                          </span>
                          {log.donCode && (
                            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              Code: {log.donCode}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-white">
                          Bénéficiaire: {log.donPrenom || ""} {log.donNom || "Inconnu"}
                        </p>
                        <p className="text-xs text-slate-500">
                          Horodatage: {new Date(log.createdAt).toLocaleString("fr-FR")}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedPayloadLog(log)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                      >
                        Inspecter Payload JSON
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM SETTINGS */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            {configSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{configSuccessMsg}</span>
              </div>
            )}

            {/* SECTION 1: WHATSAPP CONFIG */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-emerald-400" />
                  <span>Paramètres WhatsApp Admin</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Définissez le numéro destinataire et le nom de l'administrateur de distribution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    ADMIN_WHATSAPP_NUMBER
                  </label>
                  <input
                    type="text"
                    value={config.ADMIN_WHATSAPP_NUMBER}
                    onChange={(e) => setConfig({ ...config, ADMIN_WHATSAPP_NUMBER: e.target.value })}
                    placeholder="ex: 2250700000000"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Format chiffres uniquement sans "+" ni espaces.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    ADMIN_NAME
                  </label>
                  <input
                    type="text"
                    value={config.ADMIN_NAME}
                    onChange={(e) => setConfig({ ...config, ADMIN_NAME: e.target.value })}
                    placeholder="ex: Comité de Distribution"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* MESSAGE TEMPLATE */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  WHATSAPP_MESSAGE_TEMPLATE
                </label>
                <textarea
                  rows={4}
                  value={config.WHATSAPP_MESSAGE_TEMPLATE}
                  onChange={(e) => setConfig({ ...config, WHATSAPP_MESSAGE_TEMPLATE: e.target.value })}
                  className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Variables disponibles : <span className="text-emerald-400 font-mono">&#123;CODE&#125;</span>, <span className="text-emerald-400 font-mono">&#123;NOM&#125;</span>, <span className="text-emerald-400 font-mono">&#123;PRENOM&#125;</span>, <span className="text-emerald-400 font-mono">&#123;TELEPHONE&#125;</span>, <span className="text-emerald-400 font-mono">&#123;EMAIL&#125;</span>, <span className="text-emerald-400 font-mono">&#123;ADMIN_NAME&#125;</span>
                </p>
              </div>

              {/* PREVIEW */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-400">Aperçu dynamique du message reçu :</p>
                <pre className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-emerald-300 whitespace-pre-wrap border border-slate-800">
                  {generateTemplatePreview()}
                </pre>
              </div>
            </div>

            {/* SECTION 2: CODE FORMAT CONFIG */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  <span>Règles du Code Unique (Format L1-L2NNN)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Configurez le mode Fixe ou Aléatoire pour la première et deuxième lettre.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* L1 RULE */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-slate-200 text-sm">Première Lettre (L1)</h4>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="l1_mode"
                        checked={config.CODE_L1_MODE === "FIXED"}
                        onChange={() => setConfig({ ...config, CODE_L1_MODE: "FIXED" })}
                        className="text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>FIXED (Fixe)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="l1_mode"
                        checked={config.CODE_L1_MODE === "RANDOM"}
                        onChange={() => setConfig({ ...config, CODE_L1_MODE: "RANDOM" })}
                        className="text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>RANDOM (Aléatoire A-Z)</span>
                    </label>
                  </div>

                  {config.CODE_L1_MODE === "FIXED" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Valeur L1 fixe :</label>
                      <input
                        type="text"
                        maxLength={1}
                        value={config.CODE_L1_VALUE}
                        onChange={(e) => setConfig({ ...config, CODE_L1_VALUE: e.target.value.toUpperCase() })}
                        className="w-20 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-center font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )}
                </div>

                {/* L2 RULE */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-slate-200 text-sm">Deuxième Lettre (L2)</h4>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="l2_mode"
                        checked={config.CODE_L2_MODE === "FIXED"}
                        onChange={() => setConfig({ ...config, CODE_L2_MODE: "FIXED" })}
                        className="text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>FIXED (Fixe)</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="radio"
                        name="l2_mode"
                        checked={config.CODE_L2_MODE === "RANDOM"}
                        onChange={() => setConfig({ ...config, CODE_L2_MODE: "RANDOM" })}
                        className="text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>RANDOM (Aléatoire A-Z)</span>
                    </label>
                  </div>

                  {config.CODE_L2_MODE === "FIXED" && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Valeur L2 fixe :</label>
                      <input
                        type="text"
                        maxLength={1}
                        value={config.CODE_L2_VALUE}
                        onChange={(e) => setConfig({ ...config, CODE_L2_VALUE: e.target.value.toUpperCase() })}
                        className="w-20 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-center font-mono font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={savingConfig}
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 text-sm cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingConfig ? "Sauvegarde..." : "Enregistrer la Configuration"}</span>
            </button>
          </form>
        )}

        {/* TAB 4: TEST GENERATOR */}
        {activeTab === "test" && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  <span>Simulateur & Test d'Unicité de Code</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Testez la génération selon la configuration active pour vérifier le format <code className="text-purple-400">L1-L2NNN</code> et le contrôle d'unicité en base de données.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nombre d'échantillons :</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={testCount}
                    onChange={(e) => setTestCount(parseInt(e.target.value, 10) || 1)}
                    className="w-24 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRunGeneratorTest}
                  disabled={testingGenerator}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{testingGenerator ? "Génération..." : "Lancer le Test"}</span>
                </button>
              </div>

              {testUniqueCode && (
                <div className="mt-4 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                  <p className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
                    Code unique vérifié dans la base :
                  </p>
                  <p className="font-mono text-2xl font-extrabold text-white">{testUniqueCode}</p>
                </div>
              )}

              {testSamples.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400 font-semibold">Exemples générés aléatoirement :</p>
                  <div className="flex flex-wrap gap-2">
                    {testSamples.map((sample, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-sm text-emerald-400 font-bold"
                      >
                        {sample}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL FOR DONATION CLAIM */}
      {selectedDon && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Détails du Bénéficiaire & Don</h3>
              <button
                onClick={() => setSelectedDon(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">Code Unique:</span>
                <span className="font-mono font-extrabold text-emerald-400 text-lg">
                  {selectedDon.code}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-500">Bénéficiaire</p>
                <p className="font-semibold text-white">
                  {selectedDon.prenom} {selectedDon.nom}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Téléphone</p>
                <p className="font-mono font-semibold text-white">{selectedDon.telephone}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-semibold text-white">{selectedDon.email || "Non renseigné"}</p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Statut de Notification</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                  {selectedDon.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-500">Date de demande</p>
                <p className="text-slate-300 text-xs">
                  {new Date(selectedDon.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedDon(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INSPECT LOG MODAL */}
      {selectedPayloadLog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Payload de Notification Admin</h3>
              <button
                onClick={() => setSelectedPayloadLog(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-2xl font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800 leading-relaxed">
              {selectedPayloadLog.payload}
            </pre>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPayloadLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
