export function increase(n) {
  return {
    type: 'count.increase',
    amount: n
  }
}

export function decrease(n) {
  return {
    type: 'count.decrease',
    amount: n
  }
}
