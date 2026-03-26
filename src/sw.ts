import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

// Runtime caching: Google Fonts
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536000 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
)
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'gstatic-fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536000 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  })
)

// ── Daily word list ────────────────────────────────────────────────────────────
const DAILY_WORDS = [
  { sv: 'Hej', en: 'Hi / Hello' },
  { sv: 'Tack', en: 'Thank you' },
  { sv: 'Varsågod', en: "You're welcome" },
  { sv: 'Förlåt', en: 'Sorry' },
  { sv: 'Ja', en: 'Yes' },
  { sv: 'Nej', en: 'No' },
  { sv: 'God morgon', en: 'Good morning' },
  { sv: 'God kväll', en: 'Good evening' },
  { sv: 'Hej då', en: 'Goodbye' },
  { sv: 'Snälla', en: 'Please' },
  { sv: 'Hur mår du?', en: 'How are you?' },
  { sv: 'Jag mår bra', en: "I'm doing well" },
  { sv: 'Vad heter du?', en: 'What is your name?' },
  { sv: 'Jag förstår inte', en: "I don't understand" },
  { sv: 'Talar du engelska?', en: 'Do you speak English?' },
  { sv: 'Var är...?', en: 'Where is...?' },
  { sv: 'Hur mycket kostar det?', en: 'How much does it cost?' },
  { sv: 'Hjälp!', en: 'Help!' },
  { sv: 'En', en: 'One' },
  { sv: 'Två', en: 'Two' },
  { sv: 'Tre', en: 'Three' },
  { sv: 'Fyra', en: 'Four' },
  { sv: 'Fem', en: 'Five' },
  { sv: 'Sex', en: 'Six' },
  { sv: 'Sju', en: 'Seven' },
  { sv: 'Åtta', en: 'Eight' },
  { sv: 'Nio', en: 'Nine' },
  { sv: 'Tio', en: 'Ten' },
  { sv: 'Måndag', en: 'Monday' },
  { sv: 'Tisdag', en: 'Tuesday' },
  { sv: 'Onsdag', en: 'Wednesday' },
  { sv: 'Torsdag', en: 'Thursday' },
  { sv: 'Fredag', en: 'Friday' },
  { sv: 'Lördag', en: 'Saturday' },
  { sv: 'Söndag', en: 'Sunday' },
  { sv: 'Idag', en: 'Today' },
  { sv: 'Imorgon', en: 'Tomorrow' },
  { sv: 'Igår', en: 'Yesterday' },
  { sv: 'Nu', en: 'Now' },
  { sv: 'Snart', en: 'Soon' },
  { sv: 'Vatten', en: 'Water' },
  { sv: 'Mat', en: 'Food' },
  { sv: 'Bröd', en: 'Bread' },
  { sv: 'Kaffe', en: 'Coffee' },
  { sv: 'Te', en: 'Tea' },
  { sv: 'Mjölk', en: 'Milk' },
  { sv: 'Äpple', en: 'Apple' },
  { sv: 'Röd', en: 'Red' },
  { sv: 'Blå', en: 'Blue' },
  { sv: 'Grön', en: 'Green' },
  { sv: 'Vit', en: 'White' },
  { sv: 'Svart', en: 'Black' },
  { sv: 'Stor', en: 'Big / Large' },
  { sv: 'Liten', en: 'Small' },
  { sv: 'Bra', en: 'Good' },
  { sv: 'Dålig', en: 'Bad' },
  { sv: 'Varm', en: 'Warm / Hot' },
  { sv: 'Kall', en: 'Cold' },
  { sv: 'Hund', en: 'Dog' },
  { sv: 'Katt', en: 'Cat' },
  { sv: 'Hus', en: 'House' },
]

// ── Periodic Background Sync ───────────────────────────────────────────────────
self.addEventListener('periodicsync', (event) => {
  // @ts-expect-error – PeriodicSyncEvent not yet in lib.dom.d.ts
  if (event.tag === 'daily-word') event.waitUntil(showDailyWord())
})

async function showDailyWord() {
  const day = Math.floor(Date.now() / 86_400_000)
  const word = DAILY_WORDS[day % DAILY_WORDS.length]
  await self.registration.showNotification('Svenska – Word of the Day ✨', {
    body: `${word.sv}  →  ${word.en}`,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'daily-word',
    renotify: true,
    data: { url: '/' },
  })
}

// ── Notification click ─────────────────────────────────────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      for (const client of clients) {
        if ('focus' in client) return (client as WindowClient).focus()
      }
      return self.clients.openWindow('/')
    })
  )
})
