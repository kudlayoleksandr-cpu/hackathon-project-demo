'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import { DashboardHeader } from '@/components/layout/DashboardHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Avatar } from '@/components/ui/Avatar'
import { Spinner } from '@/components/ui/Spinner'
import { University } from '@/lib/database.types'
import { Camera, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    university: '',
    study_program: '',
    country: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        university: user.university || '',
        study_program: user.study_program || '',
        country: user.country || '',
      })
    }
  }, [user])

  useEffect(() => {
    async function fetchUniversities() {
      const supabase = createClient()
      const { data } = await supabase
        .from('universities')
        .select('*')
        .order('name')
      
      if (data) {
        setUniversities(data)
      }
    }
    fetchUniversities()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await updateProfile(formData)

    if (error) {
      toast.error('Failed to update profile')
    } else {
      toast.success('Profile updated successfully')
    }

    setLoading(false)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  // Get unique countries from universities
  const countries = [...new Set(universities.map(u => u.country))]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <div className="lg:col-span-1">
            <Card className="text-center">
              <div className="relative inline-block mb-4">
                <Avatar
                  src={user.avatar_url}
                  name={user.name}
                  size="xl"
                  className="mx-auto"
                />
                <button className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-slate-500">{user.email}</p>
              <p className="text-sm text-slate-500 capitalize mt-1">{user.role}</p>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />

                <Textarea
                  label="Bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Tell others about yourself, your experience, and what you can offer..."
                  hint="This will be displayed on your public profile"
                />

                {user.role === 'student' && (
                  <>
                    <Select
                      label="University"
                      value={formData.university}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          university: e.target.value,
                        }))
                      }
                      options={[
                        { value: '', label: 'Select your university' },
                        ...universities.map((u) => ({
                          value: u.name,
                          label: u.name,
                        })),
                      ]}
                    />

                    <Input
                      label="Study Program"
                      value={formData.study_program}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          study_program: e.target.value,
                        }))
                      }
                      placeholder="e.g., Computer Science, Business Administration"
                    />

                    <Select
                      label="Country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      options={[
                        { value: '', label: 'Select your country' },
                        ...countries.map((c) => ({ value: c, label: c })),
                      ]}
                    />
                  </>
                )}

                <div className="flex justify-end gap-4">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" loading={loading} leftIcon={<Save className="h-4 w-4" />}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

