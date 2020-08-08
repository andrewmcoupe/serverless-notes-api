import { calculateCost } from './billing-lib'

describe('Billing Lib', () => {
  it('should return 3200 if storage is set to 8', () => {
    const stubStorage = 8
    const result = calculateCost(stubStorage)

    expect(result).toBe(3200)
  })

  it('should return 5000 if storage is set to 25', () => {
    const stubStorage = 25
    const result = calculateCost(stubStorage)

    expect(result).toBe(5000)
  })

  it('should return 20000 if storage is set to 200', () => {
    const stubStorage = 200
    const result = calculateCost(stubStorage)

    expect(result).toBe(20000)
  })
})
