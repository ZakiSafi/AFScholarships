import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getAttribution, initAttribution } from './attribution'

const STORAGE_KEY = 'afscholarships.analytics.attribution'

describe('attribution', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('captures UTM params on first visit', () => {
    window.history.replaceState(
      {},
      '',
      '/?utm_source=telegram&utm_medium=social&utm_campaign=launch',
    )

    const attribution = initAttribution()
    expect(attribution?.source).toBe('telegram')
    expect(attribution?.medium).toBe('social')
    expect(attribution?.campaign).toBe('launch')
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('returns stored attribution on subsequent reads', () => {
    initAttribution()
    const again = getAttribution()
    expect(again).not.toBeNull()
    expect(again?.source).toBe('direct')
  })
})
