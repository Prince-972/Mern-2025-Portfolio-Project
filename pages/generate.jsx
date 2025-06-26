import { useState } from 'react';
import { useRouter } from 'next/router';

const initialEducation = [{ degree: '', institution: '', year: '' }];
const initialSocial = { linkedin: '', github: '', instagram: '', facebook: '' };
const initialContact = { phone: '', email: '', address: '' };

export default function Generate() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [education, setEducation] = useState(initialEducation);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [contact, setContact] = useState(initialContact);
  const [social, setSocial] = useState(initialSocial);
  const [about, setAbout] = useState('');
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handlers for dynamic education fields
  const handleEducationChange = (idx, field, value) => {
    setEducation(education.map((ed, i) => i === idx ? { ...ed, [field]: value } : ed));
  };
  const addEducation = () => setEducation([...education, { degree: '', institution: '', year: '' }]);
  const removeEducation = (idx) => setEducation(education.filter((_, i) => i !== idx));

  // Skills tag input
  const handleSkillKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };
  const removeSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

  // File handlers
  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleResume = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setResumeName(file ? file.name : '');
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!role) newErrors.role = 'Role is required.';
    if (!profilePic) newErrors.profilePic = 'Profile picture required.';
    education.forEach((ed, i) => {
      if (!ed.degree || !ed.institution || !ed.year) newErrors[`education${i}`] = 'All fields required.';
    });
    if (skills.length === 0) newErrors.skills = 'Add at least one skill.';
    if (!contact.phone) newErrors.phone = 'Phone required.';
    if (!contact.email) newErrors.email = 'Email required.';
    if (!contact.address) newErrors.address = 'Address required.';
    if (!about) newErrors.about = 'Bio required.';
    if (!resume) newErrors.resume = 'Resume required.';
    return newErrors;
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ name: true, role: true, profilePic: true, skills: true, phone: true, email: true, address: true, about: true, resume: true });
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const data = {
        name, role, profilePicUrl, education, skills, contact, social, about, resumeName
      };
      try {
        const res = await fetch('http://localhost:5000/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to save portfolio data.');
        setLoading(false);
        router.push('/portfolio');
      } catch (err) {
        setLoading(false);
        alert(err.message || 'Failed to save portfolio data.');
      }
    }
  };

  return (
    <div className="min-h-screen h-auto w-full bg-DeepNightBlack py-8 overflow-auto">
      <form onSubmit={handleSubmit} className="bg-EveningBlack/95 p-8 rounded-2xl shadow-2xl w-full max-w-2xl mx-auto animate-fade-in overflow-auto">
        <h2 className="text-3xl font-circular-bold text-Green mb-8 text-center tracking-wide">Portfolio Generator</h2>
        {/* Basic Info */}
        <div className="mb-6 flex gap-4 items-center">
          <div className="flex-1">
            <label className="block text-SilverGray mb-2 font-circular-medium">Name</label>
            <input className={`input_stylings ${errors.name && touched.name ? 'ring-2 ring-red-500' : ''}`} value={name} onChange={e => setName(e.target.value)} onBlur={() => handleBlur('name')} placeholder="Your Name" />
            {errors.name && touched.name && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.name}</div>}
          </div>
          <div className="flex-1">
            <label className="block text-SilverGray mb-2 font-circular-medium">Role</label>
            <input className={`input_stylings ${errors.role && touched.role ? 'ring-2 ring-red-500' : ''}`} value={role} onChange={e => setRole(e.target.value)} onBlur={() => handleBlur('role')} placeholder="e.g. Frontend Developer" />
            {errors.role && touched.role && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.role}</div>}
          </div>
        </div>
        {/* Profile Picture */}
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleProfilePic} onBlur={() => handleBlur('profilePic')} className="block w-full text-SilverGray" />
          {profilePicUrl && <img src={profilePicUrl} alt="Profile Preview" className="mt-2 w-30 h-30 rounded-full object-cover border-1 border-Green" />}
          {errors.profilePic && touched.profilePic && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.profilePic}</div>}
        </div>
        {/* Education */}
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium">Education</label>
          {education.map((ed, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input className="input_stylings flex-1" placeholder="Degree" value={ed.degree} onChange={e => handleEducationChange(idx, 'degree', e.target.value)} onBlur={() => handleBlur(`education${idx}`)} />
              <input className="input_stylings flex-1" placeholder="Institution" value={ed.institution} onChange={e => handleEducationChange(idx, 'institution', e.target.value)} onBlur={() => handleBlur(`education${idx}`)} />
              <input className="input_stylings w-24" placeholder="Year" value={ed.year} onChange={e => handleEducationChange(idx, 'year', e.target.value)} onBlur={() => handleBlur(`education${idx}`)} />
              {education.length > 1 && <button type="button" className="text-red-500 ml-2" onClick={() => removeEducation(idx)}>&times;</button>}
            </div>
          ))}
          <button type="button" className="button mt-2" onClick={addEducation}>Add Education</button>
          {education.map((_, idx) => errors[`education${idx}`] && touched[`education${idx}`] && <div key={idx} className="text-red-500 text-xs mt-1 animate-pulse">{errors[`education${idx}`]}</div>)}
        </div>
        {/* Skills */}
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium">Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-Green text-MidNightBlack px-3 py-1 rounded-full text-sm flex items-center gap-1 animate-fade-in">
                {skill} <button type="button" onClick={() => removeSkill(idx)} className="ml-1 text-xs">&times;</button>
              </span>
            ))}
            <input
              className="input_stylings flex-1 min-w-[120px]"
              placeholder="Type a skill and press Enter"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              onBlur={() => handleBlur('skills')}
            />
          </div>
          {errors.skills && touched.skills && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.skills}</div>}
        </div>
        {/* Contact Info */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">Phone</label>
            <input className={`input_stylings ${errors.phone && touched.phone ? 'ring-2 ring-red-500' : ''}`} value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} onBlur={() => handleBlur('phone')} placeholder="Phone Number" />
            {errors.phone && touched.phone && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.phone}</div>}
          </div>
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">Email</label>
            <input className={`input_stylings ${errors.email && touched.email ? 'ring-2 ring-red-500' : ''}`} value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} onBlur={() => handleBlur('email')} placeholder="Email Address" />
            {errors.email && touched.email && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.email}</div>}
          </div>
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">Address</label>
            <input className={`input_stylings ${errors.address && touched.address ? 'ring-2 ring-red-500' : ''}`} value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} onBlur={() => handleBlur('address')} placeholder="Address" />
            {errors.address && touched.address && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.address}</div>}
          </div>
        </div>
        {/* Social Media */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">LinkedIn</label>
            <input className="input_stylings" value={social.linkedin} onChange={e => setSocial({ ...social, linkedin: e.target.value })} placeholder="LinkedIn URL" />
          </div>
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">GitHub</label>
            <input className="input_stylings" value={social.github} onChange={e => setSocial({ ...social, github: e.target.value })} placeholder="GitHub URL" />
          </div>
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">Instagram</label>
            <input className="input_stylings" value={social.instagram} onChange={e => setSocial({ ...social, instagram: e.target.value })} placeholder="Instagram URL" />
          </div>
          <div>
            <label className="block text-SilverGray mb-2 font-circular-medium">Facebook</label>
            <input className="input_stylings" value={social.facebook} onChange={e => setSocial({ ...social, facebook: e.target.value })} placeholder="Facebook URL" />
          </div>
        </div>
        {/* About/Bio */}
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium">About / Bio</label>
          <textarea className={`input_stylings min-h-[80px] ${errors.about && touched.about ? 'ring-2 ring-red-500' : ''}`} value={about} onChange={e => setAbout(e.target.value)} onBlur={() => handleBlur('about')} placeholder="Short personal bio or career summary" />
          {errors.about && touched.about && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.about}</div>}
        </div>
        {/* Resume Upload */}
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium">Resume (PDF)</label>
          <input type="file" accept="application/pdf" onChange={handleResume} onBlur={() => handleBlur('resume')} className="block w-full text-SilverGray" />
          {resumeName && <div className="mt-2 text-Green text-xs">{resumeName}</div>}
          {errors.resume && touched.resume && <div className="text-red-500 text-xs mt-1 animate-pulse">{errors.resume}</div>}
        </div>
        <button type="submit" className={`button w-full mt-4 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={loading}>
          {loading ? 'Generating Portfolio...' : 'Generate Portfolio'}
        </button>
      </form>
    </div>
  );
} 