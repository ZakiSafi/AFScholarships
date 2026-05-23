import { describe, expect, it } from 'vitest'
import { formatDeadline, formatDegreeLevel, isVerified } from './format'

describe('scholarship format helpers', () => {
  it('formats degree levels for display', () => {
    expect(formatDegreeLevel('MASTER')).toBe('Master')
  })

  it('formats UTC deadlines', () => {
    expect(formatDeadline('2026-12-20T00:00:00.000Z')).toMatch(/Dec/)
  })

  it('detects verified status', () => {
    expect(isVerified('VERIFIED')).toBe(true)
    expect(isVerified('UNVERIFIED')).toBe(false)
  })
})
