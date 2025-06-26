import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Portfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('http://localhost:5000/api/items');
        const items = await res.json();
        setData(items[0] || null);
      } catch (err) {
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPortfolio();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('portfolio_token');
    router.push('/login');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your portfolio? This action cannot be undone.')) {
      if (data && data._id) {
        await fetch(`http://localhost:5000/api/items/${data._id}`, { method: 'DELETE' });
      }
      setData(null);
      router.push('/generate');
    }
  };

  if (loading) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-DeepNightBlack text-SilverGray">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-DeepNightBlack text-SilverGray">
        <h2 className="text-2xl font-circular-bold mb-4">No Portfolio Data Found</h2>
        <Link href="/generate" className="button">Generate Your Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-Snow py-10 px-4 flex flex-col items-center animate-fade-in relative">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-circular-bold shadow-lg transition"
      >
        Logout
      </button>
      {/* Delete Portfolio Button */}
      <button
        onClick={handleDelete}
        className="absolute top-20 right-8 bg-gray-800 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-circular-bold shadow-lg transition"
      >
        Delete Portfolio
      </button>
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-10">
        {data.profilePicUrl && (
          <img src={data.profilePicUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-Green mb-4 shadow-lg" />
        )}
        <h1 className="text-4xl font-circular-bold text-Green mb-2">{data.name}</h1>
        <h2 className="text-xl font-circular-medium text-SilverGray mb-2">{data.role}</h2>
      </div>
      {/* About/Bio */}
      <div className="bg-EveningBlack/90 rounded-xl p-6 mb-8 w-full max-w-2xl shadow-lg">
        <h3 className="text-Green text-lg font-circular-bold mb-2">About Me</h3>
        <p className="text-SilverGray font-circular-normal">{data.about}</p>
      </div>
      {/* Education Timeline */}
      <div className="bg-EveningBlack/90 rounded-xl p-6 mb-8 w-full max-w-2xl shadow-lg">
        <h3 className="text-Green text-lg font-circular-bold mb-4">Education</h3>
        <ol className="relative border-l-2 border-Green ml-4">
          {data.education.map((ed, idx) => (
            <li key={idx} className="mb-6 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-Green rounded-full ring-8 ring-DeepNightBlack text-MidNightBlack font-bold">{ed.year}</span>
              <div className="flex flex-col">
                <span className="font-circular-bold text-Snow">{ed.degree}</span>
                <span className="text-SilverGray">{ed.institution}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Skills */}
      <div className="bg-EveningBlack/90 rounded-xl p-6 mb-8 w-full max-w-2xl shadow-lg">
        <h3 className="text-Green text-lg font-circular-bold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="bg-Green text-MidNightBlack px-4 py-1 rounded-full text-sm font-circular-medium animate-fade-in">{skill}</span>
          ))}
        </div>
      </div>
      {/* Contact Info & Social Links */}
      <div className="bg-EveningBlack/90 rounded-xl p-6 mb-8 w-full max-w-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-Green text-lg font-circular-bold mb-2">Contact Info</h3>
          <div className="text-SilverGray font-circular-normal">
            <div><span className="font-circular-bold">Phone:</span> {data.contact.phone}</div>
            <div><span className="font-circular-bold">Email:</span> {data.contact.email}</div>
            <div><span className="font-circular-bold">Address:</span> {data.contact.address}</div>
          </div>
        </div>
        <div>
          <h3 className="text-Green text-lg font-circular-bold mb-2">Social Links</h3>
          <div className="flex flex-col gap-2">
            {data.social.linkedin && <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-Green hover:underline">LinkedIn</a>}
            {data.social.github && <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="text-Green hover:underline">GitHub</a>}
            {data.social.instagram && <a href={data.social.instagram} target="_blank" rel="noopener noreferrer" className="text-Green hover:underline">Instagram</a>}
            {data.social.facebook && <a href={data.social.facebook} target="_blank" rel="noopener noreferrer" className="text-Green hover:underline">Facebook</a>}
          </div>
        </div>
      </div>
      {/* Resume Download */}
      {data.resumeName && (
        <div className="bg-EveningBlack/90 rounded-xl p-6 mb-8 w-full max-w-2xl shadow-lg flex flex-col items-center">
          <h3 className="text-Green text-lg font-circular-bold mb-2">Resume</h3>
          <div className="text-SilverGray font-circular-normal mb-2">{data.resumeName}</div>
          <div className="text-xs text-LightGray">(Resume file is stored locally and not uploaded. For a real app, implement file download or backend storage.)</div>
        </div>
      )}
    </div>
  );
}
