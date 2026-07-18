// The six fixed savings fund types, ported from saving.js / saving.html.
// Used both to seed a new user's funds and to know the default
// target/icon/name when displaying a fund.

export const DEFAULT_FUNDS = [
  { key: "emergency", name: "Emergency Fund", icon: "🚨", target: 10000 },
  { key: "hospital", name: "Hospital Fund", icon: "🏥", target: 5000 },
  { key: "trip", name: "Trip Fund", icon: "✈️", target: 15000 },
  { key: "birthday", name: "Birthday Party Fund", icon: "🎂", target: 3000 },
  { key: "education", name: "Education Fund", icon: "📚", target: 25000 },
  { key: "wedding", name: "Wedding Fund", icon: "💒", target: 50000 },
];
