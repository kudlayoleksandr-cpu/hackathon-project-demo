'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { OfferCard, OfferCardSkeleton } from '@/components/offers/OfferCard'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { OfferWithUser } from '@/lib/database.types'
import { getOffersWithUsers, mockUniversities } from '@/lib/mock-data'
import { debounce } from '@/lib/utils'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const offerTypes = [
  { value: '', label: 'All Types' },
  { value: 'written_review', label: 'Written Review' },
  { value: 'video_call', label: 'Video Call' },
  { value: 'chat_session', label: 'Chat Session' },
]

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: '0-25', label: 'Under $25' },
  { value: '25-50', label: '$25 - $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100+', label: '$100+' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function ExplorePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [offers, setOffers] = useState<OfferWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [university, setUniversity] = useState(searchParams.get('university') || '')
  const [country, setCountry] = useState(searchParams.get('country') || '')
  const [offerType, setOfferType] = useState(searchParams.get('type') || '')
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  
  // Get unique values from mock data
  const universities = [...new Set(mockUniversities.map(u => u.name))]
  const countries = [...new Set(mockUniversities.map(u => u.country))]

  // Fetch and filter offers
  const fetchOffers = useCallback(() => {
    setLoading(true)
    
    // Simulate network delay
    setTimeout(() => {
      let filteredData = getOffersWithUsers().filter(o => o.is_active)
      
      // Apply filters
      if (offerType) {
        filteredData = filteredData.filter(o => o.offer_type === offerType)
      }
      
      if (priceRange) {
        const [min, max] = priceRange.split('-')
        if (min) filteredData = filteredData.filter(o => o.price >= parseInt(min) * 100)
        if (max && max !== '+') filteredData = filteredData.filter(o => o.price <= parseInt(max) * 100)
      }
      
      if (university) {
        filteredData = filteredData.filter(o => 
          o.users.university?.toLowerCase().includes(university.toLowerCase())
        )
      }
      
      if (country) {
        filteredData = filteredData.filter(o => 
          o.users.country?.toLowerCase() === country.toLowerCase()
        )
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredData = filteredData.filter(o =>
          o.title.toLowerCase().includes(query) ||
          o.description.toLowerCase().includes(query) ||
          o.users.name.toLowerCase().includes(query) ||
          o.users.university?.toLowerCase().includes(query) ||
          o.users.study_program?.toLowerCase().includes(query)
        )
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          filteredData.sort((a, b) => a.price - b.price)
          break
        case 'price_high':
          filteredData.sort((a, b) => b.price - a.price)
          break
        case 'newest':
        default:
          filteredData.sort((a, b) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
      }
      
      setOffers(filteredData)
      setLoading(false)
    }, 300)
  }, [searchQuery, university, country, offerType, priceRange, sortBy])

  // Debounced search
  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(value)
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers])

  const clearFilters = () => {
    setSearchQuery('')
    setUniversity('')
    setCountry('')
    setOfferType('')
    setPriceRange('')
    setSortBy('newest')
  }

  const activeFiltersCount = [university, country, offerType, priceRange].filter(Boolean).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold mb-2">Explore Student Insights</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Connect with students from top universities worldwide
          </p>
          
          {/* Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by university, program, or keyword..."
                defaultValue={searchQuery}
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              leftIcon={<SlidersHorizontal className="h-4 w-4" />}
              className="relative"
            >
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="primary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 animate-slide-down">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear all
                  </button>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select
                  label="University"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  options={[
                    { value: '', label: 'All Universities' },
                    ...universities.map(u => ({ value: u, label: u }))
                  ]}
                />
                <Select
                  label="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  options={[
                    { value: '', label: 'All Countries' },
                    ...countries.map(c => ({ value: c, label: c }))
                  ]}
                />
                <Select
                  label="Service Type"
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value)}
                  options={offerTypes}
                />
                <Select
                  label="Price Range"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  options={priceRanges}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container-custom py-8">
        {/* Sort & Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            {loading ? 'Loading...' : `${offers.length} offers found`}
          </p>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={sortOptions}
            className="w-auto"
          />
        </div>

        {/* Offers Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <OfferCardSkeleton key={i} />
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">No offers found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Try adjusting your filters or search query
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
