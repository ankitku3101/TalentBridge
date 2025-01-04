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
    yoe:0
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
      yoe:0
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = '/api/auth/signup';

      const payload = {
        ...formData,
        role: userType.toLowerCase(),
        age: formData.age ? parseInt(formData.age) : undefined,
        graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined,
        skills: formData.skills ? formData.skills.split(',') : [],
        hiringFor: formData.hiringFor ? formData.hiringFor.split(',') : [],
        phone: userType === 'Employer' ? formData.contactNumber : formData.phone,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md -mt-12"  // Added negative margin-top to move the card upwards
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">User Type</label>
          <select
            value={userType}
            onChange={handleUserTypeChange}
            className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg"
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
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="rollNumber"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="graduationYear"
                placeholder="Graduation Year"
                value={formData.graduationYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma-separated)"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="yoe"
                placeholder="Year Of Experience"
                value={formData.yoe}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
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
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="hiringFor"
                placeholder="Hiring For (comma-separated)"
                value={formData.hiringFor}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
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
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 mt-6 rounded-lg hover:bg-blue-600"
        >
          {isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/signin')}
              className="text-blue-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
