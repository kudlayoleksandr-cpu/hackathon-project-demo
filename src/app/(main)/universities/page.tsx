'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { University } from '@/lib/database.types'
import { mockUniversities } from '@/lib/mock-data'
import {
  Search,
  MapPin,
  ExternalLink,
  GraduationCap,
  Users,
  Globe,
} from 'lucide-react'

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([])
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countries, setCountries] = useState<string[]>([])

  useEffect(() => {
    // Load from mock data
    setUniversities(mockUniversities)
    setFilteredUniversities(mockUniversities)
    
    const uniqueCountries = [...new Set(mockUniversities.map(u => u.country))]
    setCountries(uniqueCountries)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = universities

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        u =>
          u.name.toLowerCase().includes(query) ||
          u.city.toLowerCase().includes(query) ||
          u.country.toLowerCase().includes(query)
      )
    }

    if (selectedCountry) {
      filtered = filtered.filter(u => u.country === selectedCountry)
    }

    setFilteredUniversities(filtered)
  }, [searchQuery, selectedCountry, universities])

  // Group universities by country
  const groupedUniversities = filteredUniversities.reduce((acc, uni) => {
    if (!acc[uni.country]) {
      acc[uni.country] = []
    }
    acc[uni.country].push(uni)
    return acc
  }, {} as Record<string, University[]>)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom py-12">
          <div className="max-w-2xl">
            <Badge variant="primary" className="mb-4">
              <Globe className="h-3 w-3 mr-1" />
              Global Network
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Explore Universities
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Browse our network of partner universities and find students who can
              share their firsthand experience with you.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              options={[
                { value: '', label: 'All Countries' },
                ...countries.map(c => ({ value: c, label: c }))
              ]}
              className="sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Universities Grid */}
      <div className="container-custom py-12">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <div className="skeleton h-12 w-12 rounded-xl mb-4" />
                <div className="skeleton h-6 w-3/4 mb-2" />
                <div className="skeleton h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : filteredUniversities.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">No universities found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCountry('')
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          Object.entries(groupedUniversities).map(([country, unis]) => (
            <div key={country} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-primary-500" />
                <h2 className="text-xl font-bold">{country}</h2>
                <Badge variant="default">{unis.length}</Badge>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {unis.map((university) => (
                  <Card key={university.id} hover>
                    <div className="flex items-start gap-4">
                      {/* Logo placeholder */}
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-tight mb-1">
                          {university.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {university.city}, {university.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <Link
                        href={`/explore?university=${encodeURIComponent(university.name)}`}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                      >
                        <Users className="h-4 w-4" />
                        View students
                      </Link>
                      {university.website && (
                        <a
                          href={university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Website
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container-custom py-16">
          <Card className="bg-gradient-to-r from-primary-500 to-accent-500 border-0 text-white text-center">
            <GraduationCap className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Don&apos;t see your university?
            </h2>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              If you&apos;re a student at a university not listed here, you can still
              join our platform and start sharing your experience.
            </p>
            <Link href="/auth/register?role=student">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-white/90"
              >
                Register as a Student
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
