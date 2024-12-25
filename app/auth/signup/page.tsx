'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
  const [userType, setUserType] = useState<'Student' | 'Employer'>('Student');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    password: '',
    rollNumber: '',
    degree: '',
    graduationYear: '',
    email: '',
    phone: '',
    skills: '',
    company: '',
    position: '',
    hiringFor: '',
    contactNumber: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as 'Student' | 'Employer');
    setFormData({
      name: '',
      age: '',
      password: '',
      rollNumber: '',
      degree: '',
      graduationYear: '',
      email: '',
      phone: '',
      skills: '',
      company: '',
      position: '',
      hiringFor: '',
      contactNumber: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = '/api/auth/signup';

      const payload = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined,
        skills: formData.skills ? formData.skills.split(',') : [],
        hiringFor: formData.hiringFor ? formData.hiringFor.split(',') : [],
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || 'Something went wrong';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      toast.success(data.message || 'Signup successful!');
      router.push('/auth/signin');
    } catch (error: any) {
      console.error('Signup error:', error.message);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">User Type</label>
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Student">Student</option>
            <option value="Employer">Employer</option>
          </select>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />

          {userType === 'Student' && (
            <>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="graduationYear"
                placeholder="Graduation Year"
                value={formData.graduationYear}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma-separated)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </>
          )}

          {userType === 'Employer' && (
            <>
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="hiringFor"
                placeholder="Hiring For (comma-separated)"
                value={formData.hiringFor}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
        >
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
