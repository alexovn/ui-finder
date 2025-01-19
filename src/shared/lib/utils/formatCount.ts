export default function formatCount(count: number) {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}m`
  }

  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}k`
  }

  return `${count}`
}
