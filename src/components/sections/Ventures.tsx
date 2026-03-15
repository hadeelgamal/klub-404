'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ============================================================
   SAMPLE DATA — Replace with real data when available
   ============================================================ */
interface Venture {
  id: string
  title: string
  sector: string
  stage: 'live' | 'build' | 'concept'
  hub: 'cairo' | 'amsterdam'
  featured: boolean
  tagline: string
}

const VENTURES: Venture[] = [
  {
    id: '1',
    title: 'Project Alpha',
    sector: 'Technology',
    stage: 'live',
    hub: 'cairo',
    featured: true,
    tagline: 'Infrastructure for the next generation of EMEA builders.',
  },
  {
    id: '2',
    title: 'Project Beta',
    sector: 'Health',
    stage: 'build',
    hub: 'amsterdam',
    featured: false,
    tagline: 'Making healthcare decisions less guesswork, more clarity.',
  },
  {
    id: '3',
    title: 'Project Gamma',
    sector: 'Beauty & Wellness',
    stage: 'concept',
    hub: 'cairo',
    featured: true,
    tagline: 'A direct-to-consumer brand built for the region, not imported from elsewhere.',
  },
]

const STAGE_LABELS: Record<Venture['stage'], string> = {
  live: 'Live',
  build: 'In Build',
  concept: 'Concept',
}

const STAGE_COLORS: Record<Venture['stage'], string> = {
  live: '#22c55e',
  build: '#FF4D00',
  concept: '#94a3b8',
}

type SortMode = 'featured' | 'recent' | 'az'
type FilterSector = 'all' | string
type FilterStage = 'all' | Venture['stage']
type FilterHub = 'all' | Venture['hub']

/* ============================================================
   VENTURE CARD with 3D tilt
   ============================================================ */
function VentureCard({ venture }: { venture: Venture }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const rotateRef = useRef({ x: 0, y: 0 })
  // Cache the rect at mouseenter so mousemove never calls getBoundingClientRect()
  // — avoids forced layout reads on every pointermove event.
  const cachedRectRef = useRef<{ cx: number; cy: number; hw: number; hh: number } | null>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const cached = cachedRectRef.current
      if (!cached) return
      const dx = (e.clientX - cached.cx) / cached.hw
      const dy = (e.clientY - cached.cy) / cached.hh
      // ±8° on X axis (vertical), ±5° on Y axis (horizontal)
      rotateRef.current = { x: -dy * 8, y: dx * 5 }

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current
        if (card) {
          card.style.transform = `perspective(800px) rotateX(${rotateRef.current.x}deg) rotateY(${rotateRef.current.y}deg)`
        }
      })
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    cachedRectRef.current = null
    rotateRef.current = { x: 0, y: 0 }
    // Remove will-change before the spring-back transition fires
    card.style.willChange = 'auto'
    // Only transition transform — box-shadow Paint is handled by class toggle below
    card.style.transition = 'transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)'
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    setTimeout(() => {
      if (card) card.style.transition = ''
    }, 500)
    setHovered(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const card = cardRef.current
    if (!card) return
    // Promote to compositor layer before animation starts
    card.style.willChange = 'transform'
    // Cache rect here — one layout read at entry instead of one per frame
    const rect = card.getBoundingClientRect()
    cachedRectRef.current = {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      hw: rect.width / 2,
      hh: rect.height / 2,
    }
    setHovered(true)
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <motion.div
      layout
      layoutId={venture.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor-state="hover-card"
        style={{
          position: 'relative',
          padding: '36px 32px 28px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          /* willChange is managed imperatively in handleMouseEnter/Leave */
        }}
      >
        {/* Featured badge */}
        {venture.featured && (
          <span
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-orange)',
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            }}
          >
            Featured
          </span>
        )}

        {/* Stage indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: STAGE_COLORS[venture.stage],
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              opacity: 0.5,
            }}
          >
            {STAGE_LABELS[venture.stage]}
          </span>
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(22px, 2vw, 28px)',
            fontWeight: 500,
            lineHeight: '1.1',
            letterSpacing: '-0.01em',
            color: 'var(--color-ink)',
            marginBottom: '12px',
          }}
        >
          {venture.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: '15px',
            lineHeight: '1.6',
            color: 'var(--color-ink)',
            opacity: 0.65,
            marginBottom: '32px',
          }}
        >
          {venture.tagline}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              opacity: 0.4,
            }}
          >
            {venture.sector}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              textTransform: 'capitalize',
              color: 'var(--color-ink)',
              opacity: 0.4,
            }}
          >
            {venture.hub}
          </span>
        </div>

        {/* Orange ruled line at card bottom on hover */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'var(--color-orange)',
            transformOrigin: 'left center',
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transition: hovered
              ? 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'transform 150ms cubic-bezier(0.55, 0, 1, 0.45)',
          }}
        />
      </div>
    </motion.div>
  )
}

/* ============================================================
   FILTER BAR
   ============================================================ */
interface FilterBarProps {
  filterSector: FilterSector
  filterStage: FilterStage
  filterHub: FilterHub
  liveOnly: boolean
  sort: SortMode
  onSectorChange: (v: FilterSector) => void
  onStageChange: (v: FilterStage) => void
  onHubChange: (v: FilterHub) => void
  onLiveToggle: () => void
  onSortChange: (v: SortMode) => void
}

