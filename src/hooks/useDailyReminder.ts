import { useState, useEffect } from 'react'

export type ReminderStatus = 'unsupported' | 'default' | 'enabled' | 'denied'

function isSupported() {
  return (
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'periodicSync' in ServiceWorkerRegistration.prototype
  )
}

export function useDailyReminder() {
  const [status, setStatus] = useState<ReminderStatus>('default')

  useEffect(() => {
    if (!isSupported()) { setStatus('unsupported'); return }
    if (Notification.permission === 'denied') { setStatus('denied'); return }

    navigator.serviceWorker.ready.then(async reg => {
      try {
        // @ts-expect-error – periodicSync not yet in lib.dom.d.ts
        const tags: string[] = await reg.periodicSync.getTags()
        setStatus(tags.includes('daily-word') ? 'enabled' : 'default')
      } catch {
        setStatus('unsupported')
      }
    })
  }, [])

  const enable = async () => {
    if (!isSupported()) return
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') { setStatus('denied'); return }
    try {
      const reg = await navigator.serviceWorker.ready
      // @ts-expect-error – periodicSync not yet in lib.dom.d.ts
      await reg.periodicSync.register('daily-word', { minInterval: 24 * 60 * 60 * 1000 })
      setStatus('enabled')
    } catch {
      setStatus('unsupported')
    }
  }

  const disable = async () => {
    try {
      const reg = await navigator.serviceWorker.ready
      // @ts-expect-error – periodicSync not yet in lib.dom.d.ts
      await reg.periodicSync.unregister('daily-word')
    } catch { /* ignore */ }
    setStatus('default')
  }

  const toggle = () => (status === 'enabled' ? disable() : enable())

  return { status, toggle }
}
