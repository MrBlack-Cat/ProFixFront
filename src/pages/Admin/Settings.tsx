import { useState } from "react";
import axios from "axios";

const Settings: React.FC = () => {
  const [siteName, setSiteName] = useState("ProFix");
  const [email, setEmail] = useState("admin@profix.com");
  const [logoUrl, setLogoUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post("/api/settings", {
        siteName,
        email,
        logoUrl
      });
      alert("Tənzimləmələr uğurla yadda saxlanıldı!");
    } catch (err) {
      console.error(err);
      alert("Xəta baş verdi!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Tənzimləmələr</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Platforma Adı</label>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Admin Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Logo Linki</label>
        <input
          type="text"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {saving ? "Yadda saxlanılır..." : "Yadda saxla"}
      </button>
    </div>
  );
};

export default Settings;
