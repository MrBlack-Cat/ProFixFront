import { useEffect, useState } from "react";
import axios from "axios";

interface Provider {
  id: number;
  name: string;
  profession: string;
  rating: number;
}

const Providers: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    axios.get("/api/providers")
      .then(res => setProviders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ustalar</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Ad</th>
            <th className="border p-2">Peşə</th>
            <th className="border p-2">Reytinq</th>
          </tr>
        </thead>
        <tbody>
          {providers.map(provider => (
            <tr key={provider.id}>
              <td className="border p-2">{provider.name}</td>
              <td className="border p-2">{provider.profession}</td>
              <td className="border p-2">{provider.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Providers;
