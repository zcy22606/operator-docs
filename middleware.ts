// 整站 HTTP Basic Auth：只校验密码（用户名随便填），密码在 Vercel 环境变量 DOCS_PASSWORD。
// 没设密码时一律拒绝。
import { next } from '@vercel/functions'

export const config = { matcher: '/:path*' }

export default function middleware(req: Request) {
  const expected = process.env.DOCS_PASSWORD
  const [scheme, encoded] = (req.headers.get('authorization') ?? '').split(' ')
  if (expected && scheme === 'Basic' && encoded) {
    let pwd = ''
    try {
      pwd = atob(encoded).split(':').slice(1).join(':')
    } catch {}
    if (pwd === expected) return next()
  }
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Operator Docs", charset="UTF-8"' },
  })
}