function FilterBar({
  filterSector,
  filterStage,
  filterHub,
  liveOnly,
  sort,
  onSectorChange,
  onStageChange,
  onHubChange,
  onLiveToggle,
  onSortChange,
}: FilterBarProps) {
  const selectStyle: React.CSSProperties = {
    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    padding: '8px 16px',
    cursor: 'pointer',
    appearance: 'none',
    borderRadius: '2px',
    outline: 'none',
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '48px',
      }}
    >
      <select
        value={filterSector}
        onChange={(e) => onSectorChange(e.target.value)}
        style={selectStyle}
        aria-label="Filter by sector"
      >
        <option value="all">All sectors</option>
        <option value="Technology">Technology</option>
        <option value="Health">Health</option>
        <option value="Beauty & Wellness">Beauty & Wellness</option>
      </select>

      <select
        value={filterStage}
        onChange={(e) => onStageChange(e.target.value as FilterStage)}
        style={selectStyle}
        aria-label="Filter by stage"
      >
        <option value="all">All stages</option>
        <option value="live">Live</option>
        <option value="build">In Build</option>
        <option value="concept">Concept</option>
      </select>

      <select
        value={filterHub}
        onChange={(e) => onHubChange(e.target.value as FilterHub)}
        style={selectStyle}
        aria-label="Filter by hub"
      >
        <option value="all">All hubs</option>
        <option value="cairo">Cairo</option>
        <option value="amsterdam">Amsterdam</option>
      </select>

      <button
        onClick={onLiveToggle}
        aria-pressed={liveOnly}
        style={{
          ...selectStyle,
          backgroundColor: liveOnly ? 'var(--color-ink)' : 'var(--color-surface)',
          color: liveOnly ? 'var(--color-canvas)' : 'var(--color-ink)',
          border: '1px solid var(--color-ink)',
          cursor: 'pointer',
        }}
      >
        Live only
      </button>

      <div style={{ marginLeft: 'auto' }}>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortMode)}
          style={selectStyle}
          aria-label="Sort ventures"
        >
          <option value="featured">Featured</option>
          <option value="recent">Recent</option>
          <option value="az">A–Z</option>
        </select>
      </div>
    </div>
  )
}

/* ============================================================
   MAIN VENTURES SECTION
   ============================================================ */
export default function Ventures() {
  const [filterSector, setFilterSector] = useState<FilterSector>('all')
  const [filterStage, setFilterStage] = useState<FilterStage>('all')
  const [filterHub, setFilterHub] = useState<FilterHub>('all')
  const [liveOnly, setLiveOnly] = useState(false)
  const [sort, setSort] = useState<SortMode>('featured')

  const filtered = VENTURES.filter((v) => {
    if (filterSector !== 'all' && v.sector !== filterSector) return false
    if (filterStage !== 'all' && v.stage !== filterStage) return false
    if (filterHub !== 'all' && v.hub !== filterHub) return false
    if (liveOnly && v.stage !== 'live') return false
    return true
  }).sort((a, b) => {
    if (sort === 'featured') return Number(b.featured) - Number(a.featured)
    if (sort === 'az') return a.title.localeCompare(b.title)
    return 0 // 'recent' — preserve data order as proxy
  })

  const clearFilters = () => {
    setFilterSector('all')
    setFilterStage('all')
    setFilterHub('all')
    setLiveOnly(false)
    setSort('featured')
  }

  return (
    <section
      id="work"
      style={{
        padding: 'clamp(80px, 10vw, 160px) 48px',
        backgroundColor: 'var(--color-canvas)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '64px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              opacity: 0.5,
              marginBottom: '16px',
            }}
          >
            Work
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 500,
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
            }}
          >
            What we have built and what we are building.
          </h2>
        </div>

        <FilterBar
          filterSector={filterSector}
          filterStage={filterStage}
          filterHub={filterHub}
          liveOnly={liveOnly}
          sort={sort}
          onSectorChange={setFilterSector}
          onStageChange={setFilterStage}
          onHubChange={setFilterHub}
          onLiveToggle={() => setLiveOnly((v) => !v)}
          onSortChange={setSort}
        />

        {/* Cards grid */}
        <AnimatePresence mode="sync">
          {filtered.length > 0 ? (
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
              }}
              className="ventures-grid"
            >
              {filtered.map((venture) => (
                <VentureCard key={venture.id} venture={venture} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                padding: '80px 0',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: 'clamp(20px, 2vw, 28px)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-ink)',
                  marginBottom: '12px',
                }}
              >
                Nothing matches.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '16px',
                  color: 'var(--color-ink)',
                  opacity: 0.5,
                  marginBottom: '32px',
                }}
              >
                Try a different filter or clear all.
              </p>
              <button
                onClick={clearFilters}
                style={{
                  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: 'var(--color-canvas)',
                  backgroundColor: 'var(--color-ink)',
                  border: 'none',
                  padding: '12px 28px',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'background-color 200ms ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--color-orange)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    'var(--color-ink)'
                }}
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ventures-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .ventures-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
